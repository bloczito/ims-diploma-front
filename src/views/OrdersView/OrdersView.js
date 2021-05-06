import React, { useState, useEffect } from "react";
import { orderService } from "../../_service";
import { Button, CircularProgress, Container, Grid, Typography } from "@material-ui/core";
import OrdersTable from "../../components/OrdersTable/OrdersTable";
import NewOrderModal from "../../components/NewOrderModal/NewOrderModal";
import styles from "./OrdersView.module.scss"


export const OrdersView = () => {

    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [totalElements, setTotalElements] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(async () => {
        const initialData = await orderService.getPaginated(page, rowsPerPage);

        console.log("DUDUDU", initialData);

        setRowsPerPage(initialData.size)
        setTotalElements(initialData.totalElements)
        setTotalPages(initialData.totalPages)
        setOrders(initialData.content);
        setIsLoading(false);

    }, [page, rowsPerPage])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenModal = () => setIsModalOpen(true);

    const handleNewOrderSubmit = formData => {
        console.log(formData);
        const newOrder = {
            ...formData,
            company: {id: 6},
            customer: {id: 7},
        }
        orderService.addNewOrder(newOrder);
        setIsModalOpen(false);
    }


    return (
        <>
            {isLoading ? (
                <CircularProgress />
                ) : (
                    <Container className={styles.wrapper}>
                        <Grid container alignContent="center" direction="row">
                            <Grid item md={4}>
                                <Button variant="contained"
                                        color="primary"
                                        onClick={handleOpenModal}
                                        disableElevation>
                                    Dodaj zamówienie
                                </Button>
                            </Grid>
                            <Grid item md={4}>
                                <Typography variant="h3" gutterBottom>
                                    Zamówienia
                                </Typography>
                            </Grid>
                        </Grid>


                        <Grid container>
                            <Grid item md>
                                <OrdersTable
                                    orders={orders}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    totalElements={totalElements}
                                />
                            </Grid>
                        </Grid>
                    </Container>
                )
            }

            <NewOrderModal
                open={isModalOpen}
                closeFn={() => setIsModalOpen(false)}
                handleNewOrderSubmit={handleNewOrderSubmit}
            />
        </>
    )
}





function mapStateToProps(state) {
    const { loading, orders } = state.orders;

    return {
        loading,
        orders
    }
}


// export default connect(mapStateToProps)(OrdersView);

