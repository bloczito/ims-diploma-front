import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Grid, Table, TableBody, TableCell,
    TableHead, TableRow,
    Typography
} from "@material-ui/core";

import styles from "./PlannedShipmentCard.module.scss"
import { connect } from "react-redux";
import { userRoles } from "../../_constants";
import DeleteIcon from "@material-ui/icons/Delete";

const isDisabled = (id, isEdited) => {
    if (id === undefined) return false;
    return !!isEdited;
}

const PlannedShipmentCard = ({plannedShipment, isEdited, deletePlannedShipment, roles}) => {
    const {
        id,
        week,
        year,
        plannedShipmentElements
    } = plannedShipment;


    return (
        <Card variant="outlined" className={styles.wrapper}>
            <CardHeader
                title={
                    <Grid container item alignItems="center">
                        {!id && (
                            <Chip
                                className={styles.newShipmentChip}
                                label={<Typography style={{fontWeight: "bold"}}>Nowe</Typography>}
                                color="secondary"
                                size="small"
                            />
                        )}
                        <span>{week} - {year}</span>
                    </Grid>
                }

                action={(roles.includes(userRoles.ROLE_TRADER) || roles.includes(userRoles.ROLE_TRADER_SUPERVISOR)) && (
                    <>
                        {isDisabled(id, isEdited) && (
                            <Typography variant="caption" color="secondary">Muisz zapisać aby usunąć</Typography>
                        )}
                        <Button
                            color="secondary"
                            variant="outlined"
                            startIcon={<DeleteIcon/>}
                            disabled={isDisabled(id, isEdited)}
                            onClick={deletePlannedShipment}
                        >
                            Usuń
                        </Button>
                    </>
                )}
            />
            <CardContent>
                <Table size="small">
                    <TableHead>
                        <TableCell style={{fontWeight: "bold"}}>Kod</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Nazwa</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Wymiary</TableCell>
                        <TableCell style={{fontWeight: "bold"}}>Ilość</TableCell>
                    </TableHead>
                    <TableBody>
                        {plannedShipmentElements.map(({product, quantity}) =>(
                            <TableRow key={product.id}>
                                <TableCell>{product.code}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{`${product.width} x ${product.height} x ${product.depth}`}</TableCell>
                                <TableCell>{quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}



PlannedShipmentCard.propTypes = {
    isEdited: PropTypes.bool.isRequired,
    deletePlannedShipment: PropTypes.func.isRequired,
    plannedShipment: PropTypes.shape({
        id: PropTypes.number,
        week: PropTypes.number,
        year: PropTypes.number,
        plannedShipmentElements: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            quantity: PropTypes.number,
            product: PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                code: PropTypes.number.isRequired,
            })
        }))
    })
}

const mapStateToProps = state => {
    const {roles} = state.authentication;
    return {
        roles,
    }
}

export default connect(
    mapStateToProps,
    null
)(PlannedShipmentCard)
