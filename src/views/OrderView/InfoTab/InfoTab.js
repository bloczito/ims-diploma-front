import React from "react";
import PropTypes from "prop-types";
import { Grid, MenuItem, TextField } from "@material-ui/core";
import CustomSelect from "../../../components/CustomSelect/FormikSelect";
import TextDivider from "../../../components/TextDivider/TextDivider";


const InfoTab = ({formik}) => {

    return (
        <Grid container>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TextField
                        label="Numer umowy"
                        name="orderNumber"
                        value={formik.values.orderNumber}
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        type="date"
                        label="Data"
                        name="orderDate"
                        InputLabelProps={{shrink: true}}
                        value={formik.values.orderDate}
                        onChange={formik.handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        type="date"
                        label="Termin"
                        name="deadline"
                        value={formik.values.deadline}
                        InputLabelProps={{shrink: true}}
                        onChange={formik.handleChange}
                        fullWidth
                    />
                </Grid>
            </Grid>


            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <CustomSelect
                        label="Klient"
                        name="customer.id"
                        onChange={formik.handleChange}
                        value={formik.values.customer?.id}
                    >
                        <MenuItem value={13}>ASDASD</MenuItem>
                        <MenuItem value={30}>DUPA</MenuItem>
                    </CustomSelect>
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        label="Status"
                        name="status"
                        onChange={formik.handleChange}
                        value={formik.values.status}
                    >
                        <MenuItem value={13}>ASDASD</MenuItem>
                        <MenuItem value={30}>DUPA</MenuItem>
                    </CustomSelect>
                </Grid>
            </Grid>

            <TextDivider label="Klient"/>
            <Grid container spacing={2}>
                <Grid item xs={3}>

                </Grid>
            </Grid>

        </Grid>
    )
}

InfoTab.propTypes = {
    formik: PropTypes.shape({
        handleChange: PropTypes.func,
        values: PropTypes.object,
    }).isRequired
}

export default InfoTab;
