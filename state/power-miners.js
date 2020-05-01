({ tourState }) => {
  const miners = useMiners(client)
  const [minerPower, updateMinerPower] = useImmer({})

  useEffect(() => {
    let state = { canceled: false }
    if (tourState.index !== slideIndex) return
    if (!miners) return
    ;(async function run () {
      if (state.canceled) return
      for (const miner of miners) {
        // await fails here due to buble
        client.stateMinerPower(miner, []).then(result => {
          if (state.canceled) return
          updateMinerPower(draft => {
            draft[miner] = result.MinerPower
            draft['total'] = result.TotalPower
          })
        })
      }
    })()
    return () => {
      state.canceled = true
    }
  }, [tourState.index, miners])

  return (
    <div>
      <h3>StateListMiners + StateMinerPower</h3>
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
          {miners &&
            miners.map(miner => (
              <li key={miner}>
                {miner}:{' '}
                {minerPower[miner] && minerPower[miner].QualityAdjPower}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
