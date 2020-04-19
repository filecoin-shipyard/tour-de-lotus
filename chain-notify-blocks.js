() => {
  const [height, setHeight] = useState()

  useEffect(() => {
    if (!client) return
    const cancelFunc = client.chainNotify(changes => {
      console.log('Jim changes', changes)
      for (const change of changes) {
        const {
          Type: changeType,
          Val: val
        } = change
        const { Height: height } = val
        console.log(
          `Time: ${new Date()} Type: ${changeType} Height: ${height}`, val
        )
        if (changeType === 'current' || changeType === 'apply') {
          setHeight(height)
        }
      }
    })
    return cancelFunc
  }, [client])

  let content
  if (!height) {
    content = 'Loading...'
  } else {
    content = (
      <div>{height}</div>
    )
  }
  return (
    <div>
      <h2>ChainNotify</h2>
      {content}
    </div>
  )
}
