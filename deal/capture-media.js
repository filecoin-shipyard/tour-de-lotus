() => {
  const videoRef = useRef()
  const [opened, setOpened] = useState()
  const [captured, setCaptured] = useState()
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h2>Capture</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ height: '50vh' }}
      ></video>
      {!opened && (
        <button
          onClick={open}
          style={{ width: '20vw', height: '10vh', fontSize: 'large' }}
        >
          Open camera
        </button>
      )}
      {opened && !captured && <button onClick={capture}>Take Picture</button>}
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
  }
}
