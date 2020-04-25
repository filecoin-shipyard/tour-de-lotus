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
    return () => { state.canceled = true }
  }, [tourState.index])

  return (
    <div>
      <h2>StateMinerPower</h2>
      (Total Network Power)
      <h1>{totalPower} bytes</h1>
    </div>
  )
}
