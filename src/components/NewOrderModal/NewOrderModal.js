import React, { useEffect, useState } from "react";
import PropTypes  from "prop-types"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    TextField,
} from "@material-ui/core";
import styles from "./NewOrderModal.module.scss"
import {customerService, companyService} from "../../_service";
import DialogFooter from "../DialogFooter/DialogFooter";
import { useFormik } from "formik";
import * as Yup from "yup"
import Input from "../Input/Input";

const OrderSchema = Yup.object().shape({
    orderNumber: Yup.string().required("To pole jest wymagane"),
    customer: Yup.number().required("To pole jest wymagane"),
    company: Yup.number().required("To pole jest wymagane"),

});


const NewOrderModal = ({ open, closeFn, handleNewOrderSubmit}) => {

    const [customers, setCustomers] = useState([]);
    const [companies, setCompanies] = useState([])

    const formik = useFormik({
        onSubmit: (values, {resetForm}) => {
            handleNewOrderSubmit(values);
            resetForm();
        },
        validationSchema: OrderSchema,
        initialValues: {}
    })

    const {values, errors, touched, handleChange} = formik;

    const downloadInitData = async () => {
        const customersResponse = await customerService.getAll();
        const companiesResponse = await companyService.getAll();
        setCustomers(customersResponse);
        setCompanies(companiesResponse);
    }

    useEffect(() => {
        downloadInitData();
    }, [])

    const isError = name => errors[name];

    return (
        <Dialog
            maxWidth="xl"
            className={styles.wrapper}
            open={open}
            onClose={closeFn}
        >
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <DialogTitle>Dodaj nową umowę</DialogTitle>
                <DialogContent>
                    <Grid container >
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Input
                                    name="orderNumber"
                                    label="Numer umowy *"
                                    onChange={handleChange}
                                    value={values.orderNumber}
                                    error={isError("orderNumber")}
                                    helperText={isError("orderNumber") && errors.orderNumber}
                                />
                            </Grid>

                            <Grid item xs={4} >
                                <Input
                                    type="date"
                                    name="orderDate"
                                    label="Data umowy"
                                    fullWidth
                                    onChange={handleChange}
                                    value={values.orderDate}
                                    InputLabelProps={{shrink: true}}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <Input
                                    className={styles.date}
                                    type="date"
                                    name="deadline"
                                    label="Termin"
                                    onChange={handleChange}
                                    value={values.deadline}
                                    InputLabelProps={{shrink: true}}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Input
                                    label="Klient *"
                                    name="customer"
                                    onChange={handleChange}
                                    value={values.customer}
                                    select
                                    error={isError("customer")}
                                    helperText={isError("customer") && errors.customer}
                                >
                                    {customers.length &&
                                    customers.map(customer => (
                                        <MenuItem key={customer.id} value={customer.id}>{ customer.name }</MenuItem>
                                    ))
                                    }
                                </Input>

                            </Grid>
                            <Grid item xs={4}>
                                <Input
                                    label="Firma *"
                                    name="company"
                                    onChange={handleChange}
                                    value={values.company}
                                    select
                                    error={isError("company")}
                                    helperText={isError("company") && errors.company}
                                >
                                    {companies.length &&
                                        companies.map(company => (
                                            <MenuItem key={company.id} value={company.id}>{ company.name }</MenuItem>
                                        ))
                                    }
                                </Input>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogFooter
                    cancelFn={closeFn}
                    // submitFn={handleNewOrderSubmit}
                />
            </form>
        </Dialog>

    )


}


NewOrderModal.propTypes = {
    open: PropTypes.bool.isRequired,
    closeFn: PropTypes.func
}

export default NewOrderModal;
