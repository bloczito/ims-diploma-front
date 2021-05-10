import React from "react";
import PropTypes, { number } from "prop-types";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";

import styles from "./CustomersTable.module.scss"

const columnDefs = [
    "Nazwa",
    "Nip",
    "Telefon",
    "Email",
];


const CustomersTableBody = ({customers, page, rowsPerPage}) => (
    <TableBody>
        {
            (customers > 0
                ? customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : customers
            ).map(customer => (
                <TableRow key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.nip}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                </TableRow>
            ))
        }
    </TableBody>
);

CustomersTableBody.propTypes = {
    customers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string,
        nip: PropTypes.string,
    })),
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
}

const CustomersTable = ({customers, page, rowsPerPage}) => (
    <TableContainer component={Paper}>
        <Table stickyHeader>
            <TableHead>
                <TableRow>
                    {columnDefs.map(e =>
                        <TableCell key={e}>
                            <Typography className={styles.header}>
                                {e}
                            </Typography>
                        </TableCell>
                    )}
                </TableRow>
            </TableHead>
            <CustomersTableBody customers={customers} page={page} rowsPerPage={rowsPerPage} />
        </Table>
    </TableContainer>
);

CustomersTable.propTypes = {
    customers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string,
        nip: PropTypes.string,
    })),
    page: number.isRequired,
    rowsPerPage: number.isRequired,
}

CustomersTable.defaultProps = {
    customers: [],
}

export default CustomersTable;