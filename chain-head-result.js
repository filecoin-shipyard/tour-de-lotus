() => {
  const [chainHead, setChainHead] = useState()

  useEffect(() => {
    const state = { cancelled: false }
    if (!client) return
    ;(async function run () {
      const result = await client.chainHead()
      if (state.cancelled) return
      setChainHead(result)
    })()
    return () => { state.cancelled = true }
  }, [client])

  let content
  if (!chainHead) {
    content = 'Loading...'
  } else {
    content = (
      <ReactJson
        src={chainHead}
        collapseStringsAfterLength={40}
        displayDataTypes={false}
        enableClipboard={false}
      />
    )
  }
  return (
    <div
      style={{
        overflow: 'scroll',
        fontSize: '0.8rem',
        textAlign: 'left',
        marginLeft: '64px',
        height: '100vh'
      }}
    >
      <h2>ChainHead</h2>
      {content}
    </div>
  )
}
