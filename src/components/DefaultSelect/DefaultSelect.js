import React from "react";
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


export default DefaultSelect;
