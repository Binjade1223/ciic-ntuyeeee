import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './marker.css';

export default class extends Component {
  
  render() {
    
    // const colors = ['#FFB300', '#FB8C00', '#F4511E'];
    // console.log(this.props.text, this.props.color);
    const style = this.props.$hover ? greatPlaceStyleHover : greatPlaceStyle;
    // const finalStyle = Object.assign({}, style, {borderColor: colors[Math.floor(Math.random() * 3)]})
    return (
      <div>
        <div style={style} className="marker-circle"/>
      </div>
);
  }
}

export const K_SIZE = 30;
export const L_SIZE = 50;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,
  border: '5px solid #FFB300',
  borderRadius: K_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer'
};

const greatPlaceStyleHover = {
  ...greatPlaceStyle,
  width: L_SIZE,
  height: L_SIZE,
  left: -L_SIZE / 2,
  top: -L_SIZE / 2,
  border: '5px solid #3f51b5',
  color: '#f44336'
};



