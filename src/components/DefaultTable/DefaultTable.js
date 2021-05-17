import React from "react";
import PropTypes from "prop-types";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import styles from "./DefaultTable.module.scss";



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


const DefaultTableBody = ({rows}) => (
    <TableBody>
        {rows.map(row => (
            <TableRow>
                {
                    row.map(cell => (
                        <TableCell key={cell}>{cell}</TableCell>
                    ))
                }
            </TableRow>
        ))
        }
    </TableBody>
);


DefaultTableBody.propTypes = {
    rows: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const DefaultTable = ({headerCells, rows}) => (
    <TableContainer component={Paper} >
        <Table>
            <DefaultTableHeader headerRow={headerCells} />
            <DefaultTableBody rows={rows} />
        </Table>
    </TableContainer>
);


DefaultTable.propTypes = {
    headerCells: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default DefaultTable;





