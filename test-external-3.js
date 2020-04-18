function useLotusClient () {
  const [client, setClient] = useState()

  useEffect(() => {
    console.log('Jim starting client')
    const api = 'lotus.testground.ipfs.team/api'
    const wsUrl = 'wss://' + api + `/1/node/rpc/v0`
    const provider = new BrowserProvider(wsUrl)
    const client = new LotusRPC(provider, { schema })
    setClient(client)
    return cleanup

    async function cleanup () {
      await client.destroy()
    }
  }, [])

  return client
}

function useHeight (client) {
  const [height, setHeight] = useState()

  useEffect(() => {
    if (!client) return
    setHeight("Loading...")
    async function run () {
      const result = await client.ChainHead()
      setHeight(result.Height)
      setTimeout(run, 1000)
    }
    run()
  }, [client])

  return height
}

const ChainHeight = () => {
  const client = useLotusClient()
  const height = useHeight(client)

  return <h1>{height}</h1>
}

render(<ChainHeight />)
