import React from "react";
import PropTypes from "prop-types"
import { FormControl, Input, InputLabel, Select } from "@material-ui/core";



const CustomSelect =
    ({name, label, onChange, children, value, variant, size, multiple, renderValue, defaultValue, ...props}) => (
        <FormControl
            variant={variant}
            fullWidth
            size={size ? size : ""}
        >
            <InputLabel> {label} </InputLabel>
            <Select
                name={name}
                value={value}
                onChange={onChange}
                // onChange={(value, index) =>  console.log(value, "ASD", index)}
                fullWidth
                variant="outlined"
                multiple={multiple}
                renderValue={renderValue}
                input={<Input/>}
                {...props}
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
    size: PropTypes.oneOf(["small", "medium"]),
    multiple: PropTypes.bool,
    renderValue: PropTypes.func,
}


export default CustomSelect;
