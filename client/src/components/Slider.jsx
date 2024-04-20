import PropTypes from 'prop-types';

const Slider = ({ min, max, step, label, value, onValueChange}) => {

    return (
        <div className = "slider-container">
        <label>{label}
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={parseFloat(value)}
            onChange={ (e) => onValueChange(parseFloat(e.target.value, 10))}
        />
        <span>{value}</span>    
        </label>
        </div>
    )
}

Slider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired
}

export default Slider