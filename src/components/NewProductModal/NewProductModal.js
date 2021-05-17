import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    InputAdornment,
    TextField,
} from "@material-ui/core";

import styles from "./NewProductModal.module.scss"
import DialogHeader from "../DialogHeader/DialogHeader";
import DialogFooter from "../DialogFooter/DialogFooter";


const NewProductModal = ({isOpen, handleNewProductSubmit, handleModalClose}) => {

    const {register, handleSubmit} = useForm();


    return (
        <Dialog
            open={isOpen}
            maxWidth="md"
            onClose={handleModalClose}
            fullWidth
        >
            <form onSubmit={handleSubmit(handleNewProductSubmit)} autoComplete="off">
                <DialogHeader closeFn={handleModalClose}>
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
                                inputRef={register}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="name"
                                label="Nazwa"
                                inputRef={register}
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
                                inputRef={register}
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
                                    inputRef={register}
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
                                    inputRef={register}
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
                                    inputRef={register}
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
                                    inputRef={register}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={6}>
                        <Grid item xs={6}>
                            <TextField
                                name="descriptionEng"
                                label="Opis po angielsku"
                                inputRef={register}
                                multiline
                                rows={10}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="descriptionGer"
                                label="Opis po niemiecku"
                                inputRef={register}
                                multiline
                                rows={10}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>

                </DialogContent>

                <DialogFooter
                    cancelFn={handleModalClose}
                    submitFn={handleNewProductSubmit}
                />
            </form>
        </Dialog>
    )


}


NewProductModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleNewProductSubmit: PropTypes.func.isRequired,
    handleModalClose: PropTypes.func.isRequired,
}


export default NewProductModal;