import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, Grid, TextField } from "@material-ui/core";
import DialogHeader from "../DialogHeader/DialogHeader";

import styles from "./NewRoleModal.module.scss";
import DialogFooter from "../DialogFooter/DialogFooter";


const NewRoleModal = ({isOpen, handleModalClose, handleNewRoleSubmit}) => {
    const {register, handleSubmit} = useForm();

    return (
        <Dialog
            open={isOpen}
            maxWidth="sm"
            fullWidth
            onClose={handleModalClose}
        >
            <form onSubmit={handleSubmit(handleNewRoleSubmit)} autoComplete="off">
                <DialogHeader closeFn={handleModalClose}>
                    Dodaj nową role
                </DialogHeader>

                <DialogContent dividers>
                    <Grid container className={styles.groupContainer}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="name"
                                label="Nazwa"
                                inputRef={register}
                            />
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                name="info"
                                rows={5}
                                variant="outlined"
                                label="Informacja"
                                inputRef={register}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogFooter
                    cancelFn={handleModalClose}
                    submitFn={handleNewRoleSubmit}
                />
            </form>
        </Dialog>
    )

}

NewRoleModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleNewRoleSubmit: PropTypes.func.isRequired,
    handleModalClose: PropTypes.func.isRequired,
}

export default NewRoleModal;