import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Api as FirApi} from "../Api/Actions";

import AuthRedirect from '../Pages/AuthRedirect';
import Login from '../Pages/Login';
import Player from '../Pages/Player';

export interface PageProperties {
    fir: FirApi;
}

export default function Page(pageProp: PageProperties) {
    return (<Switch>
        <Route exact path="/"><AuthRedirect fir={pageProp.fir} /></Route>
        <Route path="/login"><Login fir={pageProp.fir} /></Route>
        <Route path="/whoami"><Player fir={pageProp.fir} /></Route>
        <Route>404</Route>
    </Switch>);
}
