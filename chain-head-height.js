() => {
  const [height, setHeight] = useState()
  const [started, setStarted] = useState()

  useEffect(() => {
    let state = { canceled: false }
    if (!started) return
    setHeight('Loading...')
    ;(async function run () {
      const result = await client.chainHead()
      setHeight(result.Height)
      if (!state.canceled) setTimeout(run, 1000)
    })()
    return () => {
      state.canceled = true
    }
  }, [started])

  return (
    <div>
      <h2>Height</h2>
      <h1>{height}</h1>
      {!started && <button onClick={() => setStarted(true)}>Start</button>}
    </div>
  )
}
