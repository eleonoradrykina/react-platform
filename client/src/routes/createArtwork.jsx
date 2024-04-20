import { useState } from 'react'
import Controller from './components/Controller'
import Svg from './components/svg/Svg'
import { gsap } from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import './App.css'

const randomisation = Math.random() + 0.5;
const maxStars = 10;

 const createStar = () => ({
    left: Math.random() * 100,
    top: Math.random() * 30,
    rotate:  Math.random() * 180,
    opacity: 0
  })
  
 const defaultList = new Array(10).fill().map(() => createStar());


const App = () => {
    const [areLightsPlaying, setAreLightsPlaying] = useState(false);
    const container = useRef();
    const { contextSafe } = useGSAP({ scope: container });

    const [svg, setSvg] = useState ({
      mountains: {
        segments: 2,
        height: 300,
        depth: 0.1,
        color: "#3136af",
      },
      sky: {
        hue1: 315,
        hue2: 277,
        isPlaying: false
      },
      stars: {
        nStars: 0,
        stars: defaultList
      },
      moon: {
        moonClosing: 35
      }
    });

  const handleNStarsChange = (value) => {
    const newStars = svg.stars.stars.map((star, index) => {
    if (index < value) {
      return { ...star, opacity: 1 }; 
    } else {
      return { ...star, opacity: 0 };
    }
   });

    const newObj = {
      ...svg,
      stars: {
        stars: newStars,
        nStars: value
      }
    }
    setSvg(newObj);
  };

  const handleClickStar = (n) =>  {
    const tmpN = svg.stars.nStars + n;
    if ((tmpN < maxStars) && (tmpN >= 0)){ 
      handleNStarsChange(tmpN);
    }
  }

  const handleSvgChange = (obj, property, value) => {
    const clone = structuredClone(svg);
      clone[obj] = {
        ...clone[obj],
        [property]: value
      }
    setSvg(clone);
  };


  const onLightsClick = contextSafe(() => {
    setAreLightsPlaying(true);
    console.log(areLightsPlaying);
    const hue2 = { hue: 200 };
    const tl2 = gsap.timeline();
    tl2.fromTo(hue2, {hue: 200}, {
        hue: 290,
        duration: 0.75,
        repeat: 4,
        yoyo: true,
        onUpdate: () => {
          handleSvgChange("sky", "hue2", hue2.hue);
        },
         onComplete: () => {
        setAreLightsPlaying(false);
         }
    });
    
  });


  return (
    <div  ref={container}>
    <div className = {areLightsPlaying? "disabled": ""}>
     <Controller svg = {svg} 
     handleClickStar = {handleClickStar} 
     handleSvgChange = {handleSvgChange}
      onLightsClick = {onLightsClick}
     />
     </div>
    <Svg svg = {svg} randomisation={randomisation}/>
    </div>
   
  )
}

export default App
