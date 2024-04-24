import Moon from './Moon';
import Sky from './Sky';
import Mountains from './Mountains';
import Stars from './Stars';
import PropTypes from "prop-types";

const Svg = ({svg, randomisation}) => {

    return (
        <div className='svg-wrapper'>
        <Moon closing = {svg.moon.moonClosing}/>
        <Sky hue1={svg.sky.hue1} hue2={svg.sky.hue2}/>
        <Mountains segments = {svg.mountains.segments} height = {svg.mountains.height} depth = {svg.mountains.depth} 
        color = {svg.mountains.color} 
        fillGradient =  {true}
        randomisation={randomisation}/>
         <Mountains segments = {svg.mountains.segments} 
          height = {200} 
          depth = {svg.mountains.depth}
          color = {svg.mountains.color} 
          fillGradient={false}
          randomisation={randomisation}/>
        <Stars stars={svg.stars.stars} />
        </div>
    );

}

Svg.propTypes = {
    svg: PropTypes.object.isRequired,
    randomisation: PropTypes.number.isRequired,
};

export default Svg;