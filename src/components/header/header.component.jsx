import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./header.styles.scss";
import UserContext from "../../contexts/user/user.context";
import { CartContext } from "../../context-api-providers/cart/cart.provider";

const Header = () => {
    const currentUser= useContext(UserContext);
    const {hidden} = useContext(CartContext);
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
                <CartIcon />
            </div>
            {hidden ? null : <CartDropdown />}
        </div>
    )
};


export default Header;
