
import { useContext } from 'react';
import './cart-icon.styles.jsx';
import { CartContext } from '../../context/cart.context';
import { ShoppingIcon,CartIconContainer,ItemCount } from './cart-icon.styles.jsx';

const CartIcon = () => {

    const {isCartOpen,setIsCartOpen,cartCount} = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)
    return(
       <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon className='shopping-icon'></ShoppingIcon>
        <ItemCount>{cartCount}</ItemCount>
       </CartIconContainer>
    )
}


export default CartIcon