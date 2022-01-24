import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../App";
import { CSSTransition } from "react-transition-group";
import { centsToFullDotCents } from "../../helpers/helpers";
import { PALLETE } from "../../colors/PALLETE.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../PATHS";

const Header = styled.header`
	padding: 2rem 4rem;
    width: 100%;
    box-sizing: border-box;
	display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    font-size: 1.8rem;
    font-weight: 700;
    color: ${PALLETE.primary};
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
    border: 2px solid ${PALLETE.secondary};
    background: ${PALLETE.primary};
    color: white;
    position: relative;
    box-shadow: 2px 2px 5px 0px rgba(0,50,0,0.3);
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    transition: opacity 0.5s, transform 0.5s;
    &:hover{
        opacity: 0.9;
        transform: scale(1.05);
    }
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
    max-height: 80vh;
    overflow-y: auto;
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
       /* SCROLLBAR */
    scrollbar-width: thin;
    scrollbar-color: grey;
    }

    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-track {
    }
    &::-webkit-scrollbar-thumb {
        background-color: grey;
        border-radius: 20px;
        border: 3px solid white;
    }
`

const CartItem = styled.div`
    flex-shrink: 0;
    padding: 1rem 2rem;
    border-top: 1px solid ${PALLETE.lightBorder};
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

const CartSummaryTitle = styled.div`
    width: 100%;
    text-align: right;
    font-size:1.6rem;
    padding: 0 1rem;
    margin-bottom: 0.4rem;
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

const CartOrderSummaryButton = styled.div`
    margin: 1.5rem 0 0.5rem 0;
    padding: 1rem 1rem;
    width:95%;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${PALLETE.action};
`

export const AppHeader = () => {

    const [isCartVisible, setIsCartVisible] = useState(false);
    const [isBackToShopVisible, setIsBackToShopVisible] = useState(false);

    const cartContextObject = useContext(CartContext);

    const toggleCartVisibility = () => {
        setIsCartVisible(oldState => !oldState);
    }

    let navigate = useNavigate();

    const handleBackToShop = () => {
        navigate("/", {replace: true});
    }

    let location = useLocation();
    
    useEffect(()=> {
        if (location.pathname === PATHS.summary) {
            setIsCartVisible(false);
            setIsBackToShopVisible(true);
            return
        }
        setIsBackToShopVisible(false);
    }, [location])

    // sums for all currencies
    const cartTotalCostObject = cartContextObject.cartContent.reduce((acc, item) => {
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
                {!isBackToShopVisible && <CartButton onClick={toggleCartVisibility}>
                🛒 {cartContextObject.cartContent.length}
                </CartButton>}
                {isBackToShopVisible && <CartButton onClick={handleBackToShop}>
                Back to shop
                </CartButton>}
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
                                Total
                            </CartSummaryTitle>
                            {cartTotalCostArray.map(currencyObj => (
                                    <CartSummaryCurrency key={currencyObj[0]}>
                                        {centsToFullDotCents(currencyObj[1])}
                                        {currencyObj[0]}
                                    </CartSummaryCurrency>
                                )
                            )}
                            <Link to="/summary">
                                <CartOrderSummaryButton>
                                    Go to summary
                                </CartOrderSummaryButton>
                            </Link>
                        </CartSummary>
                    </Cart>
                </CSSTransition>
            </HeaderRight>
        </Header>
     );
}
