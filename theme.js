import React, { useEffect, useReducer } from 'react'
import { yellow as theme } from 'mdx-deck/themes'
import Provider from 'mdx-deck/dist/Provider'
import { useImmer } from 'use-immer'
import reducer, { initialState } from './reducer'

export const TourContext = React.createContext()

function CustomProvider (props) {
  const [tourContext, updateTourContext] = useImmer({})
  const [tourState, tourDispatch] = useReducer(reducer, initialState)
  const { index } = props

  useEffect(() => {
    updateTourContext(draft => { draft.index = index })
  }, [index])

  return (
    <TourContext.Provider value={{tourContext, tourState, tourDispatch}}>
      <Provider {...props} />
    </TourContext.Provider>
  )
}

export default {
  ...theme,
  Provider: CustomProvider
}
