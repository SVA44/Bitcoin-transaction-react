import atexit
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from neo4j import GraphDatabase

# Set up API app
app = FastAPI()


# Allow connection from localhost only
origins = [
    "http://localhost:3000",
    "localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Neo4j Graph Database client
class GraphDB:
    # Connect to the database
    def __init__(self):
        uri = "neo4j+s://a3eb7ab7.databases.neo4j.io"
        username = "neo4j"
        password = "AaMzgSjKeouTnAp3i0v5WXX_-3KZwAAe1KVkO4FT0lM"

        self.driver = GraphDatabase.driver(uri, auth=(username, password))
        print("Neo4j GDB address:", self.driver.get_server_info().address)

    # Close the database connection
    def close(self):
        self.driver.close()

# Initialise GDB
GDB = GraphDB()
session = GDB.driver.session(database="neo4j")

# Get data about transactions the query is in
@app.get("/getTransactionsData")
async def getTransactionData(q: str):
    # The cypher query
    def get_tx_data(tx, address):
        # Return the details of all transactions that have the given address in them
        result = tx.run("""
            MATCH p=(from:Wallet {address: $filter})-[t:Transfer]->(to:Wallet)
            RETURN p
            UNION
            MATCH p=(from:Wallet)-[tx:Transfer]->(to:Wallet {address: $filter})
            RETURN p;
            """, filter=address)
        # Return a list of record objects
        return list(result)
    # Run the query and return the result
    return session.execute_read(get_tx_data, q)

# Get Wallet Balance
@app.get("/getBalance")
async def getBalance(q: str):
    # The cypher query
    def get_balance(tx, address):
        # Return the sum of all transactions received by and sent from the address
        result = list(tx.run("""
            MATCH (from:Wallet)-[tx:Transfer]->(to:Wallet {address: $filter})
            RETURN SUM(tx.value)
            UNION
            MATCH p=(from:Wallet {address: $filter})-[tx:Transfer]->(to:Wallet)
            RETURN SUM(tx.value);
            """, filter=address))
        # Return total received - total sent
        if len(result) == 1:
            return result[0][0]
        return result[0][0] - result[1][0]

    # Run the query and return the result
    return session.execute_read(get_balance, q)

# Get data about transactions the query is in
@app.get("/getNodeData")
async def getNodeData(q: str):
    # The cypher query
    def get_tx_data(tx, address):
        # Return the details of all transactions that have the given address in them
        result = tx.run("""
            MATCH (n: Wallet{address:$filter})
            RETURN n;
            """, filter=address)
        # Return a list of record objects
        return list(result)
    # Run the query and return the result
    return session.execute_read(get_tx_data, q)

# Test API requests
@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}

wallet_address = ["0"]
# Wallets Details
wallets = {
    "": {
        "Grid": {
            "WalletAddress": "1",
            "Balance": "",
            "Value-in-USD": ""
        }
    },
    "bc1q6v32wx37has40meqc9ea4tasc27umsksukylh2": {
        "Grid": {
            "WalletAddress": "bc1q6v32wx37has40meqc9ea4tasc27umsksukylh2",
            "Balance": "3,827.73917861 BTC",
            "Value_in_USD": "98,772,116.75 USD"
        }
    }
}

#Set Wallet Address
@app.post("/wallets-set-address", tags=["wallet"])
async def set_wallet(newWalletAddress: dict) -> str:
    wallet_address.append(newWalletAddress["walletAddress"])
    return ""

#Get Corresponding Wallet Details
@app.get("/wallets", tags=["wallet module"])
async def get_wallet():
    return wallets[wallet_address[-1]]

