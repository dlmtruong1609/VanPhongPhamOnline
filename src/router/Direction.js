import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Product from '../pages/Product';

const Direction = () => {
    return (
        <Switch>
            <Route path="/sanpham">
            <Product />
            </Route>
            <Route exact path="/trangchu">
            <Home/>
            </Route>
            <Route exact path="/">
            <Home />
            </Route>
        </Switch>
    );
};

export default Direction;