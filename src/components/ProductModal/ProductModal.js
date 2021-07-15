import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogContent,
    Grid,
    InputAdornment,
    TextField,
} from "@material-ui/core";
import * as Yup from "yup";

import styles from "./ProductModal.module.scss"
import DialogHeader from "../DialogHeader/DialogHeader";
import DialogFooter from "../DialogFooter/DialogFooter";
import { useFormik } from "formik";
import { productService } from "../../_service";
import Input from "../Input/Input";

const ProductSchema = Yup.object().shape({
    code: Yup.number()
        .required("To pole jest wymagane"),
    name: Yup.string()
        .required("To pole jest wymagane"),
    basePrice: Yup.string()
        .required("To pole jest wymagane")
})

const ProductModal = ({isOpen, submitFn, closeFn, id, deleteFn}) => {

    const formik = useFormik({
        onSubmit: (values, {resetForm}) => {
            submitFn(values);
            resetForm();
        },
        enableReinitialize: true,
        initialValues: {},
        validationSchema: ProductSchema,
        validateOnChange: false,
    });

    const {errors, values, touched} = formik;


    useEffect(async () => {
        if (id) {
            const response = await productService.getById(id);
            console.log(response);
            formik.setValues({...response.resource})
        }
    }, [id])


    const handleCancelModal = () => {
        formik.resetForm({});
        closeFn();
    }

    const isError = name => errors[name];


    return (
        <Dialog
            open={isOpen}
            maxWidth="md"
            onClose={handleCancelModal}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <DialogHeader closeFn={closeFn}>
                    {id ? "Edytuj produkt" : "Dodaj nowy produkt"}
                </DialogHeader>

                <DialogContent dividers className={styles.content}>

                    <Grid container spacing={2} className={styles.groupContainer}>
                        <Grid item xs={4}>
                            <Input
                                type="number"
                                name="code"
                                label="Numer artykułu *"
                                value={values.code}
                                onChange={formik.handleChange}
                                error={isError("code")}
                                helperText={isError("code") && errors.code}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Input
                                name="name"
                                label="Nazwa *"
                                value={values.name}
                                onChange={formik.handleChange}
                                error={isError("name")}
                                helperText={isError("name") && errors.name}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Input
                                name="basePrice"
                                label="Cena podstawowa *"
                                type="number"
                                InputProps={{
                                    step: 0.01,
                                    startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                }}
                                value={values.basePrice}
                                onChange={formik.handleChange}
                                error={isError("basePrice")}
                                helperText={isError("basePrice") && errors.basePrice}
                            />
                        </Grid>
                    </Grid>

                    <Grid container className={styles.groupContainer}>
                        <Grid container spacing={2} className={styles.row}>
                            <Grid item xs={4} >
                                <Input
                                    name="height"
                                    label="Wysokość"
                                    type="number"
                                    InputProps={{
                                        step: 0.01,
                                        startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                    }}
                                    value={values.height}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Input
                                    name="width"
                                    label="Szerokość"
                                    type="number"
                                    InputProps={{
                                        step: 0.01,
                                        startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                    }}
                                    value={values.width}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Input
                                    name="depth"
                                    label="Głębokość"
                                    type="number"
                                    InputProps={{
                                        step: 0.01,
                                        startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                    }}
                                    value={values.depth}
                                    onChange={formik.handleChange}
                                />
                            </Grid>

                        </Grid>

                        <Grid container spacing={2} className={styles.row}>
                            <Grid item xs={4}>
                                <Input
                                    name="weight"
                                    label="Waga"
                                    type="number"
                                    InputProps={{
                                        step: 0.01,
                                        startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                    }}
                                    value={values.weight}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={6}>
                        <Grid item xs={6}>
                            <Input
                                name="descriptionEng"
                                label="Opis po angielsku"
                                // inputRef={register}
                                multiline
                                rows={10}
                                variant="outlined"
                                value={values.descriptionEng}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Input
                                name="descriptionGer"
                                label="Opis po niemiecku"
                                // inputRef={register}
                                multiline
                                rows={10}
                                variant="outlined"
                                value={values.descriptionGer}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>

                <DialogFooter
                    cancelFn={handleCancelModal}
                    // submitFn={submitFn}
                    submitText={id ? "Zapisz" : "Dodaj"}
                    deleteFn={id ? (() => deleteFn(id)) : null}
                />
            </form>
        </Dialog>
    )


}


ProductModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    submitFn: PropTypes.func.isRequired,
    closeFn: PropTypes.func.isRequired,
    id: PropTypes.number,
    deleteFn: PropTypes.func.isRequired,
}


export default ProductModal;
