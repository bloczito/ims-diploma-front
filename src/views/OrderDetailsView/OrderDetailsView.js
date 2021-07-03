import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router";
import { connect } from "react-redux";
import {
    AppBar, Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    Paper,
    Tab,
    Tabs,
} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { useFormik } from "formik";
import moment from "moment";

import { merchOrderService, orderService, shipmentService } from "../../_service";
import { notificationActions } from "../../_actions";
import TabPanel from "../../components/TabPanel/TabPanel";
import InfoTab from "./InfoTab/InfoTab";
import MerchOrdersTab from "./MerchOrdersTab/MerchOrdersTab";
import ShipmentsTab from "./ShipmentTab/ShipmentsTab";
import PricesTab from "./PricesTab/PricesTab";
import { orderPriority, orderStatus, userRoles } from "../../_constants";


const OrderDetailsView = ({showSuccess, showFailure, roles}) => {
    const {id: orderId} = useParams();
    const [isEdited, setIsEdited] = useState(false);
    const [order, setOrder] = useState({});
    const [activeTab, setActiveTab] = useState(0);
    const [statuses, setStatuses] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            ...order,
            newProduct: null,
            newQuantity: null,
            // priority: orderPriority.LOW,
            // status: orderStatus.NEW,
        },
        onSubmit: values => {
            console.log("FORMIK: ", values)
            console.log("ORDER: ", order)
            saveOrder(values)
        },
        enableReinitialize: true,
    });

    const {values} = formik;

    useEffect(() => {
        loadOrder();
    }, []);

    const handleFormChange = evt => {
        setIsEdited(true);
        formik.handleChange(evt);
    }

    const loadOrder = () => {
        orderService.getById(orderId)
            .then(response => {
                if (response.success) {
                    setOrder(response.resource.order);
                    setStatuses(response.resource.statuses);
                    setPriorities(response.resource.priorities);
                } else {
                    showFailure(response.error);
                }
            })


    }

    const deleteOrder = () => {
        orderService.deleteOrder(orderId)
            .then(res => {
                if (res.success) {
                    history.push("/orders");
                    showSuccess("Usunięto umowę");
                } else {
                    showFailure("Nie udało się usunąć. Błąd: " + res.error);
                }
            })
    }

    const deleteMerchOrder = idx => {
        const merchOrders = [...formik.values.merchOrders];
        const {id: merchOrderId} = merchOrders[idx];

        if (merchOrderId) {
            merchOrderService.deleteMerchOrder(merchOrderId)
                .then(res => {
                    if (res.success) {
                        showSuccess("Usunięto")
                        loadOrder();
                    } else {
                        showFailure("Nie udało się usunąć. Błąd: " + res.error)
                    }
                });
        } else {
            formik.setFieldValue("merchOrders", merchOrders.filter((ord, i) => i !== idx));
            showSuccess("Usunięto");
        }
    }

    const deleteShipment = idx => {
        const shipments = [...formik.values.shipments];
        const {id: shipmentId} = shipments[idx];

        if (shipmentId) {
            shipmentService.deleteShipment(shipmentId)
                .then(res => {
                    if (res.success) {
                        showSuccess("Usunięto")
                        loadOrder();
                    } else {
                        showFailure("Nie udało się usunąć. Błąd: " + res.error)
                    }
                });
        } else {
            formik.setFieldValue("shipments", shipments.filter((s, i) => i !== idx));
            showSuccess("Usunięto");
        }
    }

    const submitNewMerchOrder = merchOrder => {
        merchOrder.merchOrderDate = moment().toISOString();
        formik.setFieldValue('merchOrders', [...formik.values.merchOrders, merchOrder]);
        setIsEdited(true);
    }

    const submitNewShipment = shipment => {
        formik.setFieldValue("shipments", [...formik.values.shipments, shipment]);
        setIsEdited(true);
    }

    function saveOrder(order) {
        orderService.updateOrder(order)
            .then(res => {
                if (res.success) {
                    showSuccess("Pomyślnie zapisano zamówienie");
                    setIsEdited(false);
                    loadOrder();
                } else {
                    showFailure("NIe udało się zapisać. Bład: " + res.error);
                }
            });
    }


    return (
        <Container>
            <Card elevation={0}>

                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <CardHeader
                        title={`Edycja umowy - ${values.orderNumber} ${values.customer?.name}`}
                        action={
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        startIcon={<SaveIcon/>}
                                        disableElevation
                                        type="submit"
                                        disabled={!isEdited}
                                    >

                                        Zapisz
                                    </Button>
                                </Grid>
                                {roles.includes(userRoles.ROLE_TRADER_SUPERVISOR) && (
                                    <Grid item>
                                        <Button
                                            color="secondary"
                                            variant="outlined"
                                            startIcon={<DeleteIcon/>}
                                            disableElevation
                                            onClick={deleteOrder}
                                        >
                                            Usuń
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        }

                    />
                    <Divider/>
                    <CardContent style={{paddingTop: 0}}>

                        <AppBar position="relative" color="inherit" elevation={0} component={Paper}
                                style={{boxShadow: "none"}}>
                            <Tabs value={activeTab} onChange={((event, value) => setActiveTab(value))}>
                                <Tab
                                    label="Informacje ogólne"
                                    tabIndex={0}
                                />
                                <Tab
                                    label="Zamówienia"
                                    tabIndex={1}
                                />
                                <Tab
                                    label="Wysyłki"
                                    tabIndex={2}
                                />
                                <Tab
                                    label="Ceny"
                                    tabIndex={3}
                                />
                            </Tabs>
                        </AppBar>

                        <TabPanel activeTab={activeTab} index={0}>
                            <InfoTab
                                values={values}
                                defaultValues={order}
                                handleChange={handleFormChange}
                                priorities={priorities}
                                statuses={statuses}
                            />
                        </TabPanel>

                        <TabPanel activeTab={activeTab} index={1}>
                            <MerchOrdersTab
                                merchOrders={values.merchOrders}
                                handleChange={handleFormChange}
                                submitNewMerchOrder={submitNewMerchOrder}
                                isEdited={isEdited}
                                deleteMerchOrder={deleteMerchOrder}
                            />
                        </TabPanel>

                        <TabPanel activeTab={activeTab} index={2} >
                            <ShipmentsTab
                                handleChange={handleFormChange}
                                merchOrders={values.merchOrders}
                                shipments={values.shipments}
                                customerObjects={values.customer?.customerObjects || []}
                                submitNewShipment={submitNewShipment}
                                isEdited={isEdited}
                                deleteShipment={deleteShipment}
                            />
                        </TabPanel>

                        <TabPanel activeTab={activeTab} index={3}>
                            <PricesTab
                                productPrices={values.productPrices}
                                onChange={handleFormChange}
                            />
                        </TabPanel>

                    </CardContent>
                </form>
            </Card>

        </Container>
    )
}


const mapStateToProps = state => {
    const {roles} = state.authentication;
    return {
        roles
    }
}

const mapDispatchToProps = dispatch => ({
    showSuccess: message => dispatch(notificationActions.showSuccess(message)),
    showFailure: message => dispatch(notificationActions.showFailure(message)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderDetailsView);




