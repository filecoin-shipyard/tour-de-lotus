import React, { useEffect, useReducer } from 'react'
import { yellow as theme } from 'mdx-deck/themes'
import Provider from 'mdx-deck/dist/Provider'
import reducer, { initialState } from './reducer'

export const TourContext = React.createContext()

function CustomProvider (props) {
  const [tourState, tourDispatch] = useReducer(reducer, initialState)
  const { index } = props

  useEffect(() => {
    tourDispatch({ type: 'setIndex', index })
  }, [index])

  useEffect(() => {
    function tick () {
      tourDispatch({ type: 'setTimer', timer: Date.now() })
      setTimeout(tick, 1000)
    }
    tick()
  }, [])

  return (
    <TourContext.Provider value={{tourState, tourDispatch}}>
      <Provider {...props} />
    </TourContext.Provider>
  )
}

export default {
  ...theme,
  Provider: CustomProvider
}
