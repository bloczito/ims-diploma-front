import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Container, Grid } from "@material-ui/core";


const ProductDetailsView = () => {
    const {id: productId} = useParams();



    return (
        <Container>
            <Grid>

            </Grid>
        </Container>
    )
}



export default ProductDetailsView;