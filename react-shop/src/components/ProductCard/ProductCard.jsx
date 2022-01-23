import styled from "styled-components";

const StyledProductCard = styled.div`
    padding: 2rem;
    margin: 1rem 0;
    border-radius: clamp( 0rem, 0.5vw, 1rem);
    box-shadow: 1px 0 5px 1px rgba(0,0,0,0.2);
    background: white;
`

export const ProductCard = ({ product }) => {
    return ( 
        <StyledProductCard>
            {product.name}
        </StyledProductCard>    
    );
}