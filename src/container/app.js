import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScatterApp from '../components/scatter_app';
import '../style/scatter_app.css';

const App = (props) =>{
  return(
    <div>
      <ScatterApp/>
      </div>
    )
}


function mapStateToProps(state, ownProps) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
