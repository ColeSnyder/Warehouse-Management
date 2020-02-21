// Copyright Cole Snyder 2020 
import React from 'react';
import axios from 'axios';
import { Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


import './App.css';

class Order extends React.Component {

  state = {
    OrderID: '',
    OrderNumber: '',
    DateOrdered: '',
    CustomerName: '',
    CustomerAddress: '',
    _id: '',
    posts: [],
    modalIsOpen: false,
    updateModalIsOpen: false
  };

  componentDidMount = () => {
    this.getOrders();
  };

  getOrders = () => {
    axios.get('/api/orders')
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
        OrderID: this.state.OrderID,
        OrderNumber: this.state.OrderNumber,
        DateOrdered: this.state.DateOrdered,
        CustomerName: this.state.CustomerName,
        CustomerAddress: this.state.CustomerAddress
    };

    axios({
      url: 'https://mernwarehouse.herokuapp.com/api/saveOrder',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getOrders();
      })
      .catch(() => {
        console.log('Internal server error');
      });
      this.getOrders();
      this.setState({
        modalIsOpen: ! this.state.modalIsOpen
      });
  };

  delete = (data, event) => {
    event.preventDefault();

    console.log('Data before sending to server: ', data._id);

    axios({
      url: 'https://mernwarehouse.herokuapp.com/api/deleteOrder/' + data._id,
      method: 'POST',
      data: data._id
    })
      .then(() => {
        console.log('Data has been sent to the server');
      })
      .catch(() => {
        console.log('Internal server error');
      });
      this.getOrders();
  };

  update = (data, event) => {
    event.preventDefault();

    const payload = {
      OrderID: this.state.OrderID,
      OrderNumber: this.state.OrderNumber,
      DateOrdered: this.state.DateOrdered,
      CustomerName: this.state.CustomerName,
      CustomerAddress: this.state.CustomerAddress,
      _id: this.state._id
    };

    axios({
      url: 'https://mernwarehouse.herokuapp.com/api/updateOrder/' + data._id + '/' + data.OrderID + '/' + data.OrderNumber + '/' + data.DateOrdered + '/' + data.CustomerName + '/' + data.CustomerAddress,
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
      this.getOrders();
      this.setState({
        updateModalIsOpen: ! this.state.updateModalIsOpen
      });
  };

  resetUserInputs = () => {
    this.setState({
        OrderID: '',
        OrderNumber: '',
        DateOrdered: '',
        CustomerName: '',
        CustomerAddress: '',
        _id: ''
    });
  };

  displayOrderPosts = (posts) => {

    if (!posts.length) return null;

    return posts.map((post, index) => (

      <ul>
        <li>
          <div className="container">
            <div className="row db-item"> 
              <div className="col-2 item-comp">
                <h5><strong>Order ID:</strong> {post.OrderID}</h5>
              </div>
              <div className="col-1 item-comp">
                <p><strong>Order Number:</strong> {post.OrderNumber}</p>
              </div>
              <div className="col-1 item-comp">
                <p><strong>Date Ordered:</strong> {post.DateOrdered}</p>
              </div>
              <div className="col-2 item-comp">
                <p><strong>Customer Name:</strong> {post.CustomerName}</p>
              </div>
              <div className="col-2 item-comp">
                <p><strong>Customer Address:</strong> {post.CustomerAddress}</p>
              </div>
              <div className="col-3 item-comp">
                <p><strong>_id:</strong><a className="idClick" onClick={this.setModal.bind(this, post)}>{post._id}</a></p>              
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
      OrderID: data.OrderID,
      OrderNumber: data.OrderNumber,
      DateOrdered: data.DateOrdered,
      CustomerName: data.CustomerName,
      CustomerAddress: data.CustomerAddress,
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
      Orders
    </ModalHeader>
    <ModalBody>
    <div className="add">
          <div className="banner"><h4>Add an Order</h4></div>
            <div className="add-body">
            <form onSubmit={this.submit}>
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
                        name="OrderNumber"
                        value={this.state.OrderNumber}
                        placeholder="Order Number"
                        onChange={this.handleChange}
                      /> 
                    </div>
                    <div className="form-input">
                      <input
                        type="text"
                        name="DateOrdered"
                        value={this.state.DateOrdered}
                        placeholder="Date Ordered"
                        onChange={this.handleChange}
                      /> 
                    </div>
                    <div className="form-input">
                      <input
                        type="text"
                        name="CustomerName"
                        value={this.state.CustomerName}
                        placeholder="Customer Name"
                        onChange={this.handleChange}
                      /> 
                    </div>
                    <div className="form-input">
                      <input
                        type="text"
                        name="CustomerAddress"
                        value={this.state.CustomerAddress}
                        placeholder="Customer Address"
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
      Orders
    </ModalHeader>
    <ModalBody>
    <div className="update update-order">
          <div className="banner"><h4>Update Order</h4></div>
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
                        name="OrderID"
                        value={this.state.OrderID}
                        placeholder="Order ID"
                        onChange={this.handleChange}
                      /> 
                    </div>
                    <div className="form-input">
                      <input
                        type="text"
                        name="OrderNumber"
                        value={this.state.OrderNumber}
                        placeholder="Order Number"
                        onChange={this.handleChange}
                      /> 
                    </div>
                    <div className="form-input">
                      <input
                        type="text"
                        name="DateOrdered"
                        value={this.state.DateOrdered}
                        placeholder="Date Ordered"
                        onChange={this.handleChange}
                      /> 
                    </div>
                    <div className="form-input">
                      <input
                        type="text"
                        name="CustomerName"
                        value={this.state.CustomerName}
                        placeholder="Customer Name"
                        onChange={this.handleChange}
                      /> 
                    </div>
                    <div className="form-input">
                      <input
                        type="text"
                        name="CustomerAddress"
                        value={this.state.CustomerAddress}
                        placeholder="Customer Address"
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
        <div className="banner"><h1>Orders</h1></div>
          <br></br>
        <div className="bin-posts">
          {this.displayOrderPosts(this.state.posts)}
        </div>

    </div>
    </div>
    );
  }
}

export default Order;
