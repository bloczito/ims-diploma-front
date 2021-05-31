import React, { useEffect, useState } from "react";
import { productService } from "../../_service";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import TablePagination from "../../components/TablePagination/TablePagination";
import OverlaySpinner from "../../components/OverlaySpinner/OverlaySpinner";

import ProductModal from "../../components/NewProductModal/ProductModal";
import { utils } from "../../_helpers";
import DefaultTable from "../../components/DefaultTable/DefaultTable";
import { notificationActions } from "../../_actions";
import { connect } from "react-redux";


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

const ProductsView = ({showSuccess, showFailure}) => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [totalElements, setTotalElements] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reloadValue, setReloadValue] = useState(0);
    const [selectedProductId, setSelectedProductId] = useState(null);

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


    const handleNewProductSubmit = async formData => {

        const response = await productService.addNewProduct(formData);
        if (response !== undefined) {
            if (response.success) {
                showSuccess(selectedProductId ? "Zaktualizowano produkt" : "Dodano nowy produkt");
                reloadProducts()
            } else {
                showFailure(selectedProductId ? "Nie udało się zaktualizować produktu" : "Nie udało się dodać produktu");
            }
        }
        setIsModalOpen(false)
    }

    const handleOpenModal = id => {
        if (id) {
            setSelectedProductId(id);
        }
        setIsModalOpen(true);
    }

    const handleModalClose = () => {
        setSelectedProductId(null);
        setIsModalOpen(false);
    }

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
                          headerCells={COLUMN_DEFS}
                          rows={mapProductsToRows(products)}
                          variant="clickable"
                          onClick={handleOpenModal}
                      />
                      {/*<ProductsTable products={products} onClick={handleOpenModal}/>*/}
                    </Grid>
                </Grid>

            </Container>


            <ProductModal
                submitFn={handleNewProductSubmit}
                isOpen={isModalOpen}
                closeFn={handleModalClose}
                id={selectedProductId}
            />
        </>
    )

}

const mapDispatchToProps = dispatch => ({
    showSuccess: (message) => dispatch(notificationActions.showSuccess(message)),
    showFailure: (message) => dispatch(notificationActions.showFailure(message)),
})

export default connect(
    null,
    mapDispatchToProps
)(ProductsView);