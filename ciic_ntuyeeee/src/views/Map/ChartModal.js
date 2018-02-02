import React, { Component } from 'react';
import { 
  Modal,
  Button, 
  ButtonGroup,
  ButtonToolbar
} from 'react-bootstrap';
import DataChart from './DataChart';
import FlatButton from 'material-ui/FlatButton';
import '../../css/common.css';
export default class extends Component {
  
  render() {
    
    const { modalOpen, hideModal, modalKey, data } = this.props;
    return (
      <Modal show={modalOpen} onHide={hideModal} style={{paddingTop: 100}}>
        <Modal.Header closeButton className="row-flex-container">
          <Modal.Title style={{flex: 1}}>
            <span>TDS Value for station {modalKey}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding: 20, paddingTop: 40, paddingTop: 40}}>
         {/*}
            <div>
              <ButtonToolbar>
                <ButtonGroup>
                  <FlatButton label="TDS"/>
                  <FlatButton label="PH"/>
                </ButtonGroup>
              </ButtonToolbar>
    </div>*/}
            <div>
              <DataChart data={data}/>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <FlatButton label="Close" onClick={hideModal}/>
        </Modal.Footer>
      </Modal>
    )
  }
}