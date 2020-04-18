() => {
  const [chainHead, setChainHead] = useState(null)

  useEffect(() => {
    if (!client) return
    ;(async function run () {
      const result = await client.chainHead()
      setChainHead(result)
    })()
  }, [client])

  return (
    <div>
      <h2>ChainHead</h2>
      <ReactJson
      src={chainHead}
      collapseStringsAfterLength={70}
      displayDataTypes={false}
    />
    </div>
  )
}
