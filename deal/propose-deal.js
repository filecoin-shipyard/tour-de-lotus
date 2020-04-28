({ tourState, tourDispatch }) => {
  const cid = tourState.cid
  const targetMiner = tourState.targetMiner
  const defaultWalletAddress = tourState.defaultWalletAddress

  return (
    <div>
      <h3 style={{ marginBottom: '0.5rem' }}>Propose Deal</h3>
      <h5 style={{ marginBottom: 0, marginTop: '0.2rem' }}>CID</h5>
      <div style={{ fontSize: 'small' }}>
        {cid ? cid : <span style={{ color: 'red' }}>Missing</span>}
      </div>
      <h5 style={{ marginBottom: 0, marginTop: '0.2rem' }}>Wallet</h5>
      <div style={{ fontSize: 'small' }}>
        {defaultWalletAddress ? (
          defaultWalletAddress
        ) : (
          <span style={{ color: 'red' }}>Missing</span>
        )}
      </div>
      <h5 style={{ marginBottom: 0, marginTop: '0.2rem' }}>Miner</h5>
      <div style={{ fontSize: 'small' }}>
        {targetMiner ? (
          targetMiner
        ) : (
          <span style={{ color: 'red' }}>Missing</span>
        )}
      </div>
      <h5 style={{ marginBottom: 0, marginTop: '0.2rem' }}>Duration</h5>
      <div style={{ fontSize: 'small' }}>100 blocks (10 minutes)</div>
      <h5 style={{ marginBottom: 0, marginTop: '0.2rem' }}>Epoch Price</h5>
      <div style={{ fontSize: 'small' }}>500</div>
      <button
        onClick={proposeDeal}
        style={{
          width: '10rem',
          minHeight: '2rem',
          fontSize: 'large',
          margin: '1rem'
        }}
      >
        Propose Deal
      </button>
    </div>
  )

  function changed (evt) {
    const targetMiner = evt.currentTarget.value
    tourDispatch({ type: 'setTargetMiner', targetMiner })
  }

  function proposeDeal () {
    alert('Propose!')
  }
}
