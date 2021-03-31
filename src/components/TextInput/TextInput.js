import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";


export const TextInput = ({ control, label, classes, name, id }) => {

    return (
        <>
            <Controller
                as={
                    <TextField
                        className={classes}
                        label={label}
                    />
                }
                control={control}
                name={name}
                id={id}
            />
        </>
    )

}