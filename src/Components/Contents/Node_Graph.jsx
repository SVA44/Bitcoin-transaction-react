import { ForceGraph2D } from 'react-force-graph';
import { useState, useEffect } from 'react';
import React from 'react';
import { createSearchParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { create } from '@mui/material/styles/createTransitions';



export default function Flow() {
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [displayHeight, setDisplayHeight] = useState(window.innerHeight);
  const navigate = useNavigate();
  // Get Search Terms
  const [searchParams, setSearchParams] = useSearchParams();

  // Get transactions data from the backend
  const [data, setData] = useState([]);
  const getData = async () => {
    try{
      const { data } = await axios.get(`http://localhost:8000/getTransactionsData?q=${searchParams.get('q')}`);
      setData(data);
      console.log(data)
      const graphData = {
        "nodes":[
          {
            "id":searchParams.get('q'),
            "type":"",
            "name":searchParams.get('q')
          }
        ],
        "links":[]
      };
    } catch(error) {
      console.error(error);
    }
      
  };
  useEffect(() => {
      getData();
  }, []);



  /* Graph Data */
  const graphData = {
    "nodes":[
      {
        "id":searchParams.get('q'),
        "type":"",
        "name":searchParams.get('q')
      }
    ],
    "links":[]
  };

  data.forEach((input) => {
  // Create a link object with the relevant data
  const link = {
    "source": input[0]._relationships[0].from_address,
    "target": input[0]._relationships[0].to_address,
    "name": "Block: " + input[0]._relationships[0].block_number
  };
  // Add the link object to the links array
  graphData.links.push(link);

  // Add the nodes object to the nodes array
  input[0]._nodes.forEach((node)=>{
    if(node.address != searchParams.get('q')){
      const add_node = {
        "id":node.address,
        "value":1,
        "name":node.address
      }
      graphData.nodes.push(add_node);
    }
  });
  });

  /* handle on click node */
  const handleNodeClick = (node) =>{
    const searchJSON = {'q': node.id}
    navigate(
      {
          pathname: 'information',
          search: createSearchParams(searchJSON).toString()
      }
  );
    setSearchParams(createSearchParams(searchJSON));
    window.location.reload(false); //force page reloading 
  }


  window.addEventListener('resize', () => {
    setDisplayWidth(window.innerWidth);
    setDisplayHeight(window.innerHeight);
  });

  return (
    <div>
      <ForceGraph2D 
        width={displayWidth*94/100}
        height={displayHeight*70/100}

        linkDirectionalArrowLength={5}
        linkDirectionalArrowRelPos={1}
        linkWidth={3}
        onNodeClick={handleNodeClick}
        graphData={graphData}
      />
    </div>
    )
}