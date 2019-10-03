import React from 'react';
import {PageProperties} from "../App/Page";
import {RouteProps, Redirect} from "react-router";

type RoutedPageProperties = PageProperties&Readonly<RouteProps>;

export default function AuthRedirect(pageProp: RoutedPageProperties) {
    if(pageProp.fir.token)
        return (<Redirect to="/whoami" />);
    return (<Redirect push to="/login" />);
}
