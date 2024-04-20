import PropTypes from "prop-types";
import Slider from './Slider'
import ColorPicker from './ColorPicker'


const Controller = ({svg, handleClickStar, handleSvgChange, onLightsClick}) => {

    const sky = svg.sky;
    const moon = svg.moon;
    const {segments, color, depth, height} = svg.mountains;

    return (
    <div className="controller">
      <div className="buttons-container"> 
       <button className = {svg.stars.nStars >= 9 ? "button--inactive":""} onClick={() => handleClickStar(1)}>Add Star</button>
       <button className = {svg.stars.nStars <=0 ? "button--inactive":""} onClick={() => handleClickStar(-1)}>Remove Star</button>
      </div>   
      <div className="buttons-container">
       <button onClick={() => onLightsClick()}>Play the lights</button>
      </div>
      <ColorPicker label="Mountains color" value={color} onValueChange={(v) => handleSvgChange("mountains","color", v)} />
      <Slider
        min={1}
        max={5}
        step = {1}
        label="Segments"
        value={segments}
        onValueChange={(v) => handleSvgChange("mountains","segments", v)}
       />
      <Slider
        min={0.1}
        max={0.6}
        step = {0.1}
        label="Depth"
        value={depth}
        onValueChange={(v) => handleSvgChange("mountains","depth", parseFloat(v))}
      />
      <Slider
        min={25}
        max={45}
        step = {1}
        label="Moon Closing"
        value={moon.moonClosing}
        onValueChange={(v) => handleSvgChange("moon","moonClosing", parseFloat(v))}
      />
      <Slider
        min={300}
        max={500}
        step = {1}
        label="Elevation"
        value={height}
        onValueChange={(v) => handleSvgChange("mountains","height", parseFloat(v))}
      />
    <Slider
        min={300}
        max={359}
        step = {1}
        label="Sky1"
        value={sky.hue1}
        onValueChange={(v) => handleSvgChange("sky","hue1",v)}
      />
         <Slider
        min={200}
        max={290}
        step = {1}
        label="Sky2"
        value={sky.hue2}
        onValueChange={(v) => handleSvgChange("sky","hue2",v)}
      />
    </div>
    )
}

Controller.propTypes = {
    svg: PropTypes.object.isRequired,
    handleClickStar: PropTypes.func.isRequired,
    handleSvgChange: PropTypes.func.isRequired,
    onLightsClick: PropTypes.func.isRequired
};

export default Controller