import React from "react";
import PropTypes from "prop-types";
import ProductDefCard from "../../../components/ProductDefCard/ProductDefCard";
import { Grid } from "@material-ui/core";

const ProductDefsTab = ({productDefs, onChange}) => {

    return (
        <Grid container spacing={2}>
            {productDefs.map((def, index) => (
                <ProductDefCard
                    productPrice={def}
                    onChange={onChange}
                    priceFieldName={`productPrices[${index}].price`}
                />
            ))}
        </Grid>
    );
}

ProductDefsTab.propTypes = {
    productDefs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        price: PropTypes.number,
        code: PropTypes.number,
        name: PropTypes.string,
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

ProductDefsTab.defaultProps = {
    productPrices: [],
}

export default ProductDefsTab;
