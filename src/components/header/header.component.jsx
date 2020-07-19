import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./header.styles.scss";
import UserContext from "../../contexts/user/user.context";
import CartContext from "../../contexts/cart/cart.context";

const Header = () => {
    const currentUser= useContext(UserContext);
    const [hidden,setHidden]= useState(true);
    const toggleCartHidden=()=>setHidden(!hidden);
    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo" />
                <span className="logo-name">RAWN'S APPARELS</span>
            </Link>
            <div className="options">
                <Link className="option" to="/shop">
                    SHOP
                </Link>
                <Link className="option" to="/shop">
                    CONTACT
                </Link>
                {currentUser ? (
                    <Link to="/" className="option" onClick={(e) => {e.preventDefault();auth.signOut()}}>
                        SIGN OUT
                    </Link>
                ) : (
                    <Link className="option" to="/signin">
                        SIGN IN
                    </Link>
                )}
                <CartContext.Provider value={{
                    hidden,
                    toggleCartHidden
                }}>
                    <CartIcon />
                </CartContext.Provider>
            </div>
            {hidden ? null : <CartDropdown />}
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
