({ tourState }) => {
  const [miners, setMiners] = useState()

  const annotations = {
    't02271': '@jimpick home iMac',
    't02284': '@jimpick AWS'
  }

  useEffect(() => {
    let state = { canceled: false }
    if (tourState.index !== slideIndex) return
    ;(async function run () {
      if (state.canceled) return
      const result = await client.stateListMiners([])
      if (state.canceled) return
      setMiners(result.sort())
    })()
    return () => {
      state.canceled = true
    }
  }, [tourState.index])

  let content
  if (!miners) {
    content = 'Loading...'
  } else {
    content = (
      <>
        <div>{miners.length} miners</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '60%',
            overflow: 'scroll',
            height: '60vh'
          }}
        >
          <ul style={{ textAlign: 'left' }}>
            {miners.filter(miner => annotations[miner]).map(miner => (
              <li key={miner}>{miner} {annotations[miner]}</li>
            ))}
            {miners.filter(miner => !annotations[miner]).map(miner => (
              <li key={miner}>{miner}</li>
            ))}
          </ul>
        </div>
      </>
    )
  }
  return (
    <div>
      <h2>StateListMiners</h2>
      {content}
    </div>
  )
}
