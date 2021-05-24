import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";



const DefaultSelect = ({label, name, control, value, ...props}) => (
    <Controller
        control={control}
        name={name}
        as={
         <TextField
            {...props}
             value={value}
            label={label}
            select
            style={{width: "100%"}}
         />
        }
    />
)

DefaultSelect.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    control: PropTypes.any.isRequired,
    value: PropTypes.any
}


export default DefaultSelect;
