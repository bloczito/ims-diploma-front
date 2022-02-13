import React, { useState } from "react";
import {
    Button,
    Card, CardActions,
    CardContent,
    Collapse,
    Grid, IconButton,
    MenuItem,
    Table,
    TableBody, TableCell, TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Input from "../Input/Input";
import { Autocomplete } from "@material-ui/lab";
import moment from "moment";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";


const getYearsOptions = () => {
    const currentYear = moment().year();

    const years = [];

    for (let i = 0; i < 6; ++i) {
        years.push(currentYear + i)
    }

    return years
}


const NewPlannedShipmentForm = ({notShippedElements, submitNewShipment}) => {

    const [isAdding, setIsAdding] = useState(false);
    const [reRender, setReRender] = useState(0);
    const [newProduct, setNewProduct] = useState({
        product: null,
        quantity: 0
    });
    const [newShipment, setNewShipment] = useState({
        shipmentWeek: moment().isoWeek().toString(),
        shipmentYear: moment().year().toString(),
        shipmentElements: [],
    })


    const getMaxAvailableQuantity = () => {
        if (newProduct.product == null) return 0;
        else {
            const shippedQuantity = newShipment.shipmentElements.find(el => el.product === newProduct.product)?.quantity || 0;
            return notShippedElements.find(el => el.product === newProduct.product).quantity - shippedQuantity;
        }
    }

    const handleQuantityChange = evt => {
        setNewProduct(prev => ({...prev, quantity: parseInt(evt.target.value)}))
    }

    const handleSubmitNewShipment = evt => {
        evt.preventDefault();
        submitNewShipment(newShipment);

        setNewShipment({
            shipmentElements: [],
            shipmentWeek: moment().isoWeek().toString(),
            shipmentYear: moment().year().toString()
        });

        setReRender(prevState => ++prevState);
        setIsAdding(false);
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
            }));
        } else {
            setNewShipment(prevState => ({
                ...prevState,
                shipmentElements: [...prevState.shipmentElements, newProduct]
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
                    {isAdding ? "Anuluj" : "Nowa planowana wysyłka"}
                </Typography>
            </Button>

            <Collapse
                in={isAdding}
                style={{width: "100%", marginTop: 10}}
                timeout="auto"
            >
                <Card variant="outlined">
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={9}>
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

                                <Grid container spacing={2} style={{marginTop: 10, marginBottom: 5}} key={reRender}>
                                    <Grid item xs={10}>
                                        <Autocomplete
                                            onChange={(event, value) => setNewProduct({
                                                quantity: 0,
                                                product: value
                                            })}
                                            value={newProduct.product}
                                            options={notShippedElements.map(({product}) => product)}
                                            getOptionLabel={option => `${option.code} | ${option.name}`}
                                            clearOnBlur
                                            renderInput={params => (
                                                <Input
                                                    {...params}
                                                    label="Nazwa lub kod produktu"
                                                    variant="outlined"
                                                    name="newProduct"
                                                    size="small"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Input
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

                                        </Input>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12}>
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
                                </Grid>
                            </Grid>

                            <Grid item xs={3} style={{marginTop: 10, marginBottom: 5}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            select
                                            label="Tydzień"
                                            defaultValue={newShipment.shipmentWeek}
                                            options={[...Array(52).keys()].map(val => (val + 1).toString())}
                                            fullWidth
                                            style={{maxHeight: 400}}
                                            renderInput={params => (
                                                <TextField
                                                    {...params}
                                                    label="Tydzień"
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Autocomplete
                                            select
                                            label="Rok"
                                            options={getYearsOptions().map(v => v.toString())}
                                            fullWidth
                                            defaultValue={newShipment.shipmentYear}
                                            style={{maxHeight: 400}}
                                            renderInput={params => (
                                                <TextField
                                                    {...params}
                                                    label="Rok"
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
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
                            disabled={!newShipment.shipmentElements.length && newShipment.shipmentWeek && newShipment.shipmentYear}
                            onClick={handleSubmitNewShipment}
                        >
                            Dodaj wysyłkę
                        </Button>
                    </CardActions>
                </Card>
            </Collapse>
        </>
    )
}

NewPlannedShipmentForm.propTypes = {
    notShippedElements: PropTypes.arrayOf(PropTypes.shape({
        quantity: PropTypes.number,
        product: PropTypes.shape({
            id: PropTypes.number,
            code: PropTypes.number,
            name: PropTypes.string,
        })
    })).isRequired,
    submitNewShipment: PropTypes.func,
}

NewPlannedShipmentForm.defaultProps = {
    notShippedElements: [],
}

export default NewPlannedShipmentForm;
