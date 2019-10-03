import React, {useState} from 'react';
import {PageProperties} from "../App/Page";
import {Redirect, RouteProps} from "react-router";

type RoutedPageProperties = PageProperties&Readonly<RouteProps>;

export default function Login(pageProp: RoutedPageProperties) {
    const [loggedin, setLoggedin] = useState(!!pageProp.fir.token);
    const [error, setError] = useState('');

    if(loggedin)
        return (<Redirect to="/whoami" />);

    const login = (event: React.MouseEvent<HTMLElement>) => {
        const usernameElement = document.getElementById('username') as HTMLInputElement;
        const username = usernameElement ? usernameElement.value : '';
        if(!username) {
            setError('Username Required');
            return;
        }
        setError('');
        (async () => {
            try {
                const token = await pageProp.fir.auth(username);
                console.log(['login got:', token]);
                if(token.Player_ID > 0) {
                    setLoggedin(true);
                    return;
                }
                setError('Failed to login');
            } catch (e) {
                console.log(['login catched:', e]);
                if(e.message) {
                    if(e.type) {
                        setError(`${e.message} (${e.type})`);
                        return;
                    }
                    setError(`${e.message}`);
                    return;
                }
                setError(`${e}`);
                return;
            }
        })();
    };
    const createAccount = (event: React.MouseEvent<HTMLElement>) => {
        const usernameElement = document.getElementById('username') as HTMLInputElement;
        const username = usernameElement ? usernameElement.value : '';
        if(!username) {
            setError('Username Required');
            return;
        }
        setError('');
        (async () => {
            try {
                const token = await pageProp.fir.addPlayer(username);
                console.log(['createAccount got:', token]);
                if(token.Player_ID > 0) {
                    setLoggedin(true);
                    return;
                }
                setError('Failed to login');
            } catch (e) {
                console.log(['createAccount catched:', e]);
                setError(e);
            }
        })();
    };

    return (<div>
        <h1>Login</h1>
        <fieldset>
            {error ? <p className="error">{error}</p> : ""}
            <label>
                <span>Username:</span>
                <input name="username" id="username" />
            </label>
            <input type="button" value="Login" onClick={login} />
            <input type="button" value="Create Account" onClick={createAccount} />
        </fieldset>
    </div>);
}
