import { Grid, withStyles, Button, Typography, TextField, Box } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../components";
import { connect } from "react-redux";
import {userActions} from "../../_actions";
import styles from "./LoginView.module.css"
import { useState } from "react";

const LoginView = ({ dispatch }) => {

    const {register, control, handleSubmit, error } = useForm();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const onSubmit = data => {
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

            <form onSubmit={ handleSubmit(onSubmit) }>
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
                        inputRef={register}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <PasswordInput
                        name="password"
                        control={control}
                        label="Hasło"
                        classes={ styles.formField }
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <Button
                        type={ "submit" }
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
    return {};
}

export default connect(mapStateToProps)(LoginView);