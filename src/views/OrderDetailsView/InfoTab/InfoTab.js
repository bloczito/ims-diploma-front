import React from "react";
import PropTypes from "prop-types";
import { Grid, MenuItem, TextField } from "@material-ui/core";
import CustomSelect from "../../../components/CustomSelect/CustomSelect";
import TextDivider from "../../../components/TextDivider/TextDivider";
import { orderPriority, orderStatus } from "../../../_constants";


const InfoTab = ({formik, priorities, statuses}) => {

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
                        label="Priorytet"
                        name="priority"
                        onChange={formik.handleChange}
                        value={formik.values?.priority}
                    >
                        {priorities.map(el => (
                            <MenuItem key={el} value={el}>{orderPriority[el]}</MenuItem>
                        ))

                        }

                    </CustomSelect>
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        label="Status"
                        name="status"
                        onChange={formik.handleChange}
                        value={formik.values?.status}
                    >
                        {statuses.map(el => (
                          <MenuItem key={el} value={el}>{orderStatus[el]}</MenuItem>
                        ))}
                    </CustomSelect>
                </Grid>
            </Grid>

            <TextDivider label="Dane Klienta"/>

            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TextField
                        label="Nazwa"
                        value={formik.values?.customer?.name}
                        disabled
                        fullWidth
                        InputLabelProps={{shrink: formik.values?.customer?.name}}
                    />
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        label="Email"
                        value={formik.values?.customer?.email}
                        disabled
                        fullWidth
                        InputLabelProps={{shrink: formik.values?.customer?.email}}
                    />
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        label="Telefon"
                        value={formik.values?.customer?.phone}
                        disabled
                        fullWidth
                        InputLabelProps={{shrink: formik.values?.customer?.phone}}
                    />
                </Grid>
            </Grid>

        </Grid>
    )
}

InfoTab.propTypes = {
    formik: PropTypes.shape({
        handleChange: PropTypes.func,
        values: PropTypes.object,
    }).isRequired,
    statuses: PropTypes.arrayOf(PropTypes.string).isRequired,
    priorities: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default InfoTab;
