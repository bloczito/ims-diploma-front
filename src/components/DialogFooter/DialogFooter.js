import React from "react";
import PropTypes from "prop-types";
import { Button, DialogActions, Grid } from "@material-ui/core";


const DialogFooter = ({submitFn, cancelFn, submitText, deleteFn}) => (
    <DialogActions>
        <Grid container justify="space-between">
            <Grid item>
                {deleteFn &&
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={deleteFn}
                    >
                        Usuń
                    </Button>
                }
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={submitFn}
                    type="submit"
                    disableElevation
                    style={{marginRight: 5}}
                >
                    {submitText ? submitText : "Dodaj"}
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={cancelFn}
                >
                    Anuluj
                </Button>
            </Grid>
        </Grid>
    </DialogActions>
)


DialogFooter.propTypes = {
    submitFn: PropTypes.func,
    cancelFn: PropTypes.func.isRequired,
    submitText: PropTypes.string,
    deleteFn: PropTypes.func,
}

export default DialogFooter;
