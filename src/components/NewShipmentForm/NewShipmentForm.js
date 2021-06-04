import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Card, CardActions,
    CardContent,
    Collapse,
    Grid, IconButton, MenuItem,
    Table,
    TableBody,
    TableCell,
    TableRow, TextField,
    Typography
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CustomSelect from "../CustomSelect/CustomSelect";
import { Autocomplete } from "@material-ui/lab";
import DeleteIcon from "@material-ui/icons/Delete";

import styles from "./NewShipmentForm.module.scss";



const NewShipmentForm = ({notShippedElements, customerObjects, submitNewShipment}) => {
    const [isAdding, setIsAdding] = useState(false);
    const [reRender, setReRender] = useState(0);
    const [newProduct, setNewProduct] = useState({
        product: null,
        quantity: 0
    });
    const [newShipment, setNewShipment] = useState({
        comment: null,
        shipmentDate: null,
        shipmentObject: null,
        shipmentElements: [],
    })


    const handleQuantityChange = evt => {
        setNewProduct(prev => ({...prev, quantity: parseInt(evt.target.value)}))
    }

    const getMaxAvailableQuantity = () => {
        if (newProduct.product == null) return 0;
        else {
            const shippedQuantity = newShipment.shipmentElements.find(el => el.product === newProduct.product)?.quantity || 0;
            return notShippedElements.find(el => el.product === newProduct.product).quantity - shippedQuantity;
        }
    }

    const handleAddElement = () => {
        const shippedElement = newShipment.shipmentElements.find(el => el.product === newProduct.product);

        if (shippedElement) {
            setNewShipment(prevState => ({
                ...prevState,
                shipmentElements: [
                    ...prevState.shipmentElements.map(el => {
                        if (el.product === newProduct.product) {
                            el.quantity += newProduct.quantity;
                        }
                        return el;
                    })
                ]
            }))
        } else {
            setNewShipment(prevState => ({
                ...prevState,
                shipmentElements: [...prevState.shipmentElements, newProduct],
            }));
        }

        setNewProduct({product: null, quantity: 0});
    }

    const handleRemoveElement = index => {
        setNewShipment(prevState => ({
            ...prevState,
            shipmentElements: prevState.shipmentElements.filter((e, idx) => idx !== index)
        }));
    }

    const handleChooseObject = evt => {
        setNewShipment(prevState => ({
            ...prevState,
            shipmentObject: customerObjects.find(obj => obj.id === evt.target.value),
        }));
    }

    const handleSubmitNewShipment = evt => {
        evt.preventDefault();
        submitNewShipment(newShipment);
        setNewShipment({
            shipmentElements: [],
            comment: null,
            shipmentObject: null,
            shipmentDate: null,
        });
        setReRender(prevState => ++prevState);
        setIsAdding(false);
    }

    return (
        <>
            <Button
                variant={isAdding ? "outlined" : "contained"}
                color={isAdding ? "secondary" : "primary"}
                type="button"
                disableElevation
                fullWidth
                onClick={() => setIsAdding(prevState => !prevState)}
                startIcon={isAdding ? <CancelIcon/> : <AddCircleIcon/>}
            >
                <Typography variant="button">
                    {isAdding ? "Anuluj" : "Nowe zamówienie"}
                </Typography>
            </Button>
            <Collapse in={isAdding} className={styles.formWrapper}>
                <Card variant="outlined">
                    <CardContent  key={reRender}>
                        <Grid container spacing={2} >
                            <Grid item xs={6}>
                                <CustomSelect
                                    label="Obiekt"
                                    variant="outlined"
                                    name=""
                                    onChange={handleChooseObject}
                                    size="small"
                                >
                                    {customerObjects.map(obj => (
                                       <MenuItem key={obj.id} value={obj.id}>{obj.address.city} {obj.address.street} {obj.address.houseNumber}</MenuItem>
                                    ))}
                                </CustomSelect>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Data"
                                    InputLabelProps={{shrink:  true}}
                                    type="date"
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    onChange={evt => setNewShipment(prevState => ({...prevState, shipmentDate: evt.target.value}))}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{marginTop: 10}}>
                            <Grid item xs={8}>
                                <Grid container>
                                    <Table size="small">
                                        <TableBody>
                                            {newShipment.shipmentElements.map(({product, quantity}, index) => (
                                                <TableRow key={`${product.code} - ${quantity}`}>
                                                    <TableCell>{product.code}</TableCell>
                                                    <TableCell>{product.name}</TableCell>
                                                    <TableCell>{quantity}</TableCell>
                                                    <TableCell width="10%">
                                                        <IconButton
                                                            size="small"
                                                            color="secondary"
                                                            onClick={() => handleRemoveElement(index)}
                                                        >
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Grid>

                                <Grid container spacing={1} className={styles.productInputWrapper}>
                                    <Grid item xs={10} >
                                        <Autocomplete
                                            onChange={(event, value) => setNewProduct(prevState => ({
                                                    quantity: 0,
                                                    product: value,
                                                }
                                            ))}
                                            value={newProduct.product}
                                            options={notShippedElements.map(el => el.product)}
                                            getOptionLabel={option => `${option.code} | ${option.name}`}
                                            clearOnBlur
                                            renderInput={params => (
                                                <TextField
                                                    {...params}
                                                    label="Nazwa lub kod produktu"
                                                    variant="outlined"
                                                    name="newProduct"
                                                    fullWidth
                                                    size="small"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            label="Ilość"
                                            type="number"
                                            defaultValue={0}
                                            value={newProduct.quantity}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            disabled={!newProduct.product}
                                            inputProps={{min: 0, step: 1, max: getMaxAvailableQuantity()}}
                                            onChange={handleQuantityChange}
                                        >

                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    startIcon={<AddCircleIcon/>}
                                    disabled={!(newProduct.product && newProduct.quantity)}
                                    onClick={handleAddElement}
                                >
                                    Dodaj element
                                </Button>
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    name="comment"
                                    variant="outlined"
                                    multiline
                                    rows={6}
                                    fullWidth
                                    label="Komentarz"
                                    onChange={evt => setNewShipment(prevState => ({...prevState, comment: evt.target.value}))}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            fullWidth
                            startIcon={<AddCircleIcon/>}
                            disabled={!(newShipment.shipmentElements.length && newShipment.shipmentObject != null && newShipment.shipmentDate != null && newShipment.shipmentDate != "")}
                            onClick={handleSubmitNewShipment}
                        >
                            Dodaj zamówienie
                        </Button>
                    </CardActions>
                </Card>
            </Collapse>
        </>
    )
}

NewShipmentForm.propTypes = {
    notShippedElements: PropTypes.arrayOf(PropTypes.shape({
        quantity: PropTypes.number,
        product: PropTypes.shape({
            id: PropTypes.number,
            code: PropTypes.number,
            name: PropTypes.string,
        })
    })).isRequired,
    customerObjects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        address: PropTypes.shape({
            city: PropTypes.string,
            street: PropTypes.string,
            postcode: PropTypes.string,
            houseNumber: PropTypes.string,
            apartmentNumber: PropTypes.string,
            voivodeship: PropTypes.string,
            country: PropTypes.string,
    })})).isRequired,
    submitNewShipment: PropTypes.func,
}


export default NewShipmentForm;