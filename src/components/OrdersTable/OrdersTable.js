import React from "react";
import PropTypes, { number } from "prop-types";
import {
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow, Typography
} from "@material-ui/core";
import styles from "./OrdersTable.module.scss";


import TablePagination from "../TablePagination/TablePagination"


const columnDefs = [
    "Numer umowy",
    "Data umowy",
    "Termin",
    "Klient",
    "Priorytet",
    "Status",
    "Firma",
];

const getTableHeader = () => (
        <TableHead>
            <TableRow>
                {columnDefs.map(e =>
                    <TableCell key={e}>
                        <Typography className={styles.header}>
                            {e}
                        </Typography>
                    </TableCell>)}
            </TableRow>
        </TableHead>
    )


const getTableBody = (orders, page, rowsPerPage) => (
    orders > 0
        ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : orders
    ).map(order => (
        <TableRow key={order.id} hover>
            <TableCell>{order.orderNumber}</TableCell>
            <TableCell>{order.orderDate}</TableCell>
            <TableCell>{order.deadline}</TableCell>
            <TableCell>{order.customer.name}</TableCell>
            <TableCell>{order.priority}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>{order.company.name}</TableCell>
        </TableRow>
    ));


const getTableFooter = (rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, totalElements) => (
        <TableFooter>
            <TableRow>
                <TablePagination
                    totalElements={totalElements}
                    rowsPerPage={rowsPerPage}
                    pageNr={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableRow>
        </TableFooter>
    );


const OrdersTable = ({orders, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, totalElements}) => {
    return (
        <>
            <TableContainer component={Paper} className={styles.wrapper}>
                <Table  aria-label="orders table" stickyHeader>
                    {getTableHeader()}
                    {getTableBody(orders, page, rowsPerPage)}
                    {getTableFooter(rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, totalElements)}
                </Table>
            </TableContainer>
        </>
    )
}

OrdersTable.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        orderNumber: PropTypes.string,
        orderDate: PropTypes.string,
        deadline: PropTypes.string,
        customer: PropTypes.shape({name: PropTypes.string}),
        priority: PropTypes.string,
        status: PropTypes.string,
        company: PropTypes.shape({name: PropTypes.string})
    })),
    page: number.isRequired,
    rowsPerPage: number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    totalElements: PropTypes.number.isRequired
}

OrdersTable.defaultProps ={
    orders: [],
}




export default OrdersTable;