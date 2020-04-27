({ tourState, tourDispatch }) => {
  const [address, setAddress] = useState()
  const [balance, setBalance] = useState()

  useEffect(() => {
    let state = { canceled: false }
    if (tourState.index !== slideIndex) return
    ;(async function run () {
      if (state.canceled) return
      const defaultWalletAddress = await client.walletDefaultAddress()
      if (state.canceled) return
      setAddress(defaultWalletAddress)
      tourDispatch({ type: 'setDefaultWalletAddress', defaultWalletAddress })
      const balance = await client.walletBalance(defaultWalletAddress)
      setBalance(new FilecoinNumber(balance, 'attofil'))
    })()
    return () => { state.canceled = true }
  }, [tourState.index])

  if (!address) return <div>Loading...</div>

  return (
    <div>
      <h2>WalletDefaultAddress</h2>
      <div style={{fontSize: 'small'}}>
        {address}
      </div>
      <h2>WalletBalance</h2>
      {typeof balance !== 'undefined' && balance.toFil()}
    </div>
  )
}
