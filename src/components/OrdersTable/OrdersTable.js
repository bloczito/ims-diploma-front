import React from "react";
import {
    IconButton,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead, TablePagination,
    TableRow
} from "@material-ui/core";
import styles from "./OrdersTable.module.scss";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";



const columnDefs = [
    "Numer umowy",
    "Data umowy",
    "Termin",
    "Klient",
    "Priorytet",
    "Status",
    "Firma",
];

const getTableHeader = () => {
    return (
        <TableHead>
            <TableRow>
                {columnDefs.map(e => <TableCell key={e}>{e}</TableCell>)}
            </TableRow>
        </TableHead>
    )
}

const getTableBody = (orders, page, rowsPerPage) => {
    return (orders > 0
        ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : orders).map(order => (
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
}

const TablePaginationActions = ({ count, page, rowsPerPage, onChangePage }) => {

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

const OrdersTable = ({orders, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}) => {

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={styles.table} aria-label="orders table">
                    {getTableHeader()}
                    {getTableBody(rowsPerPage, page, orders)}
                    {getTableFooter(rowsPerPage, page, handleChangePage, handleChangeRowsPerPage)}
                </Table>
            </TableContainer>
        </>
    )


}




export default OrdersTable;