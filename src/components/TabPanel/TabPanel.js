import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";


const TabPanel = ({index, activeTab, children, ...props}) => (
    <div
        role="tabpanel"
        hidden={activeTab !== index}
        {...props}
    >
        {activeTab === index && (
            <Box pt={2}>
                <Typography>{children}</Typography>
            </Box>
        )}

    </div>
)

TabPanel.propTypes = {
    index: PropTypes.number.isRequired,
    activeTab: PropTypes.number,
}

export default TabPanel;