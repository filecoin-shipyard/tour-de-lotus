import React, { useEffect } from 'react'
import { yellow as theme } from 'mdx-deck/themes'
import Provider from 'mdx-deck/dist/Provider'
import { useImmer } from 'use-immer'

export const TourContext = React.createContext()

function CustomProvider (props) {
  const [tourContext, updateTourContext] = useImmer({})
  const { index } = props

  useEffect(() => {
    updateTourContext(draft => { draft.index = index })
  }, [index])

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
