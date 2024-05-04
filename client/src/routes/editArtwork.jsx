import { useState } from 'react'
import Controller from '../components/Controller/'
import Svg from '../components/svg/Svg'
import { gsap } from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react"
import { Form, redirect, useLoaderData } from "react-router-dom";
import { updateArtwork, getArtworkById } from "../services/artwork";
import { getAuthData } from "../services/auth";



const randomisation = Math.random() + 0.5;
const maxStars = 10;

/*
    STRAPI LOGIC
*/

let isLoggedIn = false;


 const action = async ({ request, params }) => {
  const formData = await request.formData();

  const randomisation = formData.get('randomisation');
  console.log("Randomisation Data", randomisation);
  
  const data = Object.fromEntries(formData);

  data.svg = JSON.parse(data.svg);
  data.randomisation = randomisation;

  await updateArtwork(params.id, data);
  return redirect(`/artwork/${params.id}`);
    };


const loader = async ({ request, params }) => {
  const { user } = getAuthData();
  if (!user) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/auth/login?" + params.toString());
  }

  const artwork = await getArtworkById(params.id);
if (user.id !== artwork.owner?.data.id) {
    return redirect(`/artwork/${params.id}`);
}
  isLoggedIn = true;
  console.log("user", user);
  console.log("isLoggedIn", isLoggedIn);

  return { artwork, user };
};

/*
    VISUAL SVG LOGIC
*/



const EditArtwork = () => {
    const { artwork } = useLoaderData();

    const [areLightsPlaying, setAreLightsPlaying] = useState(false);
    const container = useRef();
    const { contextSafe } = useGSAP({ scope: container });

    let localSvg = artwork.svg;
    console.log("localSvg", localSvg);

    const [svg, setSvg] = useState (localSvg);

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
    <Svg svg = {svg} randomisation={artwork.randomisation}/>
    <Form method="POST">
      <div>
        <input type="text" id="hidden" name="svg" value={JSON.stringify(svg)} readOnly={true} />
        <input  type="number" step="any" id="hidden" name="randomisation" value={randomisation} readOnly={true} />
         <input
        className="button"
        type="submit"
        value="Save changes"
      />
      </div>
    </Form>
    </div>
   
  )
}

export default EditArtwork;

EditArtwork.action = action;
EditArtwork.loader = loader;