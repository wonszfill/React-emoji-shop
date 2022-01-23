export function centsToFullDotCents(cents) {
    const priceWhole = Math.floor(cents / 100);
    const priceCents = cents % 100 < 10 ? `0${cents % 100 }` : cents % 100 ;

    return `${priceWhole}.${priceCents}`
}