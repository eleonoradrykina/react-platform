import PropTypes from 'prop-types';

const ColorPicker= ({label, value, onValueChange}) => {

    return (
        <div>
        <label>{label}
        <input 
        type="color" 
        id="color" 
        name={label}
        value={value}
        onChange={ (e) => onValueChange(e.target.value)} />
        <span>{value}</span>    
        </label>
        </div>
    )
}

ColorPicker.propTypes = {
    label: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
}

export default ColorPicker