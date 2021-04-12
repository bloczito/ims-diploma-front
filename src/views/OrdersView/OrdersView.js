import React, { useState, useEffect } from "react";
import { orderService } from "../../_service";
import {
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableFooter,
    TablePagination,
    Paper, IconButton, TableHead, CircularProgress
} from "@material-ui/core";
import styles from "./OrdersView.module.scss";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


export const OrdersView = () => {

    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        const initOrders = await orderService.getAll();

        console.log(initOrders);

        setOrders(initOrders);
        setTimeout(() => setIsLoading(false), 2000);

    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <>
            {isLoading ? (
                <CircularProgress />
                ) : (
                    <TableContainer component={Paper}>
                        <Table className={styles.table} aria-label="orders table">
                            {getTableHeader()}
                            {getTableBody(rowsPerPage, page, orders)}
                            {getTableFooter(rowsPerPage, page, handleChangePage, handleChangeRowsPerPage)}
                        </Table>
                    </TableContainer>
                )
            }
        </>
    )

}

const handleClick = (event) => {
    console.log(event)
}

const columnDefs = [
    "Numer umowy",
    "Data umowy",
    "Termin",
    "Klient",
    "Priorytet",
    "Status",
    "Firma",
];

function getTableHeader() {
    return (
        <TableHead>
            <TableRow>
                {columnDefs.map(e => <TableCell key={e}>{e}</TableCell>)}
            </TableRow>
        </TableHead>
    )
}

function getTableBody(rowsPerPage, page, orders) {

    return (orders > 0
        ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : orders).map(order => (
            <TableRow key={order.id}
                      onClick={handleClick}
                      hover
            >
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.deadline}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{order.priority}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.company.name}</TableCell>
            </TableRow>
    ));
}

function TablePaginationActions(props) {
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={styles.pagination}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                 <FirstPageIcon />
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                 <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPageIcon />
            </IconButton>
        </div>
    );
}

function getTableFooter(rowsPerPage, page, handleChangePage, handleChangeRowsPerPage) {
    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20, {label: "All", value: -1}]}

                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: { "aria-label": "rows per page" },
                        native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </TableRow>
        </TableFooter>
    );
}


function mapStateToProps(state) {
    const { loading, orders } = state.orders;

    return {
        loading,
        orders
    }
}


// export default connect(mapStateToProps)(OrdersView);

