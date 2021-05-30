import React, { useEffect, useState } from "react";
import { productService } from "../../_service";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import TablePagination from "../../components/TablePagination/TablePagination";
import OverlaySpinner from "../../components/OverlaySpinner/OverlaySpinner";

import NewProductModal from "../../components/NewProductModal/NewProductModal";
import { utils } from "../../_helpers";
import DefaultTable from "../../components/DefaultTable/DefaultTable";


const COLUMN_DEFS = [
    "Kod produktu",
    "Nazwa",
    "Wymiary",
    "Cena",
];

const mapProductsToRows = products =>
    products.map(product => ({
        id: product.id,
        cells: [
            product.code,
            product.name,
            `${product.width} x ${product.height} x ${product.depth} cm`,
            product.basePrice,
        ]
    }));

const ProductsView = () => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [totalElements, setTotalElements] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reloadValue, setReloadValue] = useState(0);

    const loadProductsData = async () => {
        await utils.withinGuard(setIsLoading, async () => {
            const response = await productService.getPaginated(page, rowsPerPage);

            console.log(response);

            setRowsPerPage(response.size);
            setTotalElements(response.totalElements);
            setTotalPages(response.totalPages);
            setProducts(response.content);
        })
    }

    useEffect(() => {
        loadProductsData();
    }, [page, rowsPerPage, reloadValue])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const reloadProducts = () => setReloadValue(prevState => prevState + 1);


    const handleNewProductSubmit = formData => {
        console.log(formData);

        productService.addNewProduct(formData).then(reloadProducts);
        setIsModalOpen(false)

    }

    const handleModalClose = () => setIsModalOpen(false);

    return (
        <>
            <OverlaySpinner isActive={isLoading}/>
            <Container>
                <Grid container alignContent="space-between" direction="row">
                    <Grid item md={4}>
                        <Button variant="contained"
                                color="primary"
                                onClick={() => setIsModalOpen(true)}
                                disableElevation>
                            Dodaj produkt
                        </Button>
                    </Grid>
                    <Grid item md={4}>
                        <Typography variant="h3" gutterBottom>
                            Produkty
                        </Typography>
                    </Grid>
                        <Grid item md={4}>
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
                      <DefaultTable
                          route="/products"
                          headerCells={COLUMN_DEFS}
                          rows={mapProductsToRows(products)}
                      />
                    </Grid>
                </Grid>

            </Container>


            <NewProductModal
                handleNewProductSubmit={handleNewProductSubmit}
                isOpen={isModalOpen}
                handleModalClose={handleModalClose}
            />
        </>
    )

}


export default ProductsView;