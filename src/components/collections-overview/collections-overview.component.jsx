import React, { useContext } from "react";

import CollectionPreview from "../collection-preview/collection-preview.component";

import "./collections-overview.styles.scss";
import ShopContext from "../../contexts/shop/shop.context";

const CollectionsOverview = () => {
    const shopData=useContext(ShopContext);
    const collections= Object.values(shopData).map(data=>data);
    return (
        <div className="collections-overview">
            {collections.map(({ id, ...otherCollectionProps }) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))}
        </div>
    );
};

export default CollectionsOverview;
