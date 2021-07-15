import React from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogContent,
    Grid,
    InputAdornment, MenuItem,
    TextField
} from "@material-ui/core";
import DialogHeader from "../DialogHeader/DialogHeader";
import styles from "./NewCustomerModal.scss";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from '@material-ui/icons/AlternateEmail';
import DialogFooter from "../DialogFooter/DialogFooter";
import { useFormik } from "formik";
import * as Yup from "yup";


const countries = [
    "Polska",
    "Niemcy",
    "Francja",
    "Dania",
    "Holandia",
    "Szwajcaria",
    "Szwecja",
];

const newCustomerSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Podaj przynajmniej 2 znaki")
        .max(24, "Maksymalna ilość znaków to 24")
        .required("To pole jest wymagane")
})

const NewCustomerModal = ({isOpen, handleModalClose, handleNewCustomerSubmit}) => {

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {},
        validationSchema: newCustomerSchema,
        onSubmit: (values, {resetForm}) => {
            handleNewCustomerSubmit(values);
            resetForm();
        }
    });

    const {values, handleChange, errors, touched} = formik;

    const isError = name => errors[name];

    return (
        <Dialog
            open={isOpen}
            onClose={handleModalClose}
            maxWidth="md"
            fullWidth
        >
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <DialogHeader closeFn={handleModalClose}>
                    Dodaj klienta
                </DialogHeader>
                <DialogContent dividers>
                    <Grid container spacing={2} className={styles.groupContainer}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                name="name"
                                label="Nazwa *"
                                value={values.name}
                                onChange={handleChange}
                                error={isError("name")}
                                helperText={isError("name") && errors.name}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                name="phone"
                                type="tel"
                                label="Telefon"
                                value={values.phone}
                                onChange={handleChange}
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
                                value={values.email}
                                onChange={handleChange}
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
                                value={values.nip}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} className={styles.groupContainer}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                name="address.city"
                                label="Miasto"
                                value={values.address?.city}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                name="address.street"
                                label="Ulica"
                                value={values.address?.street}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <TextField
                                fullWidth
                                name="address.houseNumber"
                                label="Nr domu"
                                value={values.address?.houseNumber}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <TextField
                                fullWidth
                                name="address.apartmentNumber"
                                label="Nr miesz."
                                value={values.address?.apartmentNumber}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                name="address.voivodeship"
                                label="Województwo"
                                value={values.address?.voivodeship}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Kraj"
                                name="address.country"
                                fullWidth
                                select
                                value={values.address?.country}
                                onChange={handleChange}
                            >
                                {countries.length && countries.map(country =>
                                    <MenuItem key={country} value={country}>{country}</MenuItem>
                                )}
                            </TextField>
                            {/*<DefaultSelect*/}
                            {/*    label="Kraj"*/}
                            {/*    name="address.country"*/}
                            {/*>*/}
                            {/*    {countries.length && countries.map(country =>*/}
                            {/*            <MenuItem key={country} value={country}>{country}</MenuItem>*/}
                            {/*        )*/}
                            {/*    }*/}
                            {/*</DefaultSelect>*/}
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogFooter
                    cancelFn={handleModalClose}
                />
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
