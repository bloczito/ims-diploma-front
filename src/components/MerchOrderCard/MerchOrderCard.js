import React from "react";
import PropTypes from "prop-types";
import {
    Button, Card,
    CardContent,
    CardHeader, Chip,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField, Tooltip,
    Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";

import styles from "./MerchOrderCard.module.scss";
import { connect } from "react-redux";
import { userRoles } from "../../_constants";

const isDisabled = (id, isEdited) => {
    if (id === undefined) return false;
    return !!isEdited;
}

const MerchOrderCard = ({merchOrder, commentName, onChange, isEdited, deleteMerchOrder, roles}) => (
    <Card className={styles.wrapper} variant="outlined">
        <CardHeader
            title={
                <Grid container item alignItems="center">
                    {!merchOrder.id &&
                        <Chip
                            label={
                              <Typography style={{fontWeight: 'bold'}}>Nowe</Typography>
                            }
                            color="secondary"
                            size="small"
                        />
                    }
                    <span>
                         Zamówienie z dnia {moment(merchOrder.merchOrderDate).format("YYYY-MM-DD")}
                    </span>
                </Grid>
            }
            action={
                roles.includes(userRoles.ROLE_TRADER) && (
                    <>
                        {isDisabled(merchOrder.id, isEdited) &&(
                            <Typography variant="caption" color="secondary">Muisz zapisać aby usunąć </Typography>
                        )}
                        <Button
                            color="secondary"
                            variant="outlined"
                            startIcon={<DeleteIcon/>}
                            disableElevation
                            disabled={isDisabled(merchOrder.id, isEdited)}
                            onClick={deleteMerchOrder}
                        >
                            Usuń
                        </Button>
                    </>
                )}
        />
        <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Table size="small">
                        <TableBody>
                            {merchOrder.orderElements.map((element, index) => (
                                <TableRow key={index} hover>
                                    <TableCell align="left" width="15%">{element.product.code}</TableCell>
                                    <TableCell align="left">{element.product.name}</TableCell>
                                    <TableCell align="left" width="15%">{element.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        name={commentName}
                        variant="outlined"
                        multiline
                        rows={merchOrder.orderElements.length * 1.5 > 6 ? merchOrder.orderElements.length * 1.5 : 6}
                        // rows={merchOrder.orderElements.length * 1.5}
                        fullWidth
                        label="Komentarz"
                        value={merchOrder.comment}
                        onChange={onChange}
                    />

                </Grid>
            </Grid>
        </CardContent>
    </Card>
)


MerchOrderCard.propTypes = {
    merchOrder: PropTypes.shape({
        id: PropTypes.number,
        comment: PropTypes.string,
        merchOrderDate: PropTypes.string,
        orderElements: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            quantity: PropTypes.number,
            product: PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                code: PropTypes.number.isRequired,
                basePrice: PropTypes.number.isRequired,
                width: PropTypes.number,
                height: PropTypes.number,
                depth: PropTypes.number,
                weight: PropTypes.number,
                descriptionEng: PropTypes.string,
                descriptionGer: PropTypes.string,
            })
        }))
    }).isRequired,
    deleteMerchOrder: PropTypes.func.isRequired,
    isEdited: PropTypes.bool.isRequired,
    commentName: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    const {roles} = state.authentication;
    return {
        roles,
    }
}


export default connect(
 mapStateToProps,
 null,
)(MerchOrderCard);