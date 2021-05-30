import React from "react";
import PropTypes from "prop-types"
import { FormControl, InputLabel, Select, TextField } from "@material-ui/core";



const CustomSelect = ({name, label, onChange, children, value, variant, size}) => (
    <FormControl
        variant={variant ? variant : "standard"}
        fullWidth
        size={size ? size : ""}
    >
        <InputLabel> {label} </InputLabel>
        <Select
            name={name}
            value={value}
            onChange={onChange}
            fullWidth
            variant={variant ? variant : "standard"}
        >
            {children}
        </Select>
    </FormControl>
)


CustomSelect.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    variant: PropTypes.oneOf(["filled", "outlined", "standard"]),
    size: PropTypes.oneOf(["small", "medium"])
}


export default CustomSelect;