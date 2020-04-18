() => {
  const [height, setHeight] = useState()

  useEffect(() => {
    if (!client) return
    setHeight("Loading...")
    ;(async function run () {
      const result = await client.ChainHead()
      setHeight(result.Height)
      setTimeout(run, 1000)
    })()
  }, [client])

  return <h1>{height}</h1>
}