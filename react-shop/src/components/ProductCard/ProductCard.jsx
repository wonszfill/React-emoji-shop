import styled from "styled-components";
import { CSSTransition } from 'react-transition-group'
import { useContext, useState } from "react";
import { CartContext } from "../../App";
import { centsToFullDotCents } from "../../helpers/helpers";
import { PALLETE } from "../../colors/PALLETE";

const StyledProductCard = styled.div`
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;


    border-radius: clamp( 0rem, 0.5vw, 1rem);
    box-shadow: 1px 0 5px 1px rgba(0,0,0,0.2);
    background: white;
`

const ProductHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 2rem;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    box-shadow: 1px 0 7px 1px rgba(0,0,0,0.2);
`

const ProductTitle = styled.div`
    flex-grow: 1;
    font-size: 2.4rem;
`

const ShowDetailsButton = styled.div`
    background-color: ${PALLETE.good};
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    box-shadow: ${props => props.isDetailedView ? "inset" : ""} 0 0 5px 0px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: opacity 0.5s;
    &:hover{
        opacity: 0.7;
    }
`

const DetailedView = styled.div`
    margin-top: 2rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
`

const DetailedProduct = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    font-size: 5rem;
`

const DetailedPrice = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 1.8rem;
`

const DetailedPriceValue = styled.span`
    margin-right: 0.5rem;
    font-weight: 700;
`

const DetailedPriceCurrency = styled.span`
    margin-right: 0.5rem;
`

const AddToCartButton = styled.div`
    margin-left: 2rem;
    background-color: ${PALLETE.action};
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 5px 0px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: opacity 0.5s;
    &:hover{
        opacity: 0.7;
    }
`

export const ProductCard = ({ product }) => {

    const [isDetailedView, setIsDetailedView] = useState(false);
    const cartContextObject = useContext(CartContext);

    const toggleDetailedView = () => {
        setIsDetailedView(oldState => !oldState)
    }

    const handleAddToCart = () => {
        cartContextObject.setCartContent(oldContent => [product, ...oldContent]);
        console.log(cartContextObject.cartContent);
    }

    return ( 
        <StyledProductCard>
            <ProductHeader>
                <ProductTitle>
                    {product.name}
                </ProductTitle>
                <ShowDetailsButton
                    isDetailedView={isDetailedView}
                    onClick={toggleDetailedView}
                >
                    Show details
                </ShowDetailsButton>
                <AddToCartButton onClick={handleAddToCart}>
                    Add to cart
                </AddToCartButton>
            </ProductHeader>
            <CSSTransition
                timeout={300}
                classNames="item"
                in={isDetailedView}
                unmountOnExit
            >
                <div>
                    <DetailedView>
                        <DetailedProduct>
                            {product.item}
                        </DetailedProduct>
                        <DetailedPrice>
                            <DetailedPriceValue>
                                {centsToFullDotCents(product.price.value)}
                            </DetailedPriceValue>
                            <DetailedPriceCurrency>
                                {product.price.currency}
                            </DetailedPriceCurrency>
                        </DetailedPrice>
                    </DetailedView>
                </div>
                
            </CSSTransition>
        </StyledProductCard>    
    );
}