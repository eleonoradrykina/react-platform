import PropTypes from "prop-types";
import "./Svg.css";

const Stars = ({stars}) => {
 
const viewBox = `0 0 ${window.innerWidth} ${window.innerHeight}`;
 return (
    <>
      {stars.map((star, index) => (
        <svg key={index} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox={viewBox}
          style={{
            position: "absolute",
            left: `${star.left}%`,
            top: `${star.top}%`,
            opacity: star.opacity,
            width: `200px`,
            height: `200px`,
            transformOrigin: `center`, // Use transform for rotation
            pointerEvents: "none",
          }}>

          <g>
            <g fill="hsl(43, 97%, 49%)" id="star">
              <path d="M 0 0 
                C 100 100 100 100 150 50 
                C 100 100 100 100 150 150  
                C 100 100 100 100 50 150  
                C 100 100 100 100 0 0" 
              strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
          </g>
        </svg>
      ))}
    </>
  );
}

Stars.propTypes = {
  stars: PropTypes.array.isRequired,
};

export default Stars;