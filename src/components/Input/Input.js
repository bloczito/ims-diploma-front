import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";


const Input = ({
                   children,
                   name,
                   label,
                   defaultValue,
                   value,
                   onChange,
                   select,
                   type,
                   color,
                   variant,
                   size,
                   error,
                   helperText,
                   InputProps,
                   ...props
}) => {
    const [focused, setFocused] = useState(false);

    return (
        <TextField
            name={name}
            label={label}
            value={value}
            defaultValue={defaultValue}
            select={select}
            onChange={onChange}
            type={type}
            color={color}
            variant={variant}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            InputLabelProps={{shrink: focused || value || type !== "text" || InputProps?.startAdorment}}
            {...props}
            size={size}
            fullWidth
            error={error}
            helperText={helperText}
            InputProps={InputProps}
        >
            {children}
        </TextField>
    );
}


Input.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    select: PropTypes.bool,
    variant: PropTypes.oneOf(["standard", "outlined", "filled"]),
    type: PropTypes.oneOf(["text", "number", "date"]),
    color: PropTypes.oneOf(["primary", "secondary"]),
    size: PropTypes.oneOf(["medium", "small"]),
    error: PropTypes.bool,
    helperText: PropTypes.string,
    disabled: PropTypes.bool,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    InputProps: PropTypes.object,
}

Input.defaultProps = {
    select: false,
    disabled: false,
    multiline: false,
    variant: "standard",
    type: "text",
    color: "primary",
}

export default Input;
