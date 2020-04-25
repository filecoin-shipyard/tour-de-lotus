({ tourState, tourDispatch }) => {
  const videoRef = useRef()
  const canvasRef = useRef()
  const photoRef = useRef()
  const [opened, setOpened] = useState()
  const [height, setHeight] = useState(75)
  const [objectUrlAttribute, setObjectUrlAttribute] = useState()
  const width = 100
  const stream = tourState.stream

  useEffect(() => {
    console.log('Jim1 started')
    return () => {
      console.trace('Jim1 ended')
    }
  }, [])

  const canPlay = useCallback(ev => {
    console.log('Jim canPlay 1')
    const video = videoRef.current
    console.log('canplay', ev, video.videoWidth, video.videoHeight)
    const height = video.videoHeight / (video.videoWidth / width)
    setHeight(height)
  }, [])

  const wrappedVideoRef = useCallback(node => {
    if (videoRef.current) {
      videoRef.current.removeEventListener('canplay', canPlay)
      videoRef.current = null
    }
    if (node) {
      videoRef.current = node
      node.addEventListener('canplay', canPlay)
    }
  }, [])

  useEffect(() => {
    console.log('Jim tourState.capture 1')
    if (tourState.capture && tourState.capture.blob) {
      const objectUrl = URL.createObjectURL(tourState.capture.blob)
      setObjectUrlAttribute({ src: objectUrl })
      return () => {
        setObjectUrlAttribute(null)
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [tourState.capture])

  useEffect(() => {
    function checkClose () {
      console.log('Jim check close webcam', tourState.index, slideIndex, opened, stream)
      if (stream && tourState.index !== slideIndex) {
        console.log('Jim close webcam')
        stream.getTracks().forEach(track => track.stop())
        tourDispatch({ type: 'setStream', stream: null })
        setOpened(false)
      }
    }
    checkClose()
    return checkClose
  }, [tourState.index, opened, stream])

  let sizePanel
  if (tourState.capture && tourState.capture.blob) {
    sizePanel = <span>{tourState.capture.blob.size} bytes</span>
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
      <h2 style={{marginBottom: '1rem'}}>Capture</h2>
      <div style={{ border: '1px solid green', height: height + 2 }}>
      <video
        ref={wrappedVideoRef}
        autoPlay
        playsInline
        width={width}
        height={height}
      ></video>
      </div>
      <canvas
        ref={canvasRef}
        style={{ display: 'none', border: '1px solid blue', height: '30vh' }}
        width={width}
        height={height}
      />
      {!opened && (
        <button
          onClick={open}
          style={{ width: '10rem', minHeight: '2rem', fontSize: 'large', margin: '1rem' }}
        >
          Open camera
        </button>
      )}
      {opened && (
        <button
          onClick={capture}
          style={{ width: '10rem', minHeight: '2rem', fontSize: 'large', margin: '1rem' }}
        >
          Take Picture
        </button>
      )}
      <div style={{ border: '1px solid black', height: height + 2 }}>
        <img
          ref={photoRef}
          width={width}
          height={height}
          {...objectUrlAttribute}
        />
      </div>
      <div>{sizePanel}</div>
    </div>
  )

  async function open () {
    constraints = {
      audio: false,
      video: true
    }
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    const videoTracks = stream.getVideoTracks()
    console.log('Got stream with constraints:', constraints)
    console.log(`Using video device: ${videoTracks[0].label}`)
    videoRef.current.srcObject = stream
    tourDispatch({ type: 'setStream', stream })
    setOpened(true)
  }

  async function capture () {
    console.log('Capture!')
    var context = canvasRef.current.getContext('2d')
    context.drawImage(videoRef.current, 0, 0, width, height)
    const maxSize = 2000
    let quality
    for (quality = 0.95; quality > 0; quality -= 0.05) {
      console.log('Quality', quality)
      const promise = new Promise((resolve, reject) => {
        canvasRef.current.toBlob(
          blob => {
            console.log('Blob', quality, blob)
            resolve(blob)
          },
          'image/jpeg',
          quality
        )
      })
      const blob = await promise
      if (blob.size <= maxSize) {
        console.log('Found:', quality, blob)
        tourDispatch({
          type: 'setCapture',
          capture: {
            quality,
            blob
          }
        })
        break
      }
    }
  }
}
