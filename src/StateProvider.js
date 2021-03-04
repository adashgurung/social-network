// these are just few import statements
import React, { createContext, useContext, useReducer } from "react";

//state provider
//every componenets can get access to the dataLayer

export const StateContext = createContext(); // this prepares/creates the dataLayer (API conetxt/Reedux)

//High order component
//set up everything and wrap our app and provide the dataLayer to every component in our app
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// pull information from the dataLayer
export const useStateValue = () => useContext(StateContext);
//FACEBOOK_CLONE time 3:10:00
