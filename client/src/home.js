// Copyright Cole Snyder 2020 
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Bins from './bins';
import Products from './product';
import Inventory from './inventory';
import Order from './order';
import OrderLine from './order-lines';

import './App.css';

class Home extends React.Component {

  render() {

    console.log('State: ', this.state);

    return(
    
    <div className="home-backgroud darken">    
      <h1 className="welcomeh1">Welcome to the <i>MERN Warehouse</i></h1>
      <p className="homeP">Please navigate to one of the following warehouse components and rememeber - <br></br>
        always wear your hard hat :)</p>
      <div className="container buttonArea">
        <div className="row">

          <div className="col-2"><Link to="/bins"><button className="homeButton">BINS</button></Link></div>
          <div className="col-2"><Link to="/products"><button className="homeButton">PRODUCTS</button></Link></div>
          <div className="col-2"><Link to="/inventory"><button className="homeButton">INVENTORY</button></Link></div>
          <div className="col-2"><Link to="/orders"><button className="homeButton">ORDERS</button></Link></div>
          <div className="col-2"><Link to="/order-lines"><button className="homeButton">ORDER LINES</button></Link></div>

        </div>
      </div>  
    </div>
    );
  }
}

export default Home;
