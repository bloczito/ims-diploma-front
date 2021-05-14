import React, { useState, useEffect } from "react";
import { orderService } from "../../_service";
import { Button, CircularProgress, Container, Grid, Typography } from "@material-ui/core";
import {utils} from "../../_helpers";
import OrdersTable  from "../../components/OrdersTable/OrdersTable";
import NewOrderModal from "../../components/NewOrderModal/NewOrderModal";
import TablePagination from "../../components/TablePagination/TablePagination";
import styles from "./OrdersView.module.scss"


const OrdersView = () => {

    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [totalElements, setTotalElements] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadData = async () => {
       // await utils.withinGuard(setIsLoading, async () => {
       //     const initialData = await orderService.getPaginated(page, rowsPerPage);
       //
       //     console.log(initialData)
       //
       //     setRowsPerPage(initialData.size)
       //     setTotalElements(initialData.totalElements)
       //     setTotalPages(initialData.totalPages)
       //     setOrders(initialData.content);
       // });

        const initialData = await orderService.getPaginated(page, rowsPerPage);

        console.log(initialData)

        setRowsPerPage(initialData.size)
        setTotalElements(initialData.totalElements)
        setTotalPages(initialData.totalPages)
        setOrders(initialData.content);
    }


    useEffect(() => {
        loadData()
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
        // orderService.addNewOrder(newOrder);
        setIsModalOpen(false);
    }


    return (
        <>
            {isLoading ? (
                <CircularProgress />
                ) : (
                    <Container className={styles.wrapper}>
                        <Grid container alignContent="space-between" direction="row">
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
                            <Grid item md={4} >
                                <Grid container justify="flex-end">
                                    <TablePagination
                                        totalElements={totalElements}
                                        rowsPerPage={rowsPerPage}
                                        pageNr={page}
                                        handleChangePage={handleChangePage}
                                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </Grid>
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
export default OrdersView;
