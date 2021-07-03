import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import DialogHeader from "../DialogHeader/DialogHeader";
import { useFormik } from "formik";
import {
    Checkbox,
    Dialog,
    DialogContent,
    Grid,
    InputAdornment,
    ListItemText,
    MenuItem,
    TextField
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/AlternateEmail";
import PhoneIcon from "@material-ui/icons/Phone";

import styles from "./UserModal.module.scss";
import DialogFooter from "../DialogFooter/DialogFooter";
import { userService } from "../../_service";
import CustomSelect from "../CustomSelect/CustomSelect";
import { roleService } from "../../_service/role.service";



const UserModal = ({isOpen, onClose, submitFn, id, deleteFn}) => {

    const [roles, setRoles] = useState([]);

    const formik = useFormik({
        onSubmit: (values, {resetForm}) => {
            submitFn(values);
            resetForm();
        },
        enableReinitialize: true,
        initialValues: {},
    });

    console.log("FORMIK", formik.values);

    useEffect(() => {
        roleService.getAll()
            .then(res => {
                if (res.success) {
                    setRoles(res.resource);
                }
            })
    }, [])

    useEffect( () => {
        if (id) {
            userService.getById(id)
                .then(res => {
                    if (res.success) {
                        console.log("USER, ", res)
                        formik.setValues({...res.resource})
                    }
                });
        }
    }, [id])


    const handleRoleChoose = evt => {
        const {value: selectedRolesIds} = evt.target;

        const userRoles = roles.filter(role => selectedRolesIds.includes(role.id))

        formik.setFieldValue("roles", userRoles);
    }

    const handleModalClose = () => {
        formik.resetForm({});
        onClose();
    }

    return (
        <Dialog
            open={isOpen}
            maxWidth="md"
            onClose={handleModalClose}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <DialogHeader closeFn={handleModalClose}>
                    {id ? "Edytuj użytkownika" : "Dodaj nowego użytkownika"}
                </DialogHeader>

                <DialogContent dividers>
                    <Grid container spacing={2} >
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="username"
                                label="Nazwa użytkownika"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                InputLabelProps={{
                                    shrink: formik.values.username,
                                }}
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="password"
                                label="Hasło"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="confirmPassword"
                                label="Potwierdź hasło"
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="firstName"
                                label="Imię"
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="lastName"
                                label="Nazwisko"
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="shortcut"
                                label="Skrót"
                                onChange={formik.handleChange}
                                value={formik.values.shortcut}
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
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                name="phone"
                                label="Telefon"
                                onChange={formik.handleChange}
                                value={formik.values.phone}
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
                                onChange={formik.handleChange}
                                value={formik.values.job}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <CustomSelect
                                label="Uprawnienia"
                                name="roles"
                                onChange={handleRoleChoose}
                                value={formik.values?.roles?.map(r => r.id) || []}
                                multiple
                                renderValue={selected => roles
                                    .filter(role => selected.includes(role.id))
                                    .map(role => role.name)
                                    .join(", ")}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.id}>
                                        <Checkbox checked={
                                            (formik.values.roles ?? [])
                                                .map(role => role.id)
                                                .includes(role.id)
                                        }/>
                                        <ListItemText primary={role.name} />
                                    </MenuItem>
                                ))}
                            </CustomSelect>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogFooter
                    cancelFn={handleModalClose}
                    submitText={id ? "Zapisz" : "Dodaj"}
                    deleteFn={id && (() => deleteFn(id))}
                />
            </form>
        </Dialog>
    )


}


UserModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    submitFn: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    deleteFn: PropTypes.func,
    id: PropTypes.number,
}

export default UserModal;


