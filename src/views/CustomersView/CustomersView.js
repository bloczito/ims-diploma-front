import React, { useEffect, useState } from "react";

import { customerService } from "../../_service";
import { utils } from "../../_helpers";

import styles from "./CustomersView.module.scss";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import TablePagination from "../../components/TablePagination/TablePagination";
import CustomersTable from "../../components/CustomersTable/CustomersTable";
import NewCustomerModal from "../../components/NewCustomerModal/NewCustomerModal";

const CustomersView = () => {

    const [customers, setCustomers] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [totalElements, setTotalElements] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reloadValue, setReloadValue] = useState(0);

    const loadProductsData = async () => {
        await utils.withinGuard(setIsLoading, async () => {
            const response = await customerService.getPaginated(page, rowsPerPage);

            console.log(response);

            setRowsPerPage(response.size);
            setTotalElements(response.totalElements);
            setTotalPages(response.totalPages);
            setCustomers(response.content);
        })
    }

    useEffect(async () => {
        loadProductsData();
    }, [page, rowsPerPage, reloadValue])

    const reloadCustomers = () => setReloadValue(prevVal => prevVal + 1);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleModalClose = () => setIsModalOpen(false);

    const handleNewCustomerSubmit = async (formData) => {
        console.log(formData);

        const asd = await customerService.addNew(formData);

        console.log(asd);
        reloadCustomers();
        setIsModalOpen(false);
    }


    return (
        <>
            <Container>
                <Grid container alignContent="space-between" direction="row">
                    <Grid item md={4}>
                        <Button variant="contained"
                                color="primary"
                                onClick={() => setIsModalOpen(true)}
                                disableElevation>
                            Dodaj klienta
                        </Button>
                    </Grid>
                    <Grid item md={4}>
                        <Typography variant="h3" gutterBottom>
                            Klienci
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
                    <CustomersTable
                        rowsPerPage={rowsPerPage}
                        page={page}
                        customers={customers} />
                </Grid>
            </Container>

            <NewCustomerModal
                handleModalClose={handleModalClose}
                isOpen={isModalOpen}
                handleNewCustomerSubmit={handleNewCustomerSubmit} />
        </>
    )
}


export default CustomersView;