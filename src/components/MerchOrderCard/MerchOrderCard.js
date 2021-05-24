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
    TextField,
    Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";

import styles from "./MerchOrderCard.module.scss";


const MerchOrderCard = ({merchOrder, commentName, commentValue, onChange}) => (
    <Card className={styles.wrapper} variant="outlined">
        <CardHeader
            title={
                <Grid container item alignItems="center">
                    {!merchOrder.id &&
                        <Chip style={{marginRight: 5}}
                            label={
                                <Typography style={{fontWeight: 'bold'}} >Nowe</Typography>
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
                <Button
                    color="secondary"
                    variant="outlined"
                    startIcon={<DeleteIcon/>}
                    disableElevation
                >
                    Usuń
                </Button>
            }
        />
        <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Table size="small" >
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
                        value={commentValue}
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
    commentName: PropTypes.string.isRequired,
    commentValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default MerchOrderCard;