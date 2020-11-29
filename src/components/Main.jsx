import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../assets/scss/main.scss';
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");

import HomeContainer from '../containers/HomeContainer';

export default () => {
    return(
        <Switch>
            <Route exact path="/" component={HomeContainer}/>
            <Route component={()=><h1>404</h1>}/>
        </Switch>
    )
}