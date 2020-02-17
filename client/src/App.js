// Copyright Cole Snyder 2020 
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Bins from './bins';
import Products from './product';
import Inventory from './inventory';
import Order from './order';
import OrderLine from './order-lines';
import Home from './home';

// this is the main rendered component. It holds the navbar that is on every page, and the 
// routing logic for each component is also here. 
class App extends React.Component {

  render() {

    return(

      <Router>

        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <div className="row">
            <div className="col-11">
              <h2 className="navbar-brand nav-title">MERN Warehouse</h2>
            </div>

            <div className="col-1">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/bins" className="navbar-brand link">Bins</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/products" className="navbar-brand link">Products</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/inventory" className="navbar-brand link">Inventory</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/orders" className="navbar-brand link">Orders</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/order-lines" className="navbar-brand link">Order Lines</Link>
                </li>
              </ul>
            </div>
            </div>
          </div>
        </nav>
        <Route path='/' exact component={Home}/>
        <Route path='/bins' component={Bins} />
        <Route path='/products' component={Products} />
        <Route path='/orders' component={Order} />
        <Route path='/order-lines' component={OrderLine} />
        <Route path='/inventory' component={Inventory} />
      </Router>

    );
  }
}

export default App;