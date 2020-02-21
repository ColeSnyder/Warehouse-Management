// Copyright Cole Snyder 2020 
import React from 'react';
import axios from 'axios';
import { Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './App.css';

class OrderLine extends React.Component {

  state = {
    OrderLineID: '',
    OrderID: '',
    ProductID: '',
    QTY: '',
    _id: '',
    posts: [],
    modalIsOpen: false,
    updateModalIsOpen: false
  };

  componentDidMount = () => {
    this.getOrderLines();
  };

  getOrderLines = () => {
    axios.get('/api/order-lines')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log('Data has been recieved');
      })
      .catch(() => {
        // alert('error retrieving data');
      });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

    // manages the alerts sent by the banner
    bannerClick = (data, type) => {
      if (data == "search") {
        alert("This icon would allow users to search for a specific item in this collection.");
      } else if (data == "pause") {
        alert("This icon would allow users to pause the flow of data from the backend, stopping the asynchronous data flow.");
      } else if (data == "database") {
        alert("This icon would allow users to check diagnostics from the database.");
      } else if (data == "bookmark") {
        alert("This icon would allow users to bookmark this collection for later use.");
      } else if (data == "print") {
        alert("This icon would allow users to print out the results of a collection of documents.");
      } else if (data == "bell") {
        alert("This icon would allow users to turn on notifications for a specific collection.");
      } else if (data == "download") {
        alert("This icon would allow users to download the current collection as a PDF.");
      } else if (data == "sort") {
        alert("This icon would allow users to sort the collection by number or letter.");
      }
    };

  submit = (event) => {
    event.preventDefault();

    const payload = {
        OrderLineID: this.state.OrderLineID,
        OrderID: this.state.OrderID,
        ProductID: this.state.ProductID,
        QTY: this.state.QTY
    };

    axios({
      url: 'https://mernwarehouse.herokuapp.com/api/saveOrderLines',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getOrderLines();
      })
      .catch(() => {
        console.log('Internal server error');
      });
  };

  delete = (data, event) => {
    event.preventDefault();

    console.log('Data before sending to server: ', data._id);

    axios({
      url: 'https://mernwarehouse.herokuapp.com/api/deleteOrderLines/' + data._id,
      method: 'POST',
      data: data._id
    })
      .then(() => {
        console.log('Data has been sent to the server');
      })
      .catch(() => {
        console.log('Internal server error');
      });
      this.getOrderLines();
      this.setState({
        modalIsOpen: ! this.state.modalIsOpen
      });
  };

  update = (data, event) => {
    event.preventDefault();

    const payload = {
      OrderLineID: this.state.OrderLineID,
      OrderID: this.state.OrderID,
      ProductID: this.state.ProductID,
      QTY: this.state.QTY,
      _id: this.state._id
    };

    axios({
      url: 'https://mernwarehouse.herokuapp.com/api/updateOrderLines/' + data._id + '/' + data.OrderLineID + '/' + data.OrderID + '/' + data.ProductID + '/' + data.QTY,
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
      })
      .catch(() => {
        console.log('Internal server error');
      });
      this.resetUserInputs();
      this.getOrderLines();
      this.setState({
        updateModalIsOpen: ! this.state.updateModalIsOpen
      });
  };

  resetUserInputs = () => {
    this.setState({
        OrderLineID: '',
        OrderID: '',
        ProductID: '',
        QTY: '',
        _id: ''
    });
  };

  displayOrderLinePosts = (posts) => {

    if (!posts.length) return null;

    return posts.map((post, index) => (


     <ul>
        <li>
          <div className="container">
            <div className="row db-item"> 
              <div className="col-3 item-comp">
                <h5><strong>Order Line ID:</strong> {post.OrderLineID}</h5>
              </div>
              <div className="col-2 item-comp">
                <p><strong>Order ID:</strong> {post.OrderID}</p>
              </div>
              <div className="col-2 item-comp">
                <p><strong>Product ID:</strong> {post.ProductID}</p>
              </div>
              <div className="col-1 item-comp">
                <p><strong>QTY:</strong> {post.QTY}</p>
              </div>
              <div className="col-3 item-comp">
                <p value={post._id}><strong>_id:</strong><a className="idClick" onClick={this.setModal.bind(this, post)}>{post._id}</a></p>
              </div>
              <div className="col-1 item-comp">
                <p className="delete-item" onClick={this.delete.bind(this, post)} value={post._id}>Delete</p>
              </div>
            </div>
          </div>
        </li>
      </ul>

    ));
  };


  toggleModal = () => {
    this.setState({
      modalIsOpen: ! this.state.modalIsOpen
    });
}

  // function toggles modal
  toggleUpdateModal = () => {
    this.setState({
      updateModalIsOpen: ! this.state.updateModalIsOpen
    });
}

  // function sets state of update modal
  setModal = (data, event) => {
    this.setState({
      OrderLineID: data.OrderLineID,
      OrderID: data.OrderID,
      ProductID: data.ProductID,
      QTY: data.QTY,
      _id: data._id
    });

    this.toggleUpdateModal();

}

  render() {

    console.log('State: ', this.state);

    return(

      <div>

<Container>
  <Modal isOpen={this.state.modalIsOpen}>
    <ModalHeader toggle={this.toggleModal.bind(this)}>
      Order Lines
    </ModalHeader>
    <ModalBody>
    <div className="add">
          <div className="banner"><h4>Add an Order Line</h4></div>
            <div className="add-body">
            <form onSubmit={this.submit}>
              <div className="form-input">
                      <input
                        type="text"
                        name="OrderLineID"
                        value={this.state.OrderLineID}
                        placeholder="Order Line ID"
                        onChange={this.handleChange}
                      /> 
                    </div>
                    <div className="form-input">
                      <input
                        type="text"
                        name="OrderID"
                        value={this.state.OrderID}
                        placeholder="Order ID"
                        onChange={this.handleChange}
                      /> 
                    </div>
                    <div className="form-input">
                      <input
                        type="text"
                        name="ProductID"
                        value={this.state.ProductID}
                        placeholder="Product ID"
                        onChange={this.handleChange}
                      /> 
                    </div>
                    <div className="form-input">
                      <input
                        type="text"
                        name="QTY"
                        value={this.state.QTY}
                        placeholder="QTY"
                        onChange={this.handleChange}
                      /> 
                    </div>
              <button>Add</button>
            </form>
        </div>
        </div>
    </ModalBody>
  </Modal>
</Container>

<Container>
  <Modal isOpen={this.state.updateModalIsOpen}>
    <ModalHeader toggle={this.toggleUpdateModal.bind(this)}>
      Order Lines
    </ModalHeader>
    <ModalBody>
    <div className="update update-order-line">
          <div className="banner"><h4>Update Line</h4></div>
            <div className="add-body">
            <form onSubmit={this.update}>
            <div className="form-input">
                <input
                  type="text"
                  name="_id"
                  value={this.state._id}
                  placeholder="Unique Document ID"
                  onChange={this.handleChange}
                /> 
              </div>
              <div className="form-input">
                      <input
                        type="text"
                        name="OrderLineID"
                        value={this.state.OrderLineID}
                        placeholder="Order Line ID"
                        onChange={this.handleChange}
                      /> 
                    </div>
                    <div className="form-input">
                      <input
                        type="text"
                        name="OrderID"
                        value={this.state.OrderID}
                        placeholder="Order ID"
                        onChange={this.handleChange}
                      /> 
                    </div>
                    <div className="form-input">
                      <input
                        type="text"
                        name="ProductID"
                        value={this.state.ProductID}
                        placeholder="Product ID"
                        onChange={this.handleChange}
                      /> 
                    </div>
                    <div className="form-input">
                      <input
                        type="text"
                        name="QTY"
                        value={this.state.QTY}
                        placeholder="QTY"
                        onChange={this.handleChange}
                      /> 
                    </div>
              <button type="button" onClick={this.update.bind(this, this.state)}>Update</button>
            </form>
        </div>
        </div>
    </ModalBody>
  </Modal>
</Container>


      <div className="dummy-links">
      <i className="fa fa-download icons" onClick={this.bannerClick.bind(this, "download")}></i>
        <i className="fa fa-bell icons" onClick={this.bannerClick.bind(this, "bell")}></i>
        <i className="fa fa-print icons" onClick={this.bannerClick.bind(this, "print")}></i>
        <i className="fa fa-bookmark icons" onClick={this.bannerClick.bind(this, "bookmark")}></i>
        <i className="fa fa-database icons" onClick={this.bannerClick.bind(this, "database")}></i>
        <i className="fa fa-pause icons" onClick={this.bannerClick.bind(this,"pause")}></i>
        <i className="fa fa-search icons" onClick={this.bannerClick.bind(this, "search")}></i>
        <i className="fa fa-sort icons" onClick={this.bannerClick.bind(this, "sort")}></i>
        <i className="fa fa-plus icons" type="button" onClick={this.toggleModal}></i>
      </div> 

      <div className="main-container">
        <div className="banner"><h1>Order Lines</h1></div>
          <br></br>
        <div className="bin-posts">
          {this.displayOrderLinePosts(this.state.posts)}
        </div>

    </div>
    </div>

    );
  }
}

export default OrderLine;
