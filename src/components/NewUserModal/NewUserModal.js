import React from "react";
import PropTypes from "prop-types";

import DialogHeader from "../DialogHeader/DialogHeader";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, Grid, InputAdornment, TextField } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/AlternateEmail";
import PhoneIcon from "@material-ui/icons/Phone";

import styles from "./NewUserModal.module.scss";
import DialogFooter from "../DialogFooter/DialogFooter";



const NewUserModal = ({isOpen, handleModalClose, handleNewUserSubmit}) => {

    const {register, handleSubmit} = useForm();

    return (
        <Dialog
            open={isOpen}
            maxWidth="md"
            onClose={handleModalClose}
            fullWidth
        >
            <form onSubmit={handleSubmit(handleNewUserSubmit)} autoComplete="off">
                <DialogHeader closeFn={handleModalClose}>
                    Dodaj nowego użytkownika
                </DialogHeader>

                <DialogContent dividers>
                    <Grid container spacing={2} >
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="username"
                                label="Nazwa użytkownika"
                                inputRef={register}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="password"
                                label="Hasło"
                                inputRef={register}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="confirmPassword"
                                label="Potwierdź hasło"
                                inputRef={register}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="firstName"
                                label="Imię"
                                inputRef={register}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="lastName"
                                label="Nazwisko"
                                inputRef={register}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="shortcut"
                                label="Skrót"
                                inputRef={register}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="email"
                                label="Email"
                                type="email"
                                InputProps={{
                                    startAdornment:
                                        <InputAdornment position="start">
                                            <EmailIcon className={styles.icon}/>
                                        </InputAdornment>
                                }}
                                inputRef={register}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="phone"
                                label="Telefon"
                                inputRef={register}
                                InputProps={{
                                    startAdornment:
                                        <InputAdornment position="start">
                                            <PhoneIcon className={styles.icon} />
                                        </InputAdornment>,
                                }}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="job"
                                label="Stanowisko"
                                inputRef={register}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogFooter
                    cancelFn={handleModalClose}
                    submitFn={handleNewUserSubmit}
                />
            </form>
        </Dialog>
    )


}


NewUserModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleNewUserSubmit: PropTypes.func.isRequired,
    handleModalClose: PropTypes.func.isRequired,
}

export default NewUserModal;


