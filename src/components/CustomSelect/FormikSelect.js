import React from "react";
import PropTypes from "prop-types"
import { FormControl, InputLabel, Select, TextField } from "@material-ui/core";



const CustomSelect = ({name, label, onChange, children, value}) => (
    <FormControl fullWidth>
        <InputLabel> {label} </InputLabel>
        <Select
            name={name}
            value={value}
            onChange={onChange}
            fullWidth
        >
            {children}
        </Select>
    </FormControl>
)


CustomSelect.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}


export default CustomSelect;