import React from "react";
import PropTypes from "prop-types";

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Typography } from "@material-ui/core";
import styles from "./DialogHeader.module.scss";


const DialogHeader = ({children, closeFn}) => (
    <MuiDialogTitle>
        <Typography variant="h6">{children}</Typography>
        {closeFn ? (
            <IconButton aria-label="close" className={styles.closeButton} onClick={closeFn}>
                <CloseIcon />
            </IconButton>
        ) : null}
    </MuiDialogTitle>
)



DialogHeader.propTypes = {
    children: PropTypes.string,
    closeFn: PropTypes.func,
}


export default DialogHeader;