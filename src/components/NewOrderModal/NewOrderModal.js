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
import { useForm } from "react-hook-form";
import DefaultSelect from "../DefaultSelect/DefaultSelect";
import {customerService, companyService} from "../../_service";
import DialogFooter from "../DialogFooter/DialogFooter";

const NewOrderModal = ({ open, closeFn, handleNewOrderSubmit}) => {

    const [customers, setCustomers] = useState([]);
    const [companies, setCompanies] = useState([])

    const {register, control, handleSubmit} = useForm();

    const downloadInitData = async () => {
        const customersResponse = await customerService.getAll();
        const companiesResponse = await companyService.getAll();
        setCustomers(customersResponse);
        setCompanies(companiesResponse);
    }

    useEffect(() => {
        downloadInitData();
    }, [])


    return (

        <Dialog
            maxWidth="lg"
            className={styles.wrapper}
            open={open}
            onClose={closeFn}
        >
            <DialogTitle>Dodaj nową umowę</DialogTitle>
            <DialogContent>
                <Grid container >
                    <form onSubmit={handleSubmit(handleNewOrderSubmit)} id="new-order-form">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    name="orderNumber"
                                    label="Numer umowy"
                                    inputRef={register}
                                    required
                                />
                            </Grid>

                            <Grid item xs={4} >
                                <TextField
                                    type="date"
                                    name="orderDate"
                                    label="Data umowy"
                                    InputLabelProps={{shrink: true}}
                                    inputRef={register}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField className={styles.date}
                                           type="date"
                                           name="deadline"
                                           label="Termin"
                                           InputLabelProps={{shrink: true}}
                                           inputRef={register}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <DefaultSelect
                                    label="Klient"
                                    control={control}
                                    name="customer"
                                    // value={12}
                                    required
                                >
                                    {customers.length &&
                                        customers.map(customer => (
                                            <MenuItem key={customer.id} value={customer.id}>{ customer.name }</MenuItem>
                                        ))
                                    }
                                </DefaultSelect>
                            </Grid>
                            <Grid item xs={4}>
                                <DefaultSelect
                                    label="Firma"
                                    control={control}
                                    name="company"
                                    required
                                >
                                    {companies.length &&
                                            companies.map(company => (
                                                <MenuItem key={company.id} value={company.id}>{ company.name }</MenuItem>
                                            ))
                                    }
                                </DefaultSelect>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </DialogContent>
            <DialogFooter
                cancelFn={closeFn}
                submitFn={handleNewOrderSubmit}
            />
        </Dialog>

    )


}


NewOrderModal.propTypes = {
    open: PropTypes.bool.isRequired,
    closeFn: PropTypes.func
}

export default NewOrderModal;
