import React from "react";
import PropTypes from "prop-types";
import {useForm} from "react-hook-form";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    InputAdornment,
    MenuItem,
    TextField
} from "@material-ui/core";
import DialogHeader from "../DialogHeader/DialogHeader";
import styles from "./NewCustomerModal.scss";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from '@material-ui/icons/AlternateEmail';
import DefaultSelect from "../DefaultSelect/DefaultSelect";


const countries = [
    "Polska",
    "Niemcy",
    "Francja",
    "Dania",
    "Holandia",
    "Szwajcaria",
    "Szwecja",
];

const NewCustomerModal = ({isOpen, handleModalClose, handleNewCustomerSubmit}) => {
    const {register, control, handleSubmit} = useForm();
    console.log("RENDER RENDER RENDER RENDER RENDER RENDER ")
    return (
        <Dialog
            open={isOpen}
            onClose={handleModalClose}
        >
            <form onSubmit={handleSubmit(handleNewCustomerSubmit)} autoComplete="off">
                <DialogHeader closeFn={handleModalClose}>
                    Dodaj klienta
                </DialogHeader>
                <DialogContent dividers>
                    <Grid container spacing={2} className={styles.groupContainer}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                name="name"
                                label="Nazwa"
                                inputRef={register}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                name="phone"
                                type="tel"
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
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                name="email"
                                label="Email"
                                inputRef={register}
                                InputProps={{
                                    startAdornment:
                                        <InputAdornment position="start">
                                            <EmailIcon className={styles.icon}/>
                                        </InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                name="nip"
                                label="Nip"
                                inputRef={register}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} className={styles.groupContainer}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                name="address.city"
                                label="Miasto"
                                inputRef={register}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                name="address.street"
                                label="Ulica"
                                inputRef={register}
                            />
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <TextField
                                fullWidth
                                name="address.houseNumber"
                                label="Nr domu"
                                inputRef={register}
                            />
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <TextField
                                fullWidth
                                name="address.apartmentNumber"
                                label="Nr miesz."
                                inputRef={register}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                name="address.voivodeship"
                                label="Województwo"
                                inputRef={register}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <DefaultSelect
                                label="Kraj"
                                control={control}
                                name="address.country"
                            >
                                {countries.length && countries.map(country =>
                                        <MenuItem key={country} value={country}>{country}</MenuItem>
                                    )
                                }
                            </DefaultSelect>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleNewCustomerSubmit} type="submit">
                        Dodaj
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )

}


NewCustomerModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleNewCustomerSubmit: PropTypes.func.isRequired,
    handleModalClose: PropTypes.func.isRequired,
}

export default NewCustomerModal;