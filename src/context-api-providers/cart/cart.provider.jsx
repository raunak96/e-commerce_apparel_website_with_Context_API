import React,{ createContext, useState,useEffect } from "react";
import { addItemToCart, clearItemFromCart,removeItemFromCart, getCartItemsCount,totalCostOfItems } from "./cart.utils";

export const CartContext=createContext({
    hidden:true,
    toggleCartHidden:()=>{},
    cartItems:[],
    addItem:()=>{},
    removeItem: ()=>{},
    clearItem: ()=>{},
    cartItemsCount:0,
    totalCost:0
});

const CartProvider=({children})=>{
    const [hidden, setHidden] = useState(true);
    const toggleCartHidden = () => setHidden(!hidden);

    const [cartItems,setCartItems]=useState([]);
    const addItem= itemToAdd => setCartItems(addItemToCart(cartItems,itemToAdd));
    const removeItem= itemToRemove => setCartItems(removeItemFromCart(cartItems,itemToRemove));
    const clearItem= itemToClear => setCartItems(clearItemFromCart(cartItems,itemToClear));

    const [cartItemsCount,setCartItemsCount]=useState(0);
    const [totalCost,setTotalCost]=useState(0);

    useEffect(()=>{
        setCartItemsCount(getCartItemsCount(cartItems));    // whenever cartItems changes fire useEffect to set Items Count 
        setTotalCost(totalCostOfItems(cartItems));
    },[cartItems]);

    return(
        <CartContext.Provider value={{
            hidden,toggleCartHidden,cartItems,addItem,removeItem,clearItem,cartItemsCount,totalCost
        }}>
            {children}
        </CartContext.Provider>
    )
};

export default CartProvider;