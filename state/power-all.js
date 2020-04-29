({ tourState }) => {
  const [totalPower, setTotalPower] = useState()

  useEffect(() => {
    let state = { canceled: false }
    if (tourState.index !== slideIndex) return
    setTotalPower('Loading...')
    ;(async function run () {
      if (state.canceled) return
      const result = await client.stateMinerPower('<empty>', [])
      if (state.canceled) return
      setTotalPower(result.TotalPower)
    })()
    return () => {
      state.canceled = true
    }
  }, [tourState.index])

  let content
  if (!totalPower) {
    content = <div>Loading...</div>
  } else {
    content = (
      <div>
        <h3>RawBytePower: {totalPower.RawBytePower} bytes</h3>
        <h3>QualityAdjPower: {totalPower.QualityAdjPower} bytes</h3>
      </div>
    )
  }
  return (
    <div>
      <h2>StateMinerPower</h2>
      (Total Network Power)
      {content}
    </div>
  )
}
