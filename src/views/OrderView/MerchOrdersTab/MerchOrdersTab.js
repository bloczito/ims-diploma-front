import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import TextDivider from "../../../components/TextDivider/TextDivider";
import MerchOrderCard from "../../../components/MerchOrderCard/MerchOrderCard";
import NewMerchOrderForm from "../../../components/NewMerchOrderForm/NewMerchOrderForm";



const MerchOrdersTab = ({ merchOrders, handleChange, submitNewMerchOrder}) => (
    <>
        <Grid container>
            <NewMerchOrderForm submitNewMerchOrder={submitNewMerchOrder} />
        </Grid>

        <TextDivider />
        <Grid container>
            {merchOrders.map((merchOrder, index) => (
                <MerchOrderCard
                    onChange={handleChange}
                    merchOrder={merchOrder}
                    commentName={`merchOrders[${index}].comment`}
                />
            ))}
        </Grid>

    </>
)

MerchOrdersTab.propTypes = {
    merchOrders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        comment: PropTypes.string,
        merchOrderDate: PropTypes.string,
        orderElements: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            quantity: PropTypes.number,
            product: PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                code: PropTypes.number.isRequired,
                basePrice: PropTypes.number.isRequired,
                width: PropTypes.number,
                height: PropTypes.number,
                depth: PropTypes.number,
                weight: PropTypes.number,
                descriptionEng: PropTypes.string,
                descriptionGer: PropTypes.string,
            })
        }))
    })).isRequired,
    handleChange: PropTypes.func,
    submitNewMerchOrder: PropTypes.func.isRequired
}

MerchOrdersTab.defaultProps = {
    merchOrders:[],
}

export default MerchOrdersTab;