function useLotusClient () {
  const [client, setClient] = useState()

  useEffect(() => {
    ;(async () => {
      const api = 'lotus.testground.ipfs.team/api'
      const wsUrl = 'wss://' + api + `/0/node/rpc/v0`
      const provider = new BrowserProvider(wsUrl, { token })
      setClient(new LotusRPC(provider, { schema }))
    })()
  }, [])

  return client
}

const Title = () => {
  const client = useLotusClient()

  return <h1>Hello World 3!</h1>
}

render(<Title />)
