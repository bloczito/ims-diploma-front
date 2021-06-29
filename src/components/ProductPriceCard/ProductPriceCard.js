import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, Grid, InputAdornment, TextField, Typography } from "@material-ui/core";

import EuroIcon from '@material-ui/icons/Euro';

const getDimensions = product =>
    `${product.width} x ${product.height} x ${product.depth}`


const ProductPriceCard = ({productPrice, onChange, priceFieldName}) => {

    return (
       <Grid item md={4} sm={6} xs={12}>
           <Card variant="outlined">
               <CardContent>
                   <Grid container justify="space-between">
                       <Grid item xs={8}>
                           <Typography style={{fontWeight: "bold"}} >
                               {`${productPrice.product.code} | ${productPrice.product.name}`}
                           </Typography>
                           <Typography variant="subtitle2">
                               {`${getDimensions(productPrice.product)} cm | ${productPrice.product.weight} kg`}
                           </Typography>
                       </Grid>
                       <Grid item xs={4}>
                           <TextField
                               label="Cena"
                               variant="standard"
                               name={priceFieldName}
                               onChange={onChange}
                               type="number"
                               InputProps={{
                                   startAdornment: <InputAdornment position="start">€</InputAdornment>,
                               }}
                               inputProps={{
                                   step: 0.01,
                                   min: 0,
                               }}
                               defaultValue={productPrice.price}
                           />
                       </Grid>
                   </Grid>
               </CardContent>
           </Card>
       </Grid>
    )

}




ProductPriceCard.propTypes = {
    productPrice:  PropTypes.shape({
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
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    priceFieldName: PropTypes.string,
}


export default ProductPriceCard;
