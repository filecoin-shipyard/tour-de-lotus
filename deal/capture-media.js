({ tourContext }) => {
  const videoRef = useRef()
  const canvasRef = useRef()
  const photoRef = useRef()
  const [opened, setOpened] = useState()
  const [height, setHeight] = useState(100)
  const [objectUrlAttribute, setObjectUrlAttribute] = useState()
  const width = 100

  console.log('Jim render capture')

  useEffect(() => {
    console.log('Jim useEffect begin')
    return () => {
      console.log('Jim useEffect cleanup')
    }
  }, [])

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h2>Capture</h2>
        {tourContext.timer}
    </div>
  )

}
