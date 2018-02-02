import React, { Component } from 'react';
import './marker.css';
import '../../css/common.css';

export default class extends Component {
  
  render() {
    const styles = {
      modal: {
        opacity: this.props.modalOn ? 1: 0,
        backgroundColor: '#FFF', 
        borderRadius: 10,
        padding: 15
      },
    };
    return (
      
      <div style={styles.modal} 
      className="marker-modal column-flex-container">
        <span>wooow</span>
      </div>
    )
  }
}

// const 