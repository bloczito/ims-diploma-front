import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";
import NewPlannedShipmentForm from "../../../components/NewPlannedShipmentForm/NewPlannedShipmentForm";
import PropTypes from "prop-types";
import TextDivider from "../../../components/TextDivider/TextDivider";
import PlannedShipmentCard from "../../../components/PlannedShipmentCard/PlannedShipmentCard";


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

const getPlannedElements = shipments => {
    const elements = [...shipments]
        .filter(shipment => shipment?.id)
        .map(shipment => shipment.plannedShipmentElements)
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

const PlannedShipmentTab = ({merchOrders, plannedShipments, isEdited}) => {
    const orderedElements = getOrderedElements(merchOrders);
    const plannedElements = getPlannedElements(plannedShipments);
    const notPlannedElements = getNotShippedElements(orderedElements, plannedElements);

    console.log("ORDERED: ", orderedElements, "PLANNED: ", plannedElements, "NOT PLANNED: ", notPlannedElements)

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Card variant="outlined">
                    <CardHeader title="Nie zaplanowane" />
                    <CardContent>
                        <Table size="small">
                            <TableHead>
                                <TableCell style={{fontWeight: "bold"}}>Kod</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>Nazwa</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>Ilość(szt.)</TableCell>
                            </TableHead>
                            <TableBody>
                                {notPlannedElements.filter(({quantity}) => quantity > 0).map(({product, quantity}) => (
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
                <NewPlannedShipmentForm notShippedElements={notPlannedElements}/>

                <TextDivider />

                {plannedShipments.map((shipment, index) =>(
                    <PlannedShipmentCard
                        key={index}
                        plannedShipment={shipment}
                        isEdited={isEdited}
                        deletePlannedShipment={null}
                    />
                ))}
            </Grid>
        </Grid>
    )
}

PlannedShipmentTab.propTypes = {
    isEdited: PropTypes.bool.isRequired,
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
    plannedShipments: PropTypes.arrayOf(PropTypes.shape({
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
    }))
}

PlannedShipmentTab.defaultProps = {
    merchOrders: [],
    shipments: [],
}

export default PlannedShipmentTab;
