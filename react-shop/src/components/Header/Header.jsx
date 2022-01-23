import styled from "styled-components";
import { useContext, useState } from "react";
import { CartContext } from "../../App";
import { CSSTransition } from "react-transition-group";
import { centsToFullDotCents } from "../../helpers/helpers";

const Header = styled.header`
	padding: 2rem 4rem;
    width: 100%;
    box-sizing: border-box;
	display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    font-size: 1.8rem;
    font-weight: 700;
    color: rgba(3,3,28,0.8);
    box-shadow: 1px 0 5px 1px rgba(0,0,0,0.2);
    margin-bottom: 5rem;
    background: white;
`

const HeaderLeft = styled.div`
    display: flex;

    justify-content: flex-start;
    align-items: center;
`

const HeaderCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const HeaderRight = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
`

const CartButton = styled.div`
    padding: 1rem 2rem;
    border-radius: 10rem;
    border: 2px solid green;
    background: lightgreen;
    position: relative;
    box-shadow: 2px 2px 5px 0px rgba(0,50,0,0.3);
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
`

const Cart = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 1rem;
    filter: drop-shadow(0px 1px 3px rgba(0,0,0,0.5));
    &:before{
        content: "";
        position:absolute;
        top: -1rem;
        right: 3rem;
        width:3rem;
        height:1rem;
        background: white;
        clip-path: polygon(0 100%, 50% 0, 100% 100%);
        
    }
`

const CartItem = styled.div`
    padding: 1rem 2rem;
    border-top: 1px solid rgba(0,0,0,0.3);
    display: flex;
    justify-content: space-between;
    font-weight: 400;
    font-size:1.4rem;
    overflow: hidden;
`

const CartTitle = styled.div`
    padding: 1rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:2rem;
`

const CartItemName = styled.div`
    margin-right:4rem;
`

const CartSummary = styled(CartItem)`
    flex-direction: column;
    align-items: center;
`

const CartSummaryTitle = styled(CartTitle)`
    font-size:1.6rem;
    padding: 0 1rem;
    font-weight: 600;
    &:after{
        content: ":";
    }
`

const CartSummaryCurrency = styled.div`
    width:100%;
    flex-grow: 1;
    text-align: right;
`


export const AppHeader = () => {

    const [isCartVisible, setIsCartVisible] = useState(false);

    const cartContextObject = useContext(CartContext);

    const toggleCartVisibility = () => {
        setIsCartVisible(oldState => !oldState);
    }

    // sums for all currencies
    const cartTotalCostObject = cartContextObject.cartContent.reduce((acc, item) => {
        console.log(acc)
        if (!(item.price.currency in acc)) {
            return {...acc, [item.price.currency]: item.price.value}
        }
        const updatedPrice = acc[item.price.currency] + item.price.value
        return {...acc, [item.price.currency]: updatedPrice}
    }, {})
    const cartTotalCostArray = Object.entries(cartTotalCostObject); 

    return ( 
        <Header>
            <HeaderLeft>

            </HeaderLeft>
            <HeaderCenter>
                React Emoji Shop
            </HeaderCenter>
            <HeaderRight>
                <CartButton onClick={toggleCartVisibility}>
                🛒 {cartContextObject.cartContent.length}
                </CartButton>
                <CSSTransition
                    timeout={300}
                    classNames="cart"
                    in={isCartVisible}
                    unmountOnExit
                >
                    <Cart>
                        <CartTitle>
                            Cart
                        </CartTitle>
                        <CartContext.Consumer>
                            { cartContextObject => cartContextObject.cartContent.map(item => (
                                    <CartItem>
                                        <CartItemName>
                                            {item.name}
                                        </CartItemName>
                                        <span>
                                            {centsToFullDotCents(item.price.value)}
                                            {item.price.currency}
                                        </span>
                                    </CartItem>
                                )   
                            )}
                        </CartContext.Consumer>
                        <CartSummary>
                            <CartSummaryTitle>
                                Summary
                            </CartSummaryTitle>
                            {cartTotalCostArray.map(currencyObj => (
                                    <CartSummaryCurrency key={currencyObj[0]}>
                                        {centsToFullDotCents(currencyObj[1])}
                                        {currencyObj[0]}
                                    </CartSummaryCurrency>
                                )
                            )}
                        </CartSummary>
                    </Cart>
                </CSSTransition>
            </HeaderRight>
        </Header>
     );
}
