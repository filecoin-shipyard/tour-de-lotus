export default function (code) {
  return `
    const LiveCode = ${code};

    render(
      <TourContext.Consumer>
        {tourState => (
          <LiveCode tourState={tourState} />
        )}
      </TourContext.Consumer>
    )
  `
}