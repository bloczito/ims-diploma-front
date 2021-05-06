import React from "react";
import PropTypes from "prop-types";

import MaterialTablePagination from "@material-ui/core/TablePagination"
import TablePaginationActions from "./TablePaginationActions/TablePaginationActions";



const TablePagination = ({totalElements, rowsPerPage, pageNr, handleChangePage, handleChangeRowsPerPage}) => (
    <MaterialTablePagination
        rowsPerPageOptions={[5, 10, 15, 20,]}
        count={totalElements}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Ilość na stronie"
        labelDisplayedRows={({from, to, count}) => `${from} - ${to} z ${count}`}
        page={pageNr}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={ TablePaginationActions }
    />
);


TablePagination.propTypes = {
    totalElements: PropTypes.number,
    rowsPerPage: PropTypes.number,
    pageNr: PropTypes.number,
    handleChangePage: PropTypes.func,
    handleChangeRowsPerPage: PropTypes.func,
}



export default TablePagination;


