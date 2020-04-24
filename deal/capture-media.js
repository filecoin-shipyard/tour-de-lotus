() => {
  const videoRef = useRef()
  const canvasRef = useRef()
  const photoRef = useRef()
  const [opened, setOpened] = useState()
  const [height, setHeight] = useState(100)
  const [objectUrlAttribute, setObjectUrlAttribute] = useState()
  const width = 100

  useEffect(() => {
    console.log('Jim videoRef.current 1', videoRef)
    const video = videoRef.current
    video.addEventListener('canplay', ev => {
      console.log('canplay', ev, video.videoWidth, video.videoHeight)
      const height = video.videoHeight / (video.videoWidth / width)
      setHeight(height)
    })
  }, [videoRef.current])

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
  }, [tourState.capture])

  console.log('Jim render')

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h2>Capture</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ height: '30vh' }}
        width={width}
        height={height}
      ></video>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', border: '1px solid green', height: '30vh' }}
        width={width}
        height={height}
      />
      <img
        ref={photoRef}
        style={{ display: 'none', border: '1px solid red', height: '30vh' }}
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

    /*
    var data = canvasRef.current.toDataURL('image/png')
    photoRef.current.setAttribute('src', data)
    */
  }
}
