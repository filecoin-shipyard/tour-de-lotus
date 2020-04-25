({ tourState }) => {
  const [height, setHeight] = useState()

  useEffect(() => {
    let state = { canceled: false }
    if (tourState.index !== slideIndex) return
    setHeight('Loading...')
    ;(async function run () {
      if (state.canceled) return
      const result = await client.chainHead()
      if (state.canceled) return
      setHeight(result.Height)
      setTimeout(run, 1000)
    })()
    return () => { state.canceled = true }
  }, [tourState.index])

  return (
    <div>
      <h2>Height</h2>
      <h1>{height}</h1>
    </div>
  )
}
