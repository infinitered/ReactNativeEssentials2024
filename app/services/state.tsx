import {createContext, useContext} from 'react'

export const GlobalStateContext = createContext({})

export const GlobalStateProvider = () => {
  return null
}

export const useGlobalState = () => useContext(GlobalStateContext)
