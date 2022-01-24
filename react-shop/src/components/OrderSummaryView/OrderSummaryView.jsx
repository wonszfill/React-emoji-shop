import styled from "styled-components";
import { CartContext } from "../../App";
import { useContext, useState } from "react";
import { centsToFullDotCents, orderListToGroupedList } from "../../helpers/helpers";
import { PALLETE } from "../../colors/PALLETE";
import { useNavigate } from "react-router-dom";

const Summary = styled.div`
    width: 100%;
    max-width: 80rem;
`

const SummaryWrapper = styled.div`
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.2);
`

const SummaryItem = styled.div`
    padding: 2rem 4rem;
    font-size: 1.4rem;
    display: flex;
    flex-wrap: wrap;
    background: white;
    border-top: 1px solid ${PALLETE.lightBorder};
`

const SummarytTitle = styled(SummaryItem)`
    text-align: center;
    font-weight: 700;
    font-size: 2rem;
    border:none;
    background: ${PALLETE.primary};
    color: white;
`

const SummaryTotal = styled(SummaryItem)`
    flex-direction: column;
    align-items: flex-end;
    font-weight: 700;
    font-size: 2rem;
    border:none;
    background: ${PALLETE.primary};
    color: white;
`

const SummaryItemEmoji = styled.div`
    font-size:2rem;
`

const SummaryItemLeft = styled.div`
    flex-grow: 1;
`

const SummaryItemQuantity = styled.div`
    width: 9rem;
    display: flex;
`

const SummaryItemChangeQuantity = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    background: ${PALLETE.action};
    border: 1px solid white;
    border-radius: 0.5rem;
    flex-grow:1;
`

const SummaryItemQuantityInput = styled.input`
    width: 2rem;
    background: transparent;
    outline: none;
    border: none;
    text-align: center;
    flex-grow:1;
`

const SummaryItemPrices = styled.div`
    margin-left: 3rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const SummaryItemSinglePrice = styled.div`

`

const SummaryItemTotalPrice = styled.div`
    font-weight: 700;
`

const SummaryTotalOrder = styled.div`
    margin-top: 2rem;
    padding: 1rem 4rem;
    display: flex;
    align-items: center;
    border-radius: 1rem;
    background: ${PALLETE.action};
    cursor: pointer;
    transition: transform 1s, opacity 1s;
    &:hover{
        transform: scale(1.1);
        opacity: 0.9;
    }
`

const SummaryTotalCurrency = styled.div`
    font-size:1.6rem;
    font-weight: 400;
`

export const OrderSummaryView = () => {

    const cartContextObject = useContext(CartContext);

    const cartGroupedByTypeObject = orderListToGroupedList(cartContextObject.cartContent);
    const cartGroupedByTypeArray = Object.values(cartGroupedByTypeObject);

    const summaryTotalCostObject = cartGroupedByTypeArray.reduce((acc, item) => {
        console.log(item)
        if (!(item.price.currency in acc)) {
            return {...acc, [item.price.currency]: (item.quantity * item.price.value) }
        }
        const updatedPrice = acc[item.price.currency] + item.quantity * item.price.value 
        return {...acc, [item.price.currency]: updatedPrice}
    }, {})
    const summaryTotalCostArray = Object.entries(summaryTotalCostObject); 
    
    let navigate = useNavigate();

    const handleCheckout = () => {
        cartContextObject.setCartContent([]);
        navigate("/checkout", {replace: true});
    }

    return (
        <Summary>
            <SummaryWrapper>
                <SummarytTitle>
                    Order summary
                </SummarytTitle>
                {cartGroupedByTypeArray.map(item => (
                    <SummaryItem key={item.id}>
                        <SummaryItemLeft>
                            <SummaryItemEmoji>
                                {item.item}
                            </SummaryItemEmoji>
                            {item.name}
                        </SummaryItemLeft>
                        <SummaryItemQuantity>
                            <SummaryItemChangeQuantity>
                                -
                            </SummaryItemChangeQuantity>
                            <SummaryItemQuantityInput value={item.quantity} />
                            <SummaryItemChangeQuantity>
                                +
                            </SummaryItemChangeQuantity>
                        </SummaryItemQuantity>
                        <SummaryItemPrices>
                            <SummaryItemSinglePrice>
                                One: {centsToFullDotCents(item.price.value)}{item.price.currency}
                            </SummaryItemSinglePrice>
                            <SummaryItemTotalPrice>
                                Total: {centsToFullDotCents(item.price.value * item.quantity)}{item.price.currency}
                            </SummaryItemTotalPrice>
                        </SummaryItemPrices>
                    </SummaryItem>
                ))}
                <SummaryTotal>
                    <div>Total</div>
                    {summaryTotalCostArray.map(currency => (
                        <SummaryTotalCurrency>
                            {currency[0]} {centsToFullDotCents(currency[1])}
                        </SummaryTotalCurrency>
                    ))}
                    
                    <SummaryTotalOrder onClick={handleCheckout}>
                        Order
                    </SummaryTotalOrder>
                </SummaryTotal>
            </SummaryWrapper>
        </Summary>
    );
}
