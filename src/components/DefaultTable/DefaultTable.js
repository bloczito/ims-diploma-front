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


const DefaultTableBody = ({rows, route, variant, onClick}) => (
    <TableBody>
        {rows.map(({id, cells}) => (
            <TableRow
                key={id}
                component={variant === "link" ? Link : "tr"}
                to={variant === "link" ? `${route}/${id}` : null}
                hover
                style={{
                    textDecoration: "none",
                    cursor: "pointer",
                }}
                onClick={onClick ? (() => onClick(id)) : null}
            >
                {cells.map((cell, idx) => (
                    <TableCell key={idx}>{cell}</TableCell>
                ))}
            </TableRow>
        ))}
    </TableBody>
);


DefaultTableBody.propTypes = {
    route: PropTypes.string,
    rows: PropTypes.exact({
        id: PropTypes.number,
        cells: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    }).isRequired,
    variant: PropTypes.oneOf(["clickable", "link"]),
    onClick: PropTypes.func,
}

const DefaultTable = ({headerCells, rows, route, variant, onClick}) => (
    <TableContainer component={Paper}>
        <Table>
            <DefaultTableHeader
                headerRow={headerCells}
            />
            <DefaultTableBody
                route={route}
                rows={rows}
                variant={variant}
                onClick={onClick}
            />
        </Table>
    </TableContainer>
);


DefaultTable.propTypes = {
    headerCells: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.number,
        cells: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    }).isRequired),
    route: PropTypes.string,
    variant: PropTypes.objectOf(["clickable", "link"]),
    onClick: PropTypes.func,
}

DefaultTable.defaultProps = {
    variant: "clickable",
}

export default DefaultTable;





