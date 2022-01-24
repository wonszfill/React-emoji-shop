export function centsToFullDotCents(cents) {
    const priceWhole = Math.floor(cents / 100);
    const priceCents = cents % 100 < 10 ? `0${cents % 100 }` : cents % 100 ;

    return `${priceWhole}.${priceCents}`
}

export function orderListToGroupedList(orderList) {
    return orderList.reduce((acc, item) => {
        if (!(item.id in acc)) {
            return {...acc,  [item.id]: {...item, quantity: 1}}
        }
        const updatedQuantity = acc[item.id].quantity + 1
        return {...acc, [item.id]: {...item, quantity: updatedQuantity}}
    }, {})
}
