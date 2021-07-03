import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Card, CardActions,
    CardContent,
    Collapse,
    Grid, IconButton,
    Table,
    TableBody,
    TableCell,
    TableRow, TextField,
    Typography
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { Autocomplete } from "@material-ui/lab";
import { productService } from "../../_service";
import Input from "../Input/Input";

const NewMerchOrderForm = ({submitNewMerchOrder}) => {

    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [queryResults, setQueryResults] = useState([]);
    const [reRender, setReRender] = useState(0);
    const [newProduct, setNewProduct] = useState({
        product: null,
        quantity: 0,
    });
    const [newOrder, setNewOrder] = useState({
        comment: null,
        orderElements: [],
    });

    const MIN_CHARACTERS = 3;

    useEffect(() => {
        if (searchTerm.length >= MIN_CHARACTERS) {
            getProductsByQuery(searchTerm)
        }
    }, [searchTerm]);


    const getProductsByQuery = async query => {
        const response = await productService.getByQuery(query)
        setQueryResults(response.resource);
        console.log(response);

    }

    const addItem = () => {
        const newOrderElement = {
            product: newProduct.product,
            quantity: newProduct.quantity,
        }

        setNewOrder(prevState => ({
            ...prevState,
            orderElements: [...prevState.orderElements, newOrderElement]
        }));

        setNewProduct({product: null, quantity: 0})
        setReRender(prevState => ++prevState)
    }

    const removeItem = index => {
        setNewOrder(prevState => {
            const newArr = [...prevState.orderElements];
            newArr.splice(index, 1);
            return {
                ...prevState,
                orderElements: newArr
            }
        })
    }

    const submitNewOrder = (e) => {
        e.preventDefault();
        submitNewMerchOrder(newOrder);
        setNewOrder({
            orderElements: [],
            comment: null,
        })
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
            <Collapse in={isAdding} style={{width: "100%", marginTop: 10}} timeout="auto">
                <Card variant="outlined">
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Grid container>
                                    <Table size="small">
                                        <TableBody>
                                            {newOrder.orderElements.map(({product, quantity}, index) => (
                                                <TableRow key={`${product.code} - ${quantity}`}>
                                                    <TableCell width="15%">{product.code}</TableCell>
                                                    <TableCell>{product.name}</TableCell>
                                                    <TableCell width="10%">{quantity}</TableCell>
                                                    <TableCell width="10%">
                                                        <IconButton
                                                            size="small"
                                                            color="secondary"
                                                            onClick={() => removeItem(index)}
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
                                            onChange={(event, value) => setNewProduct(prevState => ({
                                                    ...prevState,
                                                    product: value
                                                }
                                            ))}
                                            value={newProduct.product}
                                            noOptionsText={searchTerm.length >= MIN_CHARACTERS ? "Brak wyników" : `Podaj minimum ${MIN_CHARACTERS} znaki`}
                                            options={queryResults || []}
                                            onInputChange={((event, value, reason) => {
                                                setSearchTerm(value)
                                            })}
                                            getOptionLabel={option => `${option.code} | ${option.name}`}
                                            clearOnBlur
                                            renderInput={params => (
                                                <Input
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
                                        <Input
                                            label="Ilość"
                                            type="number"
                                            defaultValue={0}
                                            variant="outlined"
                                            name="newQuantity"
                                            fullWidth
                                            size="small"
                                            inputProps={{min: 0, step: 1}}
                                            onChange={e => setNewProduct(prevState => ({
                                                ...prevState,
                                                quantity: parseInt(e.target.value)
                                            }))}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="primary"
                                        // type="submit"
                                        formTarget="#asd"
                                        disabled={!(newProduct.product && newProduct.quantity)}
                                        onClick={addItem}
                                    >
                                        Dodaj element
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Input
                                    name="comment"
                                    variant="outlined"
                                    multiline
                                    rows={6}
                                    fullWidth
                                    label="Komentarz"
                                    onChange={e => setNewOrder(prevState => ({...prevState, comment: e.target.value}))}
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
                            disabled={!newOrder.orderElements.length}
                            autoCapitalize="off"
                            onClick={submitNewOrder}
                        >
                            Dodaj zamówienie
                        </Button>
                    </CardActions>
                </Card>
            </Collapse>
        </>
    )
}


NewMerchOrderForm.propTypes = {
    submitNewMerchOrder: PropTypes.func.isRequired,
}

export default NewMerchOrderForm;
