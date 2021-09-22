import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncGetProducts } from "./reducers/productsSlice";
import PageHeader from './components/PageHeader/PageHeader';
import Catalog from './pages/products/Products.jsx';
import "./commonStyles/main.scss"
import PageFooter from "./components/pageFooter/Footer";
import Cart from './pages/cart/Cart';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncGetProducts())
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <PageHeader></PageHeader>
      </header>

      <>
        <Switch>
          <Route exact path="/catalog/pizzas"> <Catalog /> </Route>
          <Route exact path="/catalog/burgers"> <Catalog /> </Route>
          <Route exact path="/catalog/sushi"> <Catalog /> </Route>
          <Route exact path="/catalog/drinks"> <Catalog /> </Route>
          <Route exact path="/cart"> <Cart /> </Route>
          <Redirect to='/catalog/pizzas'></Redirect>
        </Switch>
      </>
      <PageFooter />
    </div>
  );
}

export default App;
