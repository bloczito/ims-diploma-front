import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    Grid,
    InputAdornment,
    TextField,
} from "@material-ui/core";

import styles from "./NewProductModal.module.scss"
import DialogHeader from "../DialogHeader/DialogHeader";
import DialogFooter from "../DialogFooter/DialogFooter";
import { useFormik } from "formik";
import { productService } from "../../_service";


const ProductModal = ({isOpen, submitFn, closeFn, id}) => {

    const formik = useFormik({
        onSubmit: values => {
            submitFn(values);
        },
        enableReinitialize: true,
        initialValues: {},
    });

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

    return (
        <Dialog
            open={isOpen}
            maxWidth="md"
            onClose={handleCancelModal}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <DialogHeader closeFn={closeFn}>
                    Dodaj nowy produkt
                </DialogHeader>

                <DialogContent dividers className={styles.content}>

                    <Grid container spacing={2} className={styles.groupContainer}>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                type="number"
                                name="code"
                                label="Numer artykułu"
                                value={formik.values.code}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="name"
                                label="Nazwa"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="basePrice"
                                label="Cena podstawowa"
                                type="number"
                                InputProps={{
                                    step: 0.01,
                                    startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                }}
                                value={formik.values.basePrice}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid container className={styles.groupContainer}>
                        <Grid container spacing={2} className={styles.row}>
                            <Grid item xs={4} >
                                <TextField
                                    fullWidth
                                    name="height"
                                    label="Wysokość"
                                    type="number"
                                    InputProps={{
                                        step: 0.01,
                                        startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                    }}
                                    value={formik.values.height}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    name="width"
                                    label="Szerokość"
                                    type="number"
                                    InputProps={{
                                        step: 0.01,
                                        startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                    }}
                                    value={formik.values.width}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    name="depth"
                                    label="Głębokość"
                                    type="number"
                                    InputProps={{
                                        step: 0.01,
                                        startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                    }}
                                    value={formik.values.depth}
                                    onChange={formik.handleChange}
                                />
                            </Grid>

                        </Grid>

                        <Grid container spacing={2} className={styles.row}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    name="weight"
                                    label="Waga"
                                    type="number"
                                    InputProps={{
                                        step: 0.01,
                                        startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                    }}
                                    value={formik.values.weight}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={6}>
                        <Grid item xs={6}>
                            <TextField
                                name="descriptionEng"
                                label="Opis po angielsku"
                                // inputRef={register}
                                multiline
                                rows={10}
                                fullWidth
                                variant="outlined"
                                value={formik.values.descriptionEng}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="descriptionGer"
                                label="Opis po niemiecku"
                                // inputRef={register}
                                multiline
                                rows={10}
                                fullWidth
                                variant="outlined"
                                value={formik.values.descriptionGer}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>

                <DialogFooter
                    cancelFn={handleCancelModal}
                    submitFn={submitFn}
                    submitText={id ? "Zapisz" : "Dodaj"}
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
}


export default ProductModal;