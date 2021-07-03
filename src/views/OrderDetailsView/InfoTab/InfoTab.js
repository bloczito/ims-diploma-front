import React from "react";
import PropTypes from "prop-types";
import { Grid, MenuItem } from "@material-ui/core";
import TextDivider from "../../../components/TextDivider/TextDivider";
import { orderPriority, orderStatus } from "../../../_constants";
import Input from "../../../components/Input/Input"


const InfoTab = ({values, handleChange, priorities, statuses, defaultValues}) => {

    return (
        <Grid container>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Input
                        label="Numer umowy"
                        name="orderNumber"
                        value={values.orderNumber}
                        InputLabelProps={{shrink: true}}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Input
                        type="date"
                        label="Data"
                        name="orderDate"
                        InputLabelProps={{shrink: true}}
                        value={values.orderDate}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Input
                        type="date"
                        label="Termin"
                        name="deadline"
                        value={values.deadline}
                        InputLabelProps={{shrink: true}}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Input
                        label="Priorytet"
                        name="priority"
                        onChange={handleChange}
                        value={values.priority}
                        defaultValue="LOW"
                        select
                    >
                        {priorities.map(el => (
                            <MenuItem key={el} value={el}>{orderPriority[el]}</MenuItem>
                        ))}
                    </Input>
                </Grid>
                <Grid item xs={3}>
                    <Input
                        label="Status"
                        name="status"
                        onChange={handleChange}
                        value={values.status}
                        defaultValue="NEW"
                        select
                    >
                        {statuses.map(el => (
                            <MenuItem key={el} value={el}>{orderStatus[el]}</MenuItem>
                        ))}
                    </Input>
                </Grid>
            </Grid>

            <TextDivider label="Dane Klienta"/>

            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Input
                        label="Nazwa"
                        value={values?.customer?.name}
                        disabled
                    />
                </Grid>

                <Grid item xs={3}>
                    <Input
                        label="Email"
                        value={values?.customer?.email}
                        disabled
                    />
                </Grid>

                <Grid item xs={3}>
                    <Input
                        label="Telefon"
                        value={values?.customer?.phone}
                        disabled
                    />
                </Grid>
            </Grid>

        </Grid>
    )
}

InfoTab.propTypes = {
    handleChange: PropTypes.func,
    values: PropTypes.object,
    statuses: PropTypes.arrayOf(PropTypes.string).isRequired,
    priorities: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default InfoTab;
