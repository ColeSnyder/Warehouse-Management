import React from 'react';

import './App.css';

class Banner extends React.Component {

  render() {

    

    console.log('State: ', this.state);

    return(
    
<div className="dummy-links">
        <i className="fa fa-download icons"></i>
        <i className="fa fa-bell icons"></i>
        <i className="fa fa-print icons"></i>
        <i className="fa fa-bookmark icons"></i>
        <i className="fa fa-database icons"></i>
        <i className="fa fa-pause icons"></i>
        <i className="fa fa-stop icons"></i>
        <i className="fa fa-plus icons" onClick={this.addModal}></i>
</div>


    );
  }
}

export default Banner;
