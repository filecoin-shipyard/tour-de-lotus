import React, { useEffect, useReducer } from 'react'
import { yellow as theme } from 'mdx-deck/themes'
import Provider from 'mdx-deck/dist/Provider'
import { useImmer } from 'use-immer'
import reducer, { initialState } from './reducer'

export const TourContext = React.createContext()

const globalState = {}

function CustomProvider (props) {
  const [tourContext, updateTourContext] = useImmer({ state: {} })
  const [tourState, tourDispatch] = useReducer(reducer, initialState)
  const { index } = props

  globalState.tourState = tourState

  useEffect(() => {
    updateTourContext(draft => {
      draft.index = index
      draft.state = globalState
      draft.tourDispatch = tourDispatch
    })
  }, [index, tourState])
  console.log('Jim tourContext', tourContext)

  return (
    <TourContext.Provider value={tourContext}>
      <Provider {...props} />
    </TourContext.Provider>
  )
}

export default {
  ...theme,
  Provider: CustomProvider
}
