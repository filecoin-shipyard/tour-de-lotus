import produce from 'immer'

export const initialState = {}

export default function reducer (state, action) {
  switch (action.type) {
    case 'setIndex':
      return produce(state, draft => {
        draft.index = action.index
      })
    case 'setCapture':
      return produce(state, draft => {
        draft.capture = action.capture
        delete draft.cid
      })
    case 'setTimer':
      return produce(state, draft => {
        draft.timer = action.timer
      })
    case 'setStream':
      return produce(state, draft => {
        draft.stream = action.stream
      })
    case 'setCid':
      return produce(state, draft => {
        draft.cid = action.cid
      })
    default:
      throw new Error()
  }
}
