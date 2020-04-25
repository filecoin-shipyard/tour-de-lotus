export default function (code) {
  return `
    const LiveCode = ${code};

    render(
      <TourContext.Consumer>
        {props => <LiveCode {...props} />}
      </TourContext.Consumer>
    )
  `
}