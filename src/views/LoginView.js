import { Grid, withStyles, Button, Typography} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { TextInput, PasswordInput } from "../components";
import { connect } from "react-redux";
import {userActions} from "../_actions";


const styles = {
    form: {
        marginTop: "20px"
    },
    formField: {
        minWidth: "250px",
        marginBottom: "15px"
    },
    formContainer: {
        marginTop: "100px"
    },
    asd: {
        backgroundColor: "black"
    }
};

const LoginView = ({ classes, dispatch }) => {

    const { control, handleSubmit, error } = useForm();

    const onSubmit = data => {
        console.log(data)
        const { username, password } = data;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }

    }

    return (
        <>
            <div className={ classes.formContainer }>
                <Typography variant="h4">
                    Logowanie
                </Typography>

                <form onSubmit={ handleSubmit(onSubmit) }>
                    <Grid
                        className={ classes.form }
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={ { minHeight: "30vh" } }
                    >
                        <TextInput
                            name="username"
                            control={ control }
                            label="Nazwa użytkownika"
                            classes={ classes.formField }
                        />
                        <PasswordInput
                            name="password"
                            control={control}
                            label="Hasło"
                            classes={ classes.formField }
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
        </>
    )

};

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(withStyles(styles)(LoginView));