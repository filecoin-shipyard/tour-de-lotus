({ tourState, updateTourState }) => {
  const miners = useMiners(clientNode)
  const targetMiner = tourState.targetMiner

  const annotations = {
    't02271': '@jimpick home iMac',
    't02284': '@jimpick AWS'
  }

  let content
  if (!miners) {
    content = <div>Loading...</div>
  } else {
    content = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div>Select one to propose a deal with:</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            overflow: 'scroll',
            height: '60vh',
            padding: '0 3rem'
          }}
        >
          <div
            style={{ textAlign: 'left', marginTop: '1rem', fontSize: '60%' }}
          >
            {miners.filter(miner => annotations[miner]).map(miner => (
              <div key={miner}>
                <input
                  type='radio'
                  name='miner'
                  value={miner}
                  checked={miner === targetMiner}
                  onChange={changed}
                />
                {miner} {annotations[miner]}
              </div>
            ))}
            {miners.filter(miner => !annotations[miner]).map(miner => (
              <div key={miner}>
                <input
                  type='radio'
                  name='miner'
                  value={miner}
                  checked={miner === targetMiner}
                  onChange={changed}
                />
                {miner}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <h3>Available Miners</h3>
      {content}
    </div>
  )

  function changed (evt) {
    const targetMiner = evt.currentTarget.value
    updateTourState(draft => {
      draft.targetMiner = targetMiner
    })
  }
}
