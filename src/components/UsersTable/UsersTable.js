import React from "react";
import PropTypes from "prop-types";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";

import styles from "./UsersTable.module.scss";


const columnDefs = [
    "Nazwa użytkownika",
    "Imię",
    "Nazwisko",
    "Skrót",
    "Email",
    "Telefon",
    "Stanowisko",
    "Uprawnienia",
]

const UsersTableBody = ({users}) => (
    <TableBody>
        {users.map(user => (
            <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.shortcut}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.job}</TableCell>
                <TableCell>
                    {user
                        .roles
                        .map(role => role.name)
                        .join(", ")
                    }
                </TableCell>
            </TableRow>
        ))}
    </TableBody>
);

UsersTableBody.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        shortcut: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        job: PropTypes.string,
        roles: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        })),
    })).isRequired,
}


const UsersTable = ({users}) => (
    <TableContainer component={Paper}>
        <Table>
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
            <UsersTableBody users={users}/>
        </Table>
    </TableContainer>
);


UsersTable.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        shortcut: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        job: PropTypes.string,
        roles: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        })),
    })).isRequired,
}


export default UsersTable;
