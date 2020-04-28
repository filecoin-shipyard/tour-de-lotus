import React, { useEffect, useState } from 'react'
import { yellow as theme } from 'mdx-deck/themes'
import Provider from 'mdx-deck/dist/Provider'
import { useImmer } from 'use-immer'
import produce from 'immer'

export const TourContext = React.createContext()

let initialState
const initialStateJson = localStorage.getItem('state')
try {
  initialState = JSON.parse(initialStateJson) || {}
} catch (e) {
  initialState = {}
}

function CustomProvider (props) {
  const [tourState, updateTourState] = useImmer(initialState)
  const [savedState, setSavedState] = useState()
  const { index } = props

  useEffect(() => {
    updateTourState(draft => { draft.index = index })
  }, [index])

  useEffect(() => {
    const stateToSave = produce(tourState, draft => {
      delete draft.capture
      delete draft.timer
      delete draft.stream
    })
    if (stateToSave !== savedState) {
      localStorage.setItem('state', JSON.stringify(stateToSave))
      setSavedState(stateToSave)
    }
  }, [tourState])

  useEffect(() => {
    function tick () {
      updateTourState(draft => { draft.timer = Date.now() })
      setTimeout(tick, 1000)
    }
    tick()
  }, [])

  return (
    <TourContext.Provider value={{tourState, updateTourState}}>
      <Provider {...props} />
    </TourContext.Provider>
  )
}

export default {
  ...theme,
  Provider: CustomProvider
}
