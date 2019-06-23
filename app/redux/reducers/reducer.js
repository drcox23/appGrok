// import { combineReducers } from 'redux';

import { GET_ALL_CARDS, GET_MY_CARD, AUTH_INFO, SCAN_CARD, NO_CARD } from '../actions/actions.js';

// let dataState = { data: [], loading: true };
// let cardState = { data: {}, loading: true };

const reducers = (state = {
  allCards: [],
  myCard: {
    user_id: "",
    data: {},
    style: {
      template: "",
      css: {
        back: {},
        company: {},
        front: {},
        info: {}
      }
    },
    users: [],
    addInfo: {},
    editInfo: {}
  },
  added: false,
  edited: false,
  authInfo: {},
}, action) => {

  switch (action.type) {

    //~~~~ Cases ~~~~//
    case AUTH_INFO:
    const newAuthInfo = {
      isAuthenticated: true,
      user: action.payload
    }
    return {
      ...state,
      authInfo: newAuthInfo
    }

    case NO_CARD:
      let noCard = { ...state.myCard };
      noCard.no_card = true;
      return {
        ...state,
        myCard: noCard
      }

      case GET_ALL_CARDS:
      if (!action.payload) {
        return { ...state }
      } else {
        const newPayload = action.payload.map(card => {
          let parsedAllCss = {};
          for (var key in card.style.css) {
            parsedAllCss[key] = JSON.parse(card.style.css[key])
          }
          let allStyle = { ...card.style, css: parsedAllCss }
          return {
            ...card,
            style: allStyle
          }
        })
        return {
          ...state,
          allCards: newPayload
        }
      }

      case GET_MY_CARD:
      let parsedMyCss = {};
      for (var key in action.payload.style.css) {
        parsedMyCss[key] = JSON.parse(action.payload.style.css[key])
      }
      const myStyle = { ...action.payload.style, css: parsedMyCss };
      const myData = { ...action.payload, style: myStyle };
      return {
        ...state,
        myCard: myData
      }

    case SCAN_CARD:
      return {...state, myCard: myData}


    default:
      return state
  }
}

export default reducers;


//~~~~ MY COMPLICATED WAY ~~~~//

// const dataReducer = (state = dataState, action) => {

//   switch (action.type) {
//     case GET_ALL_CARDS:
//       state = Object.assign({}, state, { data: action.data, loading: false })
//       return state;

//     default:
//       return state
//   }
// };

// const cardReducer = (state = cardState, action) => {
//   switch (action.type) {
//     case GET_CARD:
//       state = Object.assign({}, state, { data: action.data, loading: false })
//       return state;

//     default:
//       return state;
//   }
// }

// // Combine all the reducers
// const rootReducer = combineReducers({
//   dataReducer,
//   cardReducer,
//   //[ANOTHER REDUCER], [ANOTHER REDUCER] ....
// })

// export default rootReducer;