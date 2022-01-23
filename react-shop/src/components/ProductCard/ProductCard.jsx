import styled from "styled-components";
import { CSSTransition } from 'react-transition-group'
import { useState } from "react";

const StyledProductCard = styled.div`
    padding: 2rem;
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
`

const ProductTitle = styled.div`
    flex-grow: 1;
    font-size: 2.4rem;
`

const ShowDetailsButton = styled.div`
    background-color: lightgreen;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    box-shadow: ${props => props.isDetailedView ? "inset" : ""} 0 0 5px 0px rgba(0,0,0,0.2);
    cursor: pointer;
`

const DetailedView = styled.div`
    margin-top: 2rem;
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

export const ProductCard = ({ product }) => {

    const [isDetailedView, setIsDetailedView] = useState(false);

    const toggleDetailedView = () => {
        setIsDetailedView(oldState => !oldState)
    }

    const priceWhole = Math.floor(product.price.value / 100);
    const priceCents = product.price.value % 100 < 10 ? `0${product.price.value % 100 }` : product.price.value % 100 ;

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
                                {priceWhole}.{priceCents}
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