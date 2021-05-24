import PropTypes from "prop-types";


export const productShape = PropTypes.shape({
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
});


const orderShape = PropTypes.shape({
    merchOrders: PropTypes.shape({
        id: PropTypes.number,
        comment: PropTypes.string,
        merchOrderDate: PropTypes.string,
        orderElements: PropTypes.shape({
            id: PropTypes.number,
            quantity: PropTypes.number,
            product: productShape
        })
    })
})