import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

import styles from "./TextDivider.module.scss"


const TextDivider = ({label}) => (
    <div className={styles.container}>
        {/* <div className="border" /> */}
        {/*<span className="content">*/}

        {label && (
            <Typography className={styles.content}>
                {label}
            </Typography>
        )}

        <div className={styles.border} />
    </div>
)


TextDivider.propTypes = {
    label: PropTypes.string,
}

export default TextDivider;