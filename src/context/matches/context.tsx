import { createContext, useContext, useReducer } from "react";
import { MatchesState, MatchesActions } from "./types";
import { reducer } from "./reducer";
import { initialState } from "./initialData";
import React from "react";

// match context
const MatchesStateContext = createContext<MatchesState>(initialState);
const MatchesDispatchContext = createContext<React.Dispatch<MatchesActions> | undefined>(undefined);

export const MatchesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MatchesStateContext.Provider value={state}>
      <MatchesDispatchContext.Provider value={dispatch}>
        {children}
      </MatchesDispatchContext.Provider>
    </MatchesStateContext.Provider>
  );
};

export const useMatchesState = () => useContext(MatchesStateContext);
export const useMatchesDispatch = () => {
  const context = useContext(MatchesDispatchContext);
  if (context === undefined) {
    throw new Error('useMatchesDispatch must be used within a MatchesProvider');
  }
  return context;
};
