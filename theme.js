import React, { useEffect } from 'react'
import { yellow as theme } from 'mdx-deck/themes'
import Provider from 'mdx-deck/dist/Provider'
import { useImmer } from 'use-immer'

export const TourContext = React.createContext()

function CustomProvider (props) {
  const [tourState, updateTourState] = useImmer({})
  const { index } = props

  useEffect(() => {
    updateTourState(draft => { draft.index = index })
  }, [index])

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
