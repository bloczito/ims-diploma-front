import React from "react";
import PropTypes from "prop-types"
import {
    Card,
    CardContent,
    CardHeader,
    Grid, Table,
    TableBody,
    TableCell, TableHead,
    TableRow
} from "@material-ui/core";
import ShipmentCard from "../../../components/ShipmentCard/ShipmentCard";
import NewShipmentForm from "../../../components/NewShipmentForm/NewShipmentForm";
import TextDivider from "../../../components/TextDivider/TextDivider";

const reduceElements = elements => {
    const map = elements
        .reduce((prev, curr) => {
            const prevVal = prev.get(curr.product.id) || {
                quantity: 0,
                product: curr.product
            };
            prev.set(curr.product.id, {
                quantity: curr.quantity + prevVal.quantity,
                product: curr.product
            });
            return prev
        }, new Map());

    return [...map].map(([k, v]) =>({
        product: v.product,
        quantity: v.quantity
    }))
}

const getOrderedElements = merchOrders => {
    const elements = [...merchOrders]
        .filter(ord => ord.id)
        .map(ord => ord.orderElements)
        .flat()
        .map(el => ({
            quantity: el.quantity,
            product: el.product,
        }));

    return reduceElements(elements);
}

const getShippedElements = shipments => {
    const elements = [...shipments]
        .filter(shipment => shipment.id)
        .map(shipment => shipment.shipmentElements)
        .flat()
        .map(el => ({
            product: el.product,
            quantity: el.quantity,
        }));

    return reduceElements(elements);
}

const getNotShippedElements = (orderedElements, shippedElements) => {
    const newShippedElements = shippedElements.map(e => ({...e}));
    newShippedElements.forEach(shippedEl => shippedEl.quantity *= -1);

    return reduceElements([...orderedElements, ...newShippedElements]);
}


const ShipmentsTab = ({shipments, merchOrders, customerObjects, submitNewShipment}) => {
    const orderedElements = getOrderedElements(merchOrders);
    const shippedElements = getShippedElements(shipments);
    const notShippedElements = getNotShippedElements(orderedElements, shippedElements);

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Card variant="outlined">
                    <CardHeader title="Do wysłania"/>
                    <CardContent>
                        <Table size="small">
                            <TableHead>
                                <TableCell style={{fontWeight: "bold"}}>Kod</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>Nazwa</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>Ilość(szt.)</TableCell>
                            </TableHead>
                            <TableBody>
                                {notShippedElements.map(({product, quantity}) => (
                                    <TableRow key={product.id}>
                                        <TableCell>{product.code}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8}>


                <NewShipmentForm
                    notShippedElements={notShippedElements}
                    customerObjects={customerObjects}
                    submitNewShipment={submitNewShipment}
                />


                <TextDivider/>

                {shipments.map((shipment, index) => (
                    <ShipmentCard shipment={shipment} />
                ))}
            </Grid>
        </Grid>
    )
}

ShipmentsTab.propTypes = {
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
    })).isRequired,
    shipments: PropTypes.arrayOf(PropTypes.shape({
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
                basePrice: PropTypes.number.isRequired,
                width: PropTypes.number,
                height: PropTypes.number,
                depth: PropTypes.number,
                weight: PropTypes.number,
                descriptionEng: PropTypes.string,
                descriptionGer: PropTypes.string,
            })
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
        })
    })).isRequired,
    submitNewShipment: PropTypes.func,
}

export default ShipmentsTab;