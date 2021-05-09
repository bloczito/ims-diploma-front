import React from "react";
import PropTypes from "prop-types";
import { Backdrop, CircularProgress } from "@material-ui/core";



const OverlaySpinner = ({isActive}) => (
    <Backdrop open={isActive} style={{zIndex: 100}}>
        <CircularProgress color="primary" />
    </Backdrop>
);


OverlaySpinner.propTypes = {
    isActive: PropTypes.bool.isRequired,
}

export default OverlaySpinner;