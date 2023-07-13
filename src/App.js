import { React, useState } from 'react';
import { Buffer } from 'buffer';
import logo from './logo.svg';
import cbi from './cbi.png';
import './App.css';
import test from './image';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Instagram from './Instagram';


function App() {
  const [brand, setBrand] = useState('corona');
  const [pic, setPic] = useState('');

  function askGPT(topic, brand) {
    // mock generated ChatGPT responses
    const prompts = [
        {
            "brand" : "corona",
            "topic" : "summer",
            "description" : "A graphic of a Corona bottle and lime slice against a beach backdrop, with surfboards and palm trees that morph into a cityscape.",
            "tagline" : "Corona Extra - Where the beach meets the city."
        },
        {
            "brand" : "modelo",
            "topic" : "sports",
            "description" : "diverse group of people, each engaging in different activities (e.g., playing soccer, dancing, cooking), all holding a Modelo. The overall design forms the shape of a Modelo bottle",
            "tagline" : "Different Stories, United by Modelo",
        },
        {
            "brand" : "robertmondavi",
            "topic" : "wedding",
            "description" : "",
            "tagline" : ""
        }
    ]
    // GPT call goes here
    return prompts.find((prompt) => prompt.topic === topic && prompt.brand === brand);
  }

  function testGetImage() {
    setPic(test);
  }

  function getImage() {
      // Call to stable diffusion API with description goes here
      // fetch then then
      const payload = {
        "prompt": "A graphic of a Corona bottle and lime slice against a beach backdrop, with surfboards and palm trees that morph into a cityscape.",
      }
      fetch('https://cors-anywhere.herokuapp.com/'+'https://b3aa4b88-8051-4ed2.gradio.live/sdapi/v1/txt2img', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(payload),
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        // let base64_to_imgsrc = Buffer.from(data.images[0], "base64").toString()
        // var image = new Image();
        // image.src = "data:image/jpeg;charset=utf-8;base64" + data.images[0];
        setPic(data.images[0]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  return (
    <div>
      <div className='App'>
        <img style={{width: '50%'}} src={cbi} alt="CBi Logo"></img>
        <h1>CBI Hackathon</h1>
        <h2>Social Media Marketing Generator</h2>

        <h4>Select a CBI Brand you want to market</h4>
        <ToggleButtonGroup
          value={brand}
          onChange={(event, newBrand) => {
            setBrand(newBrand);
          }}
          aria-label="brand"
          exclusive
        >
          <ToggleButton value="corona" aria-label="corona">Corona</ToggleButton>
          <ToggleButton value="modelo" aria-label="modelo">Modelo</ToggleButton>
          <ToggleButton value="robertmondavi" aria-label="robertmondavi">Robert Mondavi</ToggleButton>
        </ToggleButtonGroup>
        <p>Enter a topic/activity you want to market:</p>
        <TextField variant='outlined' label="Topic"/>
        <Button onClick={() => testGetImage()}>Generate Image</Button>
        {!pic && <p>Click the button to generate an image!</p>}
      </div>
      <Instagram 
        image={pic}
        profile={"coronausa"}
        location={"Rochester, NY"}
        caption={"Corona Extra - Where the beach meets the city."}
      />
    </div>
  );
}

export default App;
