import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader, Chip,
    Collapse,
    Grid, Table, TableBody, TableCell, TableHead, TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import DeleteIcon from '@material-ui/icons/Delete';

import styles from "./ShipmentCard.module.scss";
import { connect } from "react-redux";
import { userRoles } from "../../_constants";

const isDisabled = (id, isEdited) => {
    if (id === undefined) return false;
    return !!isEdited;
}


const ShipmentCard = ({shipment, deleteShipment, isEdited, onChange, commentName, roles}) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const {
        id,
        shipmentDate,
        shipmentObject: {address},
        comment,
    } = shipment;

    return (
        <Card variant="outlined" className={styles.wrapper}>
            <CardHeader
                title={
                    <Grid container item alignItems="center">
                        {!id &&
                            <Chip className={styles.newShipmentChip}
                                label={<Typography style={{fontWeight: "bold"}}>Nowe</Typography>}
                                color="secondary"
                                size="small"
                            />
                        }
                        <span>{shipmentDate}</span>
                    </Grid>
                }
                action={
                    (roles.includes(userRoles.ROLE_TRADER) || roles.includes(userRoles.ROLE_TRADER_SUPERVISOR)) &&
                    <>
                        {isDisabled(shipment.id, isEdited) &&(
                            <Typography variant="caption" color="secondary">Muisz zapisać aby usunąć </Typography>
                        )}
                        <Button
                            color="secondary"
                            variant="outlined"
                            startIcon={<DeleteIcon/>}
                            disabled={isDisabled(shipment.id, isEdited)}
                            onClick={deleteShipment}
                        >
                            Usuń
                        </Button>
                    </>
                }
            />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" style={{fontWeight: "bold"}}>
                            Adres magazynu
                        </Typography>
                        <Typography>
                            {`ul. ${address?.street} ${address?.houseNumber + (address.apartmentNumber ? ("/" + address.apartmentNumber) : "") }`}
                        </Typography>
                        <Typography>
                            {`${address.postcode ? address.postcode : ""} ${address?.city}`}
                        </Typography>
                        <Typography>
                            {`${address.voivodeship ? address.voivodeship : ""}, ${address?.country}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            name={commentName}
                            multiline
                            rows={5}
                            fullWidth
                            label="Komentarz"
                            value={comment}
                            onChange={onChange}
                        />
                    </Grid>
                </Grid>

                <CardActions style={{paddingLeft: 0, paddingRight: 0, marginTop: 10}}>
                    <Button
                        variant={isExpanded ? "outlined" : "contained"}
                        color="primary"
                        disableElevation
                        endIcon={isExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                        fullWidth
                        onClick={() => setIsExpanded(prevState => !prevState)}
                    >
                        <Typography>
                            {isExpanded ? "Schowaj" : "Wyświetl"} wysłane produkty
                        </Typography>
                    </Button>
                </CardActions>

                <Collapse in={isExpanded}>
                    <Table size="small">
                        <TableHead>
                            <TableCell style={{fontWeight: "bold"}}>Kod</TableCell>
                            <TableCell style={{fontWeight: "bold"}}>Nazwa</TableCell>
                            <TableCell style={{fontWeight: "bold"}}>Wymiary</TableCell>
                            <TableCell style={{fontWeight: "bold"}}>Ilość</TableCell>
                        </TableHead>
                        <TableBody>
                            {shipment.shipmentElements.map(({product, quantity}) =>(
                              <TableRow key={product.id}>
                                  <TableCell>{product.code}</TableCell>
                                  <TableCell>{product.name}</TableCell>
                                  <TableCell>{`${product.width} x ${product.height} x ${product.depth}`}</TableCell>
                                  <TableCell>{quantity}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Collapse>
            </CardContent>
        </Card>
    );

}

ShipmentCard.propTypes = {
    isEdited: PropTypes.bool.isRequired,
    deleteShipment: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    commentName: PropTypes.string.isRequired,
    shipment: PropTypes.shape({
        id: PropTypes.number,
        comment: PropTypes.string,
        shipmentDate: PropTypes.string,
        shipmentObject: PropTypes.shape({
            address: PropTypes.shape({
                city: PropTypes.string,
                street: PropTypes.string,
                postcode: PropTypes.string,
                houseNumber: PropTypes.string,
                apartmentNumber: PropTypes.string,
                voivodeship: PropTypes.string,
                country: PropTypes.string,
            })
        }),
        shipmentElements: PropTypes.arrayOf({
            id: PropTypes.number,
            quantity: PropTypes.number,
            product: PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                code: PropTypes.number.isRequired,
                // basePrice: PropTypes.number.isRequired,
                // width: PropTypes.number,
                // height: PropTypes.number,
                // depth: PropTypes.number,
                // weight: PropTypes.number,
                // descriptionEng: PropTypes.string,
                // descriptionGer: PropTypes.string,
            })
        })
    }).isRequired,
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
)(ShipmentCard);

