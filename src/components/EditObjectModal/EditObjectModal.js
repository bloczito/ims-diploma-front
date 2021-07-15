import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Dialog, DialogContent, Grid, TextField } from "@material-ui/core";
import DialogHeader from "../DialogHeader/DialogHeader";
import DialogFooter from "../DialogFooter/DialogFooter";
import { useFormik } from "formik";

const objectSchema = Yup.object().shape({
    "address.street": Yup.string().required("To pole jest wymagane")
})

const EditObjectModal = ({isOpen, submitFn, onClose, objectIndex, obj}) => {

    const formik = useFormik({
        initialValues: {...obj},
        enableReinitialize: true,
        validationSchema: objectSchema,
        onSubmit: values => {
            submitFn(objectIndex, values);
            onClose();
        }
    })

    const {values, touched, errors} = formik;

    const isError = name => errors[name];

    return (
        <Dialog
            open={isOpen}
            maxWidth="md"
            // fullScreen
            fullWidth
            onClose={onClose}
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogHeader closeFn={onClose}>
                    Edycja obiektu klienta
                </DialogHeader>
                <DialogContent dividers>
                    <Grid container>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    label="Tytuł"
                                    value={formik.values.contactTitle}
                                    name={"contactTitle"}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    label="Imię"
                                    value={formik.values.contactName}
                                    name={"contactName"}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    label="Nazwisko"
                                    value={formik.values.contactSurname}
                                    name={"contactSurname"}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    label="Ulica *"
                                    value={formik.values.address?.street}
                                    name={"address.street"}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={isError("address.street")}
                                    helperText={isError("address.street") && errors["address.street"]}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    label="Nr domu *"
                                    value={formik.values.address?.houseNumber}
                                    name={"address.houseNumber"}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={isError("address.houseNumber")}
                                    helperText={isError("address.houseNumber") && errors["address.houseNumber"]}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    label="Numer miesz."
                                    value={formik.values.address?.apartmentNumber}
                                    name={"address.apartmentNumber"}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Kod pocztowy"
                                    value={formik.values.address?.postcode}
                                    name={"address.postcode"}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Miasto *"
                                    value={formik.values.address?.city}
                                    name={"address.city"}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={isError("address.city")}
                                    helperText={isError("address.city") && errors["address.city"]}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Województwo"
                                    value={formik.values.address?.voivodeship}
                                    name={"address.voivodeship"}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Kraj"
                                    value={formik.values.address?.country}
                                    name={"address.country"}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogFooter
                    cancelFn={onClose}
                    // submitFn={formik.submitForm}
                    submitText="Zapisz"
                />
            </form>
        </Dialog>
    )
}

EditObjectModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    submitFn: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    objectIndex: PropTypes.number.isRequired,
    obj: PropTypes.shape({
        contactName: PropTypes.string,
        contactSurname: PropTypes.string,
        contactTitle: PropTypes.string,
        address: PropTypes.shape({
            street: PropTypes.string,
            houseNumber: PropTypes.string,
            apartmentNumber: PropTypes.string,
            postcode: PropTypes.string,
            city: PropTypes.string,
            voivodeship: PropTypes.string,
            country: PropTypes.string,
        })
    })
}

EditObjectModal.defaultProps = {
    obj: {}
}

export default EditObjectModal;
