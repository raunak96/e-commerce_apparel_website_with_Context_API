import React, { useContext } from "react";
import CollectionItem from "../../components/collection-item/collection-item.component";
import "./collection.styles.scss";
import ShopContext from "../../contexts/shop/shop.context";

const CollectionPage = ({ match }) => {
    /* 
        Method 1: Context-API without Hooks
    return (
        <ShopContext.Consumer>   // we want to consume whatever is stored in ShopContext Context-API which in our case is object SHOP_DATA
            {
                (collections) => {
                    const collection = collections[match.params.collectionId];
                    const { title, items } = collection;
                    return (
                        <div className="collection-page">
                            <h2 className="title">{title}</h2>
                            <div className="items">
                                {items.map((item) => (
                                    <CollectionItem key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    );
                }
            }
        </ShopContext.Consumer>
    ); 
    */

    // OR  Method 2 Context API with hooks (MUCH EASIER METHOD)
    const collections= useContext(ShopContext);
    const collection= collections[match.params.collectionId];
    const { title, items } = collection;
    return (
        <div className="collection-page">
            <h2 className="title">{title}</h2>
            <div className="items">
                {items.map((item) => (
                    <CollectionItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default CollectionPage;
