import React from "react";
import PropTypes from "prop-types";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import styles from "./DefaultTable.module.scss";
import { Link } from "react-router-dom";



const DefaultTableHeader = ({headerRow}) => (
    <TableHead>
        <TableRow>
            {headerRow.map(e =>
                <TableCell key={e}>
                    <Typography className={styles.header}>
                        {e}
                    </Typography>
                </TableCell>)}
        </TableRow>
    </TableHead>
)

DefaultTableHeader.propTypes = {
    headerRow: PropTypes.arrayOf(PropTypes.string).isRequired,
}


const DefaultTableBody = ({rows, route}) => (
    <TableBody>
        {rows.map(row => (
            <TableRow key={row.id} component={Link} to={`${route}/${row.id}`} hover style={{textDecoration: "none"}}>
                {
                    row.cells.map(cell => (
                        <TableCell key={cell}>{cell}</TableCell>
                    ))
                }
            </TableRow>
        ))
        }
    </TableBody>
);


DefaultTableBody.propTypes = {
    route: PropTypes.string,
    rows: PropTypes.exact({
        id: PropTypes.number,
        cells: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
}

const DefaultTable = ({headerCells, rows, route}) => (
    <TableContainer component={Paper} >
        <Table>
            <DefaultTableHeader headerRow={headerCells} />
            <DefaultTableBody route={route} rows={rows} />
        </Table>
    </TableContainer>
);


DefaultTable.propTypes = {
    headerCells: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.number,
        cells: PropTypes.arrayOf(PropTypes.string),
    }).isRequired),
    route: PropTypes.string,
}

export default DefaultTable;





