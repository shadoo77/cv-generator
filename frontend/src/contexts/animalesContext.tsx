import React, { createContext, useState, useCallback } from 'react';

interface IState {
  imageSrc?: string,
  isLoading?: boolean,
  hasFailed?: boolean,
  hasSubmitted?: boolean,
  errorMessage?: string,
}

interface IAnimalesContext extends IState {
  stateUpdater: (obj: any) => void,
  resetState: React.DispatchWithoutAction,
  setState: (obj: any) => void
}

export const initialState = {
  imageSrc: '',
  isLoading: false,
  hasFailed: false,
  hasSubmitted: false,
  errorMessage: ''
};

const AnimalesContext = createContext<IAnimalesContext | undefined>(undefined);

export function AnimalesProvider(props: any) {
  const [state, setState] = useState(initialState);

  const resetState = useCallback(
    () => {
      setState(initialState);
    }, []
  );

  const stateUpdater = (obj: IState) => {
    setState({
      ...state,
      ...obj
    });
  };

  return (
    <AnimalesContext.Provider
      value={{
        ...state,
        stateUpdater,
        resetState,
        setState
      }}
    >
      {props.children}
    </AnimalesContext.Provider>
  );
}

export function useAnimales() {
  const context = React.useContext(AnimalesContext);
  if (context === undefined) {
    throw new Error('useAnimales must be used within a AnimalesProvider');
  }
  return context;
}
