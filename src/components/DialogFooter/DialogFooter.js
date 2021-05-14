import React from "react";
import PropTypes from "prop-types";
import { Button, DialogActions } from "@material-ui/core";


const DialogFooter = ({submitFn, cancelFn, submitText}) => (
    <DialogActions>
        <Button variant="contained" color="primary" onClick={submitFn} type="submit">
            {submitText ? submitText : "Dodaj"}
        </Button>
        <Button variant="outlined" color="primary" onClick={cancelFn}>
            Anuluj
        </Button>
    </DialogActions>
)


DialogFooter.propTypes = {
    submitFn: PropTypes.func.isRequired,
    cancelFn: PropTypes.func.isRequired,
    submitText: PropTypes.string,
}

export default DialogFooter;