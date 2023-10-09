from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

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

