import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Header from './Header';
import Page from './Page';
import './App.css';
import {Api as FirApi} from "../Api/Actions";
const fir = new FirApi();

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Page fir={fir} />
      </div>
    </Router>
  );
}

export default App;
