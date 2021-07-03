import { Grid, Button, Typography, TextField, Box } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../components";
import { connect } from "react-redux";
import {userActions} from "../../_actions";
import styles from "./LoginView.module.css"
import { useState } from "react";
import { useFormik } from "formik";

const LoginView = ({ dispatch, wrongData }) => {

    const formik = useFormik({
        onSubmit: values => {
            console.log(values);
            submitForm(values)
        },
        // validationSchema: LoginSchema,
        enableReinitialize: true,
        initialValues: {
            username: null,
            password: null,
        }
    });

    const {values, handleChange} = formik;

    // const [username, setUsername] = useState(null);
    // const [password, setPassword] = useState(null);

    const submitForm = data => {
        const { username, password } = data;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }

    }

    return (
        <div className={styles.wrapper}>
            <Box display="flex" justifyContent="center">
                <Typography variant="h4" className={styles.title}>
                    Logowanie
                </Typography>
            </Box>

            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <Grid
                    className={ styles.form }
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={ { minHeight: "30vh" } }
                >
                    <TextField
                        name="username"
                        label="Nazwa użytkownika"
                        className={styles.formField}
                        value={values.username}
                        onChange={handleChange}
                        inputProps={{minLength: 4, maxLength: 16}}
                        required
                    />

                    <PasswordInput
                        name="password"
                        label="Hasło"
                        classes={ styles.formField }
                        value={values.password}
                        onChange={handleChange}
                    />

                    {wrongData &&
                        <Typography style={{color: "#ce2727", marginBottom: 15}}>
                            Nieprawidłowa nazwa użytkownika lub hasło
                        </Typography>
                    }

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary">
                        Zaloguj
                    </Button>
                </Grid>
            </form>
        </div>
    )

};

function mapStateToProps(state) {
    const {wrongData} = state.authentication;
    return {
        wrongData
    };
}

export default connect(mapStateToProps)(LoginView);
