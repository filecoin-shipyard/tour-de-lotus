export default function (code) {
  return `
    const LiveCode = ${code};

    render(
      <TourContext.Consumer>
        {tourContext => (
          <LiveCode tourContext={tourContext} />
        )}
      </TourContext.Consumer>
    )
  `
}