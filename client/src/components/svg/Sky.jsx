import PropTypes from "prop-types";
import "./Svg.css";


const Sky = ({hue1, hue2}) => {

  const viewBox = `0 0 ${window.innerWidth} ${window.innerHeight}`;
  const stop1 =`hsl(${hue1}, 50%, 52%)`;
  const stop2 = `hsl(${hue2}, 50%, 40%)`;
     
    return (
    <svg className="sky" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" version="1.1"><defs>
        <linearGradient gradientTransform="rotate(150, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="ffflux-gradient">
        <stop stopColor={stop1} stopOpacity="1" offset="0%"></stop>
        <stop stopColor={stop2} stopOpacity="1" offset="100%"></stop>
        </linearGradient>
        <filter id="ffflux-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.005 0.003" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
        <feGaussianBlur stdDeviation="20 0" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
        <feBlend mode="hard-light" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>
        </filter></defs><rect width="100%" height="100%" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"></rect></svg>
        )

}

Sky.propTypes = {
  hue1: PropTypes.number.isRequired,
  hue2: PropTypes.number.isRequired,
};

export default Sky;