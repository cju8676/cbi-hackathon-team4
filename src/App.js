import { React, useState } from 'react';
import { Buffer } from 'buffer';
import logo from './logo.svg';
import cbi from './cbi.png';
import './App.css';
import test from './image';


function App() {
  const [pic, setPic] = useState('');

  function askGPT(topic) {
    const prompts = [
        {
            "topic" : "summer",
            "description" : "A graphic of a Corona bottle and lime slice against a beach backdrop, with surfboards and palm trees that morph into a cityscape.",
            "tagline" : "Corona Extra - Where the beach meets the city."
        },
        {
            "topic" : "summer",
            "description" : "A frosty Corona bottle is placed on a background which is half a heat map of a bustling city and half a cool-toned beach scene",
            "tagline" : "Bring the cool wherever you go with Corona"
        },
        {
            "topic" : "sports",
            "description" : "diverse group of people, each engaging in different activities (e.g., playing soccer, dancing, cooking), all holding a Modelo. The overall design forms the shape of a Modelo bottle",
            "tagline" : "Different Stories, United by Modelo",
        },
    ]
    // GPT call goes here
    return prompts;
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
    <div className="App">
      <img style={{width: '50%'}} src={cbi} alt="CBi Logo"></img>
      <h1>CBI Hackathon</h1>
      <h2>Social Media Marketing Generator</h2>
      <p>Enter a topic/activity you want to market:</p>
      <input />
      <button onClick={() => testGetImage()}>Generate Image</button>
      {pic && <img src={"data:image/png;base64," + pic} alt="Generated Image"></img>}
      {!pic && <p>Click the button to generate an image!</p>}
    </div>
  );
}

export default App;
