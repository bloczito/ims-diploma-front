const reduceElements = elements => {
    const map = elements
        .reduce((prev, curr) => {
            const prevVal = prev.get(curr.product.id) || {
                quantity: 0,
                product: curr.product
            };
            prev.set(curr.product.id, {
                quantity: curr.quantity + prevVal.quantity,
                product: curr.product
            });
            return prev
        }, new Map());

    return [...map].map(([k, v]) =>({
        product: v.product,
        quantity: v.quantity
    }))
}

export const getOrderedElements = merchOrders => {
    const elements = [...merchOrders]
        .filter(ord => ord.id)
        .map(ord => ord.orderElements)
        .flat()
        .map(el => ({
            quantity: el.quantity,
            product: el.product,
        }));

    return reduceElements(elements);
}

export const getShippedElements = shipments => {
    const elements = [...shipments]
        .filter(shipment => shipment.id)
        .map(shipment => shipment.shipmentElements)
        .flat()
        .map(el => ({
            product: el.product,
            quantity: el.quantity,
        }));

    return reduceElements(elements);
}

export const getNotShippedElements = (orderedElements, shippedElements) => {
    const newShippedElements = shippedElements.map(e => ({...e}));
    newShippedElements.forEach(shippedEl => shippedEl.quantity *= -1);

    return reduceElements([...orderedElements, ...newShippedElements]);
}
