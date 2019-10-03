import React from 'react';

import {Redirect, RouteProps} from "react-router";
import {PageProperties} from "../App/Page";

type RoutedPageProperties = PageProperties&Readonly<RouteProps>;

export default function Player(pageProp: RoutedPageProperties) {
    if(!pageProp.fir.token)
        return (<Redirect push to="/login" />);
    return (<div><h1>Player</h1></div>);
}
