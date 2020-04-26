({ tourState }) => {
  const [address, setAddress] = useState()

  useEffect(() => {
    let state = { canceled: false }
    if (tourState.index !== slideIndex) return
    setAddress('Loading...')
    ;(async function run () {
      if (state.canceled) return
      const address = await client.actorAddress()
      if (state.canceled) return
      setAddress(address)
    })()
    return () => { state.canceled = true }
  }, [tourState.index])

  return (
    <div>
      <h2>Miner: ActorAddress</h2>
      <h1>{address}</h1>
    </div>
  )
}
