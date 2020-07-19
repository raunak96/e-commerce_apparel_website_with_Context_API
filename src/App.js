import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import UserContext from "./contexts/user/user.context";

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribeFromAuth = auth.onAuthStateChanged(
            async (userAuth) => {
                if (userAuth) {
                    const userRef = await createUserProfileDocument(userAuth);

                    userRef.onSnapshot((snapShot) => {
                        setCurrentUser({
                            id: snapShot.id,
                            ...snapShot.data(),
                        });
                    });
                } else setCurrentUser(userAuth);
            }
        );
        return () => unsubscribeFromAuth();
    }, [currentUser]);

    return (
        <div>
            <UserContext.Provider value={currentUser}>
                <Header />
            </UserContext.Provider>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/shop" component={ShopPage} />
                <Route exact path="/checkout" component={CheckoutPage} />
                <Route
                    exact
                    path="/signin"
                    render={() =>
                        currentUser ? (
                            <Redirect to="/" />
                        ) : (
                            <SignInAndSignUpPage />
                        )
                    }
                />
            </Switch>
        </div>
    );
};

export default App;
