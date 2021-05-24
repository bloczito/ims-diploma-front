import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { orderService } from "../../_service";
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
import { useFormik} from "formik";
import moment from "moment";

import TabPanel from "../../components/TabPanel/TabPanel";
import InfoTab from "./InfoTab/InfoTab";
import MerchOrdersTab from "./MerchOrdersTab/MerchOrdersTab";



const OrderDetailsView = () => {

    const {id: orderId} = useParams();
    const [order, setOrder] = useState({});
    const [activeTab, setActiveTab] = useState(0);
    const [statuses, setStatuses] = useState([]);
    const [priorities, setPriorities] = useState([]);

    const formik = useFormik({
        initialValues: {...order, newProduct: null, newQuantity: null},
        onSubmit: values => {
            console.log("FORMIK: ", values)
            console.log("ORDER: ", order)
            saveOrder(values)
        },
        enableReinitialize: true,
    });

    console.log(formik.values);


    const loadOrder = async () => {
        const response = await orderService.getById(orderId);

        setOrder(response.resource.order);
        setStatuses(response.resource.statuses);
        setPriorities(response.resource.priorities);
    }


    useEffect(() => {
        console.log(orderId);
        loadOrder();

    }, []);


    const submitNewMerchOrder = merchOrder => {
        merchOrder.merchOrderDate = moment().toISOString();
        console.log("SUBMITING", merchOrder)

        formik.setFieldValue('merchOrders', [...formik.values.merchOrders, merchOrder])

    }

    function saveOrder(order) {
        console.log("RESPONSE", order);
        orderService.updateOrder(order)
            .then(loadOrder);
    }


    return (
        <Container>
            <Card elevation={0}>

                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <CardHeader
                        title={`Edycja zamówienia - ${order.orderNumber} ${order.customer ? order.customer.name : null}`}
                        action={
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        startIcon={<SaveIcon/>}
                                        disableElevation
                                        type="submit"
                                    >

                                        Zapisz
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        color="secondary"
                                        variant="outlined"
                                        startIcon={<DeleteIcon/>}
                                        disableElevation
                                    >
                                        Usuń
                                    </Button>
                                </Grid>
                            </Grid>
                        }

                    />
                    <Divider />
                    <CardContent style={{paddingTop: 0}}>

                        <AppBar position="relative" color="inherit" elevation={0} component={Paper} style={{boxShadow: "none"}} >
                            <Tabs value={activeTab} onChange={((event, value) => setActiveTab(value))} >
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
                                formik={formik}
                                priorities={priorities}
                                statuses={statuses}
                            />
                        </TabPanel>

                        <TabPanel activeTab={activeTab} index={1}>
                            <MerchOrdersTab
                                order={order}
                                formik={formik}
                                submitNewMerchOrder={submitNewMerchOrder}
                            />
                        </TabPanel>


                    </CardContent>
                </form>
            </Card>

        </Container>
    )
}



export default OrderDetailsView;




