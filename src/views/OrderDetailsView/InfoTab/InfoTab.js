import React from "react";
import PropTypes from "prop-types";
import { Grid, MenuItem, TextField } from "@material-ui/core";
import CustomSelect from "../../../components/CustomSelect/CustomSelect";
import TextDivider from "../../../components/TextDivider/TextDivider";
import { orderPriority, orderStatus } from "../../../_constants";


const InfoTab = ({values, handleChange, priorities, statuses, defaultValues}) => {

    return (
        <Grid container>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TextField
                        label="Numer umowy"
                        name="orderNumber"
                        value={values.orderNumber}
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        type="date"
                        label="Data"
                        name="orderDate"
                        InputLabelProps={{shrink: true}}
                        value={values.orderDate}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        type="date"
                        label="Termin"
                        name="deadline"
                        value={values.deadline}
                        InputLabelProps={{shrink: true}}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={3}>
                    {/*<CustomSelect*/}
                    {/*    label="Priorytet"*/}
                    {/*    name="priority"*/}
                    {/*    onChange={handleChange}*/}
                    {/*    value={values.priority}*/}
                    {/*    defaultValue="LOW"*/}
                    {/*>*/}
                    {/*    {priorities.map(el => (*/}
                    {/*        <MenuItem key={el} value={el}>{orderPriority[el]}</MenuItem>*/}
                    {/*    ))}*/}

                    {/*</CustomSelect>*/}
                    <TextField
                        label="Priorytet"
                        name="priority"
                        onChange={handleChange}
                        value={values.priority}
                        defaultValue="LOW"
                        select
                        fullWidth
                    >
                        {priorities.map(el => (
                            <MenuItem key={el} value={el}>{orderPriority[el]}</MenuItem>
                        ))}
                    </TextField>

                    {console.log(values.priority)}
                    {/*<TextField*/}
                    {/*    label="Priorytet"*/}
                    {/*    name="priority"*/}
                    {/*    select*/}
                    {/*    fullWidth*/}
                    {/*    defaultValue={values.priority}*/}
                    {/*    value={values.priority}*/}
                    {/*>*/}
                    {/*    {priorities.map(el => (*/}
                    {/*        <MenuItem key={el} value={el}>{orderPriority[el]}</MenuItem>*/}
                    {/*    ))}*/}
                    {/*</TextField>*/}
                </Grid>
                <Grid item xs={3}>
                    {/*<CustomSelect*/}
                    {/*    label="Status"*/}
                    {/*    name="status"*/}
                    {/*    onChange={handleChange}*/}
                    {/*    value={values?.status}*/}
                    {/*>*/}
                    {/*    {statuses.map(el => (*/}
                    {/*      <MenuItem key={el} value={el}>{orderStatus[el]}</MenuItem>*/}
                    {/*    ))}*/}
                    {/*</CustomSelect>*/}
                    <TextField
                        label="Status"
                        name="status"
                        onChange={handleChange}
                        value={values.status}
                        defaultValue="NEW"
                        fullWidth
                        select
                    >
                        {statuses.map(el => (
                            <MenuItem key={el} value={el}>{orderStatus[el]}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            <TextDivider label="Dane Klienta"/>

            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TextField
                        label="Nazwa"
                        value={values?.customer?.name}
                        disabled
                        fullWidth
                        InputLabelProps={{shrink: values?.customer?.name}}
                    />
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        label="Email"
                        value={values?.customer?.email}
                        disabled
                        fullWidth
                        InputLabelProps={{shrink: values?.customer?.email}}
                    />
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        label="Telefon"
                        value={values?.customer?.phone}
                        disabled
                        fullWidth
                        InputLabelProps={{shrink: values?.customer?.phone}}
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
