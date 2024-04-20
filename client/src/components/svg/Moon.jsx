import PropTypes from "prop-types";
import "./Svg.css";

const Moon = ({closing}) => {

  const viewBox = `0 0 400 400`;
  const closingPath = `M 100 100 A 50 50 0 1 0 100 130 ${closing} ${closing} 0 1 1 100 100z`
  return (
    <svg className="moon" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
        <path d={closingPath}  fill="#FBBA6E"/>
    </svg>
  );
}

export default Moon;


Moon.propTypes = {
    closing: PropTypes.number.isRequired,
    };