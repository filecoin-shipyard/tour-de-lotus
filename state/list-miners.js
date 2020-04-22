() => {
  const [miners, setMiners] = useState()

  useEffect(() => {
    let state = { canceled: false }
    if (tourContext.index !== slideIndex) return
    ;(async function run () {
      if (state.canceled) return
      const result = await client.stateListMiners([])
      if (state.canceled) return
      setMiners(result.sort())
    })()
    return () => { state.canceled = true }
  }, [tourContext.index])

  let content
  if (!miners) {
    content = 'Loading...'
  } else {
    content = <ul>
      {miners.map(miner => <li key={miner}>{miner}</li>)}
    </ul>
  }
  return (
    <div>
      <h2>StateListMiners</h2>
      {content}
    </div>
  )
}
