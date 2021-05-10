import React from "react";
import PropTypes, { number } from "prop-types";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import styles from "../ProductsTable/ProductsTable.module.scss";

const columnDefs = [
    "Kod produktu",
    "Nazwa",
    "Wymiary",
    "Cena",
];

const ProductsTableBody = ({products, page, rowsPerPage}) => (
    <TableBody>
        {
            (products > 0
                ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : products
            ).map(product => (
            <TableRow key={product.id} hover>
                <TableCell>{product.code}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{`${product.width} x ${product.height} x ${product.depth} cm`}</TableCell>
                <TableCell>{product.basePrice}</TableCell>
            </TableRow>
            ))
        }
    </TableBody>
)

ProductsTableBody.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        code: PropTypes.number,
        name: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
        depth: PropTypes.number,
        basePrice: PropTypes.number,
    })),
    page: number.isRequired,
    rowsPerPage: number.isRequired,
}


const ProductsTable = ({products, page, rowsPerPage}) => (
    <TableContainer component={Paper}>
        <Table stickyHeader>
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
            <ProductsTableBody products={products} page={page} rowsPerPage={rowsPerPage}/>

        </Table>
    </TableContainer>
);


ProductsTable.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        code: PropTypes.number,
        name: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
        depth: PropTypes.number,
        basePrice: PropTypes.number,
    })),
    page: number.isRequired,
    rowsPerPage: number.isRequired,
}

ProductsTable.defaultProps = {
    products: []
}


export default ProductsTable;



