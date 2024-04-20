import PropTypes from "prop-types";
import "./Svg.css";

const Mountains = ({segments, height, depth, color, fillGradient, randomisation}) => {


  const viewBox = `0 0 ${window.innerWidth} ${window.innerHeight}`;

  const createMountain = (segments, height) => {
    const pointsMountain = [];

    for (let i = 0; i < segments * 2; i++) {
      const x = (i * window.innerWidth) / (segments * 2);

      // Calculate a factor based on the x position, with a peak in the middle
      const distanceFromCenter = Math.abs(x - window.innerWidth/ 2);
      const parabolicFactor = 1 - Math.pow((2 * distanceFromCenter / window.innerWidth), 2);

      //Base height depends on depth factor from 0 to depth
      const baseHeight = window.innerHeight - height*depth*parabolicFactor;
      // Peaks are higher based on the parabolic factor:
      const peakHeight = window.innerHeight - parabolicFactor*randomisation * height; 

      //every second point is a peak
      const y = i % 2 == 0 ? baseHeight : peakHeight;
      pointsMountain.push(`${x},${y}`);
     }
    pointsMountain.push(`${window.innerWidth},${window.innerHeight}`);
    return pointsMountain.join(" ");
};
     
    return (
        <svg className="mountains" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient gradientTransform="rotate(-181, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="gggrain-gradient2"><stop stopColor="hsla(226, 66%, 19%, 1.00)" stopOpacity="1" offset="-0%"></stop><stop stopColor="rgba(255,255,255,0)" stopOpacity="0" offset="100%"></stop></linearGradient><linearGradient gradientTransform="rotate(181, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="gggrain-gradient3"><stop stopColor="hsl(227, 100%, 49%)" stopOpacity="1"></stop><stop stopColor="rgba(255,255,255,0)" stopOpacity="0" offset="100%"></stop></linearGradient><filter id="gggrain-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
  <feColorMatrix type="saturate" values="0" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="colormatrix"></feColorMatrix>
  <feComponentTransfer x="0%" y="0%" width="100%" height="100%" in="colormatrix" result="componentTransfer">
    <feFuncR type="linear" slope="3"></feFuncR>
    <feFuncG type="linear" slope="3"></feFuncG>
    <feFuncB type="linear" slope="3"></feFuncB>
  </feComponentTransfer>
  <feColorMatrix x="0%" y="0%" width="100%" height="100%" in="componentTransfer" result="colormatrix2" type="matrix" values="1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 22 -14"></feColorMatrix>
  </filter></defs>
          <polygon
            points={createMountain(segments, height)}
            fill={fillGradient? "url(#gggrain-gradient3)" : `${color}`}
          />
        </svg>
        )

}


Mountains.propTypes = {
  segments: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  randomisation: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  fillGradient: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
};


export default Mountains;

