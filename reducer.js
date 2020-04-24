export const initialState = {}

export default function reducer (state, action) {
  switch (action.type) {
    case 'setCapture':
      console.log('reducer setCapture', action)
      return {
        ...state,
        capture: action.capture
      }
    default:
      throw new Error()
  }
}
