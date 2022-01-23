import { useEffect, useState } from "react";
import styled from "styled-components";
import { ProductCard } from "../ProductCard/ProductCard";
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ProductsWrapper = styled.div`
    width: 100%;
    max-width: 90rem;
`

export const ProductsView = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/products.json")
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

    return ( 
        <ProductsWrapper>
            <TransitionGroup>
                { products.map(product => (
                    <CSSTransition
                        key={product.id}
                        timeout={300}
                        classNames="item"
                    >
                        <ProductCard product={product} />
                    </CSSTransition>
                    )
                )}
            </TransitionGroup>
        </ProductsWrapper>
    );
}