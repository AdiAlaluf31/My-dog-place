import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  destination:''
};

export const SearchContext = createContext();
const SearchReducer = (state, action) => {
  console.log('action',action);


  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
return (
    <SearchContext.Provider
      value={{
        city: state.destination,
        dates: state.dates,
        options: state.options,
        destination: state.destination,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
