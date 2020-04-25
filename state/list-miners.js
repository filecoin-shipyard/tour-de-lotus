({ tourState }) => {
  const [miners, setMiners] = useState()

  useEffect(() => {
    let state = { canceled: false }
    if (tourState.index !== slideIndex) return
    ;(async function run () {
      if (state.canceled) return
      const result = await client.stateListMiners([])
      if (state.canceled) return
      setMiners(result.sort())
    })()
    return () => { state.canceled = true }
  }, [tourState.index])

  let content
  if (!miners) {
    content = 'Loading...'
  } else {
    content = (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <ul style={{textAlign: 'left'}}>
          {miners.map(miner => <li key={miner}>{miner}</li>)}
        </ul>
      </div>
    )
  }
  return (
    <div>
      <h2>StateListMiners</h2>
      {content}
    </div>
  )
}
