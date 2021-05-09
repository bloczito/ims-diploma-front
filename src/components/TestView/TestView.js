import React  from "react";
import {
    Grid, MenuItem,
    TextField,
} from "@material-ui/core";
import {useForm, Controller} from "react-hook-form";

import styles from "./TestView.module.scss"

const TestView = () => {

    const {register, control, handleSubmit} = useForm();


    const onSubmit = data => console.log(data);

    return (
        <Grid container >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            name="orderNumber"
                            label="Numer umowy"
                            inputRef={register}
                        />
                    </Grid>

                    <Grid item xs={4} >
                        <TextField
                            type="date"
                            name="orderDate"
                            label="Data umowy"
                            InputLabelProps={{shrink: true}}
                            inputRef={register}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField className={styles.date}
                                   type="date"
                                   name="deadline"
                                   label="Termin"
                                   InputLabelProps={{shrink: true}}
                                   inputRef={register}
                        />
                    </Grid>

                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Controller
                            control={control}
                            name="company"
                            as={
                                <TextField
                                    label="Firma"
                                    select
                                    style={{width: "100%"}}
                                >
                                    <MenuItem value="bnm">bnm</MenuItem>
                                    <MenuItem value="ghj">ghj</MenuItem>
                                    <MenuItem value="tyu">tyu</MenuItem>
                                </TextField>
                            }

                        />

                    </Grid>
                </Grid>


                <button type="submit">
                    Submit
                </button>

            </form>

        </Grid>
    )

}


export default TestView;