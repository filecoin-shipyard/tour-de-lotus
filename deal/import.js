({ tourState, tourDispatch }) => {
  const [objectUrlAttribute, setObjectUrlAttribute] = useState()
  let width = 100
  let height = 75

  useEffect(() => {
    if (tourState.capture && tourState.capture.blob) {
      const objectUrl = URL.createObjectURL(tourState.capture.blob)
      setObjectUrlAttribute({ src: objectUrl })
      return () => {
        setObjectUrlAttribute(null)
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [tourState.capture])

  let sizePanel
  if (tourState.capture && tourState.capture.blob) {
    sizePanel = <span>{tourState.capture.blob.size} bytes</span>
    width = tourState.capture.width
    height = tourState.capture.height
  } else {
    sizePanel = <span>No picture taken yet</span>
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '90vh',
        justifyContent: 'space-around'
      }}
    >
      <h2 style={{marginBottom: '1rem'}}>Import</h2>
      <div style={{ border: '1px solid black', height: height + 2 }}>
        <img
          width={width}
          height={height}
          {...objectUrlAttribute}
        />
      </div>
      <div>{sizePanel}</div>
    </div>
  )
}
