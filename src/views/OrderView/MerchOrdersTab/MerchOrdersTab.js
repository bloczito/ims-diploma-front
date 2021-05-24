import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Grid, IconButton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography,
} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import TextDivider from "../../../components/TextDivider/TextDivider";
import { Autocomplete } from "@material-ui/lab";
import moment from "moment/moment";
import { productService } from "../../../_service";
import MerchOrderCard from "../../../components/MerchOrderCard/MerchOrderCard";
import DeleteIcon from "@material-ui/icons/Delete";

const merchOrderInitialState = {
    orderElements: [],
    comment: null
}


const MerchOrdersTab = ({ order:  {merchOrders}, handleChange, formik, submitNewMerchOrder}) => {

    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [queryResults, setQueryResults] = useState([]);
    const [newProduct, setNewProduct] = useState({
        product: null,
        quantity: 0,
    });
    const [newOrder, setNewOrder] = useState({
        comment: null,
        orderElements: [],
    });
    const [reRender, setReRender] = useState(0);

    const getProductsByQuery = async query => {
        const response = await productService.getByQuery(query)
        setQueryResults(response.resource);
        console.log(response);
    }

    useEffect(() => {
        if (searchTerm.length >=3) {
            getProductsByQuery(searchTerm)
        }
    }, [searchTerm])


    const addNewItem = () => {
        const newOrderElement = {
            product: newProduct.product,
            quantity: newProduct.quantity,
        }

        setNewOrder(prevState => ({
            ...prevState,
            orderElements: [...prevState.orderElements, newOrderElement]
        }));

        setNewProduct({ product: null, quantity: 0 })
        setReRender(prevState => ++prevState)
    }

    const removeItem = (index) => {
        setNewOrder(prevState => {
            const newArr = [...prevState.orderElements];
            newArr.splice(index, 1);
            return {
            ...prevState,
            orderElements: newArr
        }})
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
            <Grid container>
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
                                                                <DeleteIcon />
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
                                                    noOptionsText={searchTerm.length >= 3 ? "Brak wyników" : "Podaj minimum 3 znaki"}
                                                    options={queryResults || []}
                                                    onInputChange={((event, value, reason) => {setSearchTerm(value)})}
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
                                                    variant="outlined"
                                                    name="newQuantity"
                                                    fullWidth
                                                    size="small"
                                                    inputProps={{min: 0, step: 1}}
                                                    onChange={e => setNewProduct(prevState => ({...prevState, quantity: parseInt(e.target.value)}))}
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
                                            onClick={addNewItem}
                                        >
                                            Dodaj element
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
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
                        <CardActions >
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
            </Grid>

            <TextDivider />

            <Grid container>
                {formik.values.merchOrders.map((merchOrder, index) => (
                    <MerchOrderCard
                        onChange={formik.handleChange}
                        commentValue={formik.values.merchOrders[index].comment}
                        merchOrder={merchOrder}
                        commentName={`merchOrders[${index}].comment`}
                    />
                ))}
            </Grid>

        </>

    )

}

MerchOrdersTab.propTypes = {
    order: PropTypes.shape({
        merchOrders: PropTypes.arrayOf(PropTypes.shape({
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
        }))
    }).isRequired,
    handleChange: PropTypes.func,
    submitNewMerchOrder: PropTypes.func.isRequired
}

MerchOrdersTab.defaultProps = {
    order: {
        merchOrders:[]
    },

}

export default MerchOrdersTab;