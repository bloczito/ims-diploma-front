import React from "react";
import PropTypes from "prop-types";
import ProductPriceCard from "../../../components/ProductPriceCard/ProductPriceCard";
import { Grid } from "@material-ui/core";

const PricesTab = ({productPrices, onChange}) => {

    return (
        <Grid container spacing={2}>
            {productPrices.map((price, index) => (
                <ProductPriceCard
                    productPrice={price}
                    onChange={onChange}
                    priceFieldName={`productPrices[${index}].price`}
                />
            ))}
        </Grid>
    );
}

PricesTab.propTypes = {
    productPrices: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        price: PropTypes.number,
        product: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            code: PropTypes.number,
            height: PropTypes.number,
            width: PropTypes.number,
            depth: PropTypes.number,
            weight: PropTypes.number,
        })
    })).isRequired,
    onChange: PropTypes.func.isRequired,
}

PricesTab.defaultProps = {
    productPrices: [],
}

export default PricesTab;