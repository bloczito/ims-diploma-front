import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { Dialog, DialogContent, Grid, TextField } from "@material-ui/core";

import DialogHeader from "../DialogHeader/DialogHeader";
import DialogFooter from "../DialogFooter/DialogFooter";
import { roleService } from "../../_service/role.service";
import styles from "./NewRoleModal.module.scss";


const RoleModal = ({isOpen, onCancel, submitFn, id}) => {

    const formik = useFormik({
        initialValues: {},
        enableReinitialize: true,
        onSubmit: (values, {resetForm}) => {
            submitFn(values);
            resetForm();
        }
    });

    useEffect(() => {
        if (id) {
            roleService.getById(id)
                .then(res => {
                    if (res.success) {
                        formik.setValues({...res.resource})
                    }
                })
        }
    }, [id])

    const handleCancelModal = () => {
        formik.resetForm({});
        onCancel();
    }

    return (
        <Dialog
            open={isOpen}
            maxWidth="sm"
            fullWidth
            onClose={handleCancelModal}
        >
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <DialogHeader closeFn={onCancel}>
                    {id ? "Edytuj uprawnienie" : "Dodaj dodaj nowe uprawnienie"}
                </DialogHeader>

                <DialogContent dividers>
                    <Grid container className={styles.groupContainer}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="name"
                                label="Nazwa"
                                value={formik.values.name}
                                onChange={formik.handleChange}
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
                                value={formik.values.info}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogFooter
                    cancelFn={handleCancelModal}
                    submitText={id ? "Zapisz" : "Dodaj"}
                />
            </form>
        </Dialog>
    )

}

RoleModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    submitFn: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    id: PropTypes.number,
}

export default RoleModal;
