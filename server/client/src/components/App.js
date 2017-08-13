import React, { Component } from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';

const Dashboard = () => <h2>D</h2>
const SurveyNew = () => <h2>SN</h2>
const Landing = () => <h2>L</h2>


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact={true} path="/" component={Landing} />
          <Route exact={true} path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />



        </div>
      </BrowserRouter>
    </div>
  )
};

export default App;
