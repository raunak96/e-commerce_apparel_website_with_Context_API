# react-context-API-lesson
We are going to replace our local state management from redux to the new context API. This repository is our application before we introduced sagas to handle our asynchronous code, which is a good starting point to make the appropriate changes!

## Changes 


- #### Case 1 (When Context Value is only consumed i.e Value does not change like SHOP_DATA)
  - First we create a Shop Context which is simply a store which stores the state for Shop in this case whose value is SHOP_DATA object.
  - Now, to use it there are 2 ways which can be seen [here](src/pages/collection/collection.component.jsx). Easier way is to use the hook **useContext(ShopContext)**, which simply returns whatever was stored in passed Context in this case ShopContext. From this, we can extract the property we want and use the value in the Component where useContext called.

- #### Case 2 (When context value is consumed as well as produced i.e value changes but changes at Upper Component and propagated to lower level like currentUser changes in App component and propagated to Header Component)
  - Similar to above User Context is made whose initial value is null and this value is changed in APP component, by subscribing to onAuthChanged Observable pattern which returns user info when changed as it happened previously.
  - Now for changing this Context's value, we have to use **State** and **setState** or **useState() hook** to set initial value for user local to App component and change it according to condition relevant to it using **setState** in this case on **onAuthChanged()**.
  - Now, in order for lower level Components, to Consume or use this Context's value(which is also App's local state) unlike passing like props which lead to prop-drilling problem, we wrap the component which might require this value(or its descendant) for Eg <ShopContext.Producer value={currentUser}>{children}</ShopContext.Producer>. [Example Code](src/App.js)
  - Now, unlike props where if Component which had to use the value was nested 2-3 or more levels below the base Component whose state is passed then in between states had to pass on the state value as props leading to props-drilling, Context-API does not have that problem.
  - In Context-API, the in between components do not need to leverage props to simply pass down the value to the Component which required it. Any Component, as long as any of its ancestor was wrapped around the context Container can directly utilize the Context value by **importing** the **context** in this case Shop Context and using the **useContext() hook**.

- #### Case 3 (like Case 2 but Context Value changes/produced at lower level and consumed at Higher level like or non-descendent for Eg for ToggleCartHidden, the value of hidden is produced/changed at CartIcon component but consumed/used at CartDropDown and CartDropDown is not a descendant of CartIcon)
  - Since Context-API produces change to Context by leveraging State, similar to props-state logic, state changes can only be propagated downwards, hence state can only be leveraged and Produced at Common Ancestor of both the producer-consumer Components(LCA for efficiency), in this case Header Component and then Both prodcuer and consumer realted data passed to CartIcon and CartDropdown respectively.
  - First, we make a CartContext which is an object -> {hidden:*true*, *toggleCartHidden=()=>{}*} where toggleCartHidden is function which will be passed to CartIcon to change **hidden** key's value of CartContext(fn initialised to do nothing to avoid any problems).
  - Now, in Header component, we use **useState hook** to make state for cartHidden property. Then, CartContext.Producer container is wrapped around CartIcon
  with values of CartContext i.e hidden and toggleCartHidden fn which is now equal to a fn which when called toggles the hidden value. [Code](src/components/header/header.component.jsx).
  - Using the hidden value we used in state of Header Component, CartDropdown is either rendered or not. 
  - Now in Cart Icon component, this toggleCartHidden function is destructed from CartContext using **useContext hook** and on Clicking CartIcon toggleCartHidden function is invoked which toggles the hidden value of CartContext and since it was defined using setState of Header, its hidden value is also toggled and thus reflected and CartDropDown toggling is done with accuracy.

- ### Making Cart Provider which wraps over All other Components by wrapping over App Component which was our top-most component.
  - This was done as various aspects of cart like hidden property for dropdown, adding/removing items from cart, items count etc is utilised in most of the components. Thus for all of them to consume its Context, **CartProvide** was made which is simply a <CartContext.Provider>{children}</CartContext.Provider> with various values and functions for setting these values(Same as in CartContext defined in this provider) which are then consumed by its descendants. [Code](src/context-api-providers/cart/cart.provider.jsx)
  - Except for **CartItemsCount** and **totalCost**(used to display total cart cost in Checkout Page), other cart values are displayed and set similar to above **3 Cases**.
  - For **CartItemsCount** and **totalCost**, in CartProvider, we utilise **useEffect() hook** which sets values of these two properties if CartItems array changes.


## Set to an existing Heroku app

To set to an existing Heroku app you already have deployed, you need to know the name of the app you want to deploy to. To see a list of all the apps you currently have on Heroku:

```
heroku apps
```

Copy the name of the app you want to connect the project to, then run:

```
heroku git:remote -a <PASTE_YOUR_APP_NAME_HERE>
```

And now you'll have your repo connected to the heroku app under the git remote name `heroku`.

Then skip to the bottom of this article to see what to do next!


## To create a new Heroku app

Create a new Heroku project by typing in your terminal:

```
heroku create
```

This will create a new Heroku project for you. Then run:

```
git remote -v
```

You should see heroku `https://git.heroku.com/<RANDOMLY_GENERATED_NAME_OF_YOUR_APP>` in the list. This means you have successfully connected your project to the newly created Heroku app under the git remote of `heroku`.


## Deploying to Heroku

Add the `mars/create-react-app-buildpack` to your heroku project by typing:

```
heroku buildpacks:set mars/create-react-app-buildpack
```

You can then deploy to heroku by running:

```
git push heroku master
```

You will see this warning message if you are pushing to an existing app:

```
! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'https://git.heroku.com/hasura-crwn-clothing.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

This is because we are pushing to an existing app that was deploying an entirely different repository from what we have now. Simply run:

```
git push heroku master --force
```

This will overwrite the existing Heroku app with our new code.


## Open our Heroku project

After heroku finishes building our project, we can simply run:

```
heroku open
```

This will open up our browser and take us to our newly deployed Heroku project!
