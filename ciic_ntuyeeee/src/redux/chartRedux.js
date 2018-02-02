import '../util';
import { keyToLoc, expAvg, tdsExpAvg } from '../util';
const types = {
  FETCH_INIT: 'FETCH_INIT',
  FETCH_DATA: 'FETCH_DATA',
  FETCH_FAIL: 'FETCH_FAIL',
  HIDE_MODAL: 'HIDE_MODAL',
  OPEN_MODAL: 'OPEN_MODAL',
  KEY_CHANGE: 'KEY_CHANGE'
};

const FETCH_URL = 'https://ntuyeeee.firebaseio.com/';
const TABLE = '/water.json';
export const chartActionCreators = {
  getData: (loc) => {
    return async (dispatch) => {
      dispatch({type: types.FETCH_INIT});
      const url = FETCH_URL + loc + TABLE;
      await fetch(url).then((res) => res.json())
      .then((data) => {
        data = Object.values(data).map(item => ([item['time'], item['TDS']]))
        data = tdsExpAvg(data, 0.3);
        dispatch({type: types.FETCH_DATA, payload: data});
        dispatch({type: types.OPEN_MODAL});
      })
      .catch((e) => {
        console.log('error');
        dispatch({type: types.FETCH_FAIL});
      })
    }
  },
  hideModal: () => {
    return async (dispatch) => {
      dispatch({type: types.HIDE_MODAL});
    }
  },
  changeKey: (key) => {
    return { type: types.KEY_CHANGE, payload: key};
  }
};

const initialState = {data: [], modalOpen: false, key: 'A'};
const reducer = (state=initialState, action) => {
  const {type, payload} = action;
  switch(type) {
    case types.FETCH_INIT:
      return {...state, modalOpen: false};
    case types.FETCH_DATA:
      return {...state, data: payload};
    case types.FETCH_FAIL:
      return {...state, modalOpen: false};
    case types.HIDE_MODAL:
      return {...state, modalOpen: false};
    case types.OPEN_MODAL:
      return {...state, modalOpen: true};
    case types.KEY_CHANGE:
      return {...state, key: payload};
    default:
      return state;
  }
}

export default reducer;