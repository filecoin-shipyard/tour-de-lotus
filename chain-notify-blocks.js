({ tourState }) => {
  const [rounds, updateRounds] = useImmer([])
  const lastEl = useRef(null)

  useEffect(() => {
    if (!client || tourState.index !== slideIndex) return
    // FIXME: ChainNotify causes node to hang
    /*
    const [cancelFunc, promise] = client.chainNotify(changes => {
      for (const change of changes) {
        const { Type: changeType, Val: val } = change
        const { Height: height, Blocks: blocks } = val
        const miners = blocks.map(({ Miner: miner }) => miner).sort()
        if (changeType === 'current' || changeType === 'apply') {
          updateRounds(draft => {
            draft[height] = {
              height,
              miners
            }
          })
        }
      }
    })
    promise.catch(err => { console.error(err) })
    return cancelFunc
    */
  }, [client, tourState.index])

  useEffect(() => {
    if (lastEl && lastEl.current) {
      lastEl.current.scrollIntoView({behavior: "smooth"})
    }
  })

  let content
  if (rounds.length === 0) {
    content = 'Loading...'
  } else {
    content = (
      <div style={{ overflow: 'scroll', height: '50vh' }}>
        {rounds
          .slice(0, rounds.length - 1)
          .map(round => {
            const { height, miners } = round
            return <div key={height} style={{marginBottom: '2rem', color: 'gray'}}>{height}: {miners.join(' ')}</div>
          })}
        {rounds.slice(-1).map(round => {
          const { height, miners } = round
          return <div key={height} ref={lastEl}>{height}: {miners.join(' ')}</div>
        })}
      </div>
    )
  }
  content = <div>Disabled</div>
  return (
    <div>
      <h2>ChainNotify</h2>
      {content}
    </div>
  )
}
