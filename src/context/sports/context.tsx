import React, { createContext, useContext, useReducer } from "react";

import { reducer, SportState, SportsActions } from "./reducer";
import { initialState } from "./initialData";
const SportStateContext = createContext<SportState | undefined>(undefined);

type SportDispatch = React.Dispatch<SportsActions>;
const SportDispatchContext = createContext<SportDispatch | undefined>(
  undefined
);

export const SportProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SportStateContext.Provider value={state}>
      <SportDispatchContext.Provider value={dispatch}>
        {children}
      </SportDispatchContext.Provider>
    </SportStateContext.Provider>
  );
};

export const useSportState = () => useContext(SportStateContext);

export const useSportDispatch = () => useContext(SportDispatchContext);
