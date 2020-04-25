({ tourState, tourDispatch }) => {
  const videoRef = useRef()
  const canvasRef = useRef()
  const photoRef = useRef()
  const [opened, setOpened] = useState()
  const [height, setHeight] = useState(100)
  const [objectUrlAttribute, setObjectUrlAttribute] = useState()
  const width = 100

  const canPlay = useCallback(ev => {
    const video = videoRef.current
    console.log('canplay', ev, video.videoWidth, video.videoHeight)
    const height = video.videoHeight / (video.videoWidth / width)
    setHeight(height)
  }, [])

  const wrappedVideoRef = useCallback(node => {
    console.log('Jim wrappedVideoRef', node)
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
    console.log('Jim tourState.capture 1', tourState)
    if (tourState.capture && tourState.capture.blob) {
      const objectUrl = URL.createObjectURL(tourState.capture.blob)
      setObjectUrlAttribute({src: objectUrl})
      return () => {
        setObjectUrlAttribute(null)
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [tourState])

  console.log('Jim render capture')

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h2>Capture</h2>
      <div>
        {tourState.timer}
      </div>
      <video
        ref={wrappedVideoRef}
        autoPlay
        playsInline
        style={{ height: '15vh' }}
        width={width}
        height={height}
      ></video>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', border: '1px solid green', height: '15vh' }}
        width={width}
        height={height}
      />
      <img
        ref={photoRef}
        style={{ display: 'block', border: '1px solid red', height: '15vh' }}
        {...objectUrlAttribute}
      />
      {!opened && (
        <button
          onClick={open}
          style={{ width: '20vw', height: '10vh', fontSize: 'large' }}
        >
          Open camera
        </button>
      )}
      {opened && <button onClick={capture}>Take Picture</button>}
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
        canvasRef.current.toBlob(blob => {
          console.log('Blob', quality, blob)
          resolve(blob)
        }, 'image/jpeg', quality)
      })
      const blob = await promise
      if (blob.size <= maxSize) {
        console.log('Found:', quality, blob)
        /*
        const objectURL = URL.createObjectURL(blob)
        photoRef.current.setAttribute('src', objectURL)
        */
        tourDispatch({ type: 'setCapture', capture: {
          quality,
          blob
        }})
        break
      }
    }
  }
}
