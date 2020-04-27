import LotusRPC from './lotus-client-rpc';
import BrowserProvider from './lotus-client-provider-browser';
// import schema from '@filecoin-shipyard/lotus-client-schema/prototype/testnet-v3.js';
import schema from './lotus-client-schema';

const api = 'lotus.testground.ipfs.team/api'
const nodeNum = 1
const wsUrl = `wss://${api}/${nodeNum}/node/rpc/v0`
const provider = new BrowserProvider(wsUrl, {
  token: async () => {
      const tokenUrl = `https://${api}/${nodeNum}/testplan/.lotus/token`
      const response = await fetch(tokenUrl)
      const token = await response.text()
      return token
  }
})
const client = new LotusRPC(provider, { schema })

export default client