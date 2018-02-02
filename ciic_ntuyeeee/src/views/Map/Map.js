import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import ChartModal from './ChartModal';
import controllable from 'react-controllables';
import { connect } from 'react-redux';
import Marker, {K_SIZE} from './Marker';
import { chartActionCreators } from '../../redux/chartRedux';
import { keyToLoc, generateLoc } from '../../util';
import '../../css/common.css';

const mapStateToProps = (state) => ({
  data: state.data, 
  modalOpen: state.modalOpen,
})

@controllable(['center', 'zoom', 'hoverKey','clickKey', 'markers'])
class Map extends Component {
	static propTypes = {
    center: PropTypes.array, // @controllable
    zoom: PropTypes.number, // @controllable
    hoverKey: PropTypes.string, // @controllable
    clickKey: PropTypes.string, // @controllable
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onHoverKeyChange: PropTypes.func, // @controllable generated fn

    greatPlaces: PropTypes.array
  };
  
  static defaultProps = {
    center: [14.1, 100.61],
    zoom: 9,
    greatPlaces: generateLoc(13, 16, 99, 102, 100)
    // greatPlaces: [
    //   { id: '1', lat: 13.737, lng: 100.52},
    //   { id: '2', lat: 14.51, lng: 100.74},
    //   { id: '3', lat: 14.39, lng: 99.54},
    // ]
  };
  
  shouldComponentUpdate = shouldPureComponentUpdate;

	_onBoundsChange = (center, zoom /* , bounds, marginBounds */) => {
    this.props.onCenterChange(center);
    this.props.onZoomChange(zoom);
	}
	_onChildClick = (key, childProps) => {
    // this.props.onCenterChange([childProps.lat, childProps.lng]);
    
    this.props.onClickKeyChange(key);
    const { dispatch, clickKey } = this.props;
    // dispatch(chartActionCreators.changeKey(key));
    if(key) {
      dispatch(chartActionCreators.getData(keyToLoc(key)));
    }
  }

  _onChildMouseEnter = (key , childProps) => {
    this.props.onHoverKeyChange(key);
  }

  _onChildMouseLeave = (/* key, childProps */) => {
    this.props.onHoverKeyChange(null);
  }
  distanceToMouse = ({ x, y }, { x: mouseX, y: mouseY }) => {
    return Math.sqrt((x - mouseX) * (x - mouseX) + (y - mouseY) * (y - mouseY))
  }

	renderMarker = (place) => {
    const {id, ...coords} = place;
		return (
			<Marker
        key={id}
        {...coords}
        text={id}
        hover={this.props.hoverKey === id}/>
		)
	}
  render() {
    const { dispatch } = this.props;
    const KEY = 'AIzaSyAdBUDwlHHpU00vOvWhMM89Fa8rvc9rJA8';
    // console.log(this.props.data);
    return (
      <div>
        <GoogleMapReact style={{position: 'absolute', height: '75vh', width: '75%'}}
          bootstrapURLKeys={{key: KEY, language: 'en', region: 'ch'}}
          center={this.props.center}
          zoom={this.props.zoom}
          hoverDistance={K_SIZE / 2} 
          distanceToMouse={this.distanceToMouse}
          onChange={this._onBoundsChange}
          onChildClick={this._onChildClick}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}>
          
          {this.props.greatPlaces.map(this.renderMarker)}
				
        </GoogleMapReact>
      <ChartModal 
          modalKey={this.props.clickKey} 
          modalOpen={this.props.modalOpen} 
          // onOpen={this.fetchData(FETCH_URL)}
          hideModal={() => dispatch(chartActionCreators.hideModal())}
          data={this.props.data}/>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Map);

