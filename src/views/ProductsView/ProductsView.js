import React, { useEffect, useState } from "react";
import { productService } from "../../_service";
import { Button, CircularProgress, Container, Grid, Typography } from "@material-ui/core";
import TablePagination from "../../components/TablePagination/TablePagination";
import ProductsTable from "../../components/ProductsTable/ProductsTable";
import OverlaySpinner from "../../components/OverlaySpinner/OverlaySpinner";

import styles from "./ProductsView.module.scss";
import NewProductModal from "../../components/NewProductModal/NewProductModal";
import { utils } from "../../_helpers";


const ProductsView = () => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [totalElements, setTotalElements] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshProducts, setRefreshProducts] = useState(false);

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
    }, [page, rowsPerPage, refreshProducts])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const reloadProducts = () => setRefreshProducts(prevState => setRefreshProducts(!prevState));


    const handleNewProductSubmit = formData => {
        console.log(formData);

        productService.addNewProduct(formData).then(reloadProducts);
        setIsModalOpen(false)

    }

    const handleModalClos = () => setIsModalOpen(false);

    return (
        <>
            {isLoading
                ? <CircularProgress />
                : (
                    <Container className={styles.wrapper}>
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
                                <ProductsTable
                                    products={products}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    totalElements={totalElements}
                                />
                            </Grid>
                        </Grid>

                    </Container>
                )
            }
            <NewProductModal
                handleNewProductSubmit={handleNewProductSubmit}
                isOpen={isModalOpen}
                handleModalClose={handleModalClos}
            />
            <OverlaySpinner isActive={true}/>
        </>
    )

}


export default ProductsView;