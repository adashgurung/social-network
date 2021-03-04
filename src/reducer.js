export const initialState = {
  //declaring state variable here
  user: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  //console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER: // when we get this type
      return {
        ...state, //return everything thats inside current state
        user: action.user, // and update the user
      };
    default:
      return state; //return default state
  }
};
export default reducer;
