import LotusRPC from './lotus-client-rpc';
import BrowserProvider from './lotus-client-provider-browser';
// import schema from '@filecoin-shipyard/lotus-client-schema/prototype/testnet-v3.js';
import schema from './lotus-client-schema';

const api = 'lotus.testground.ipfs.team/api'
const wsUrl = 'wss://' + api + `/1/node/rpc/v0`
const provider = new BrowserProvider(wsUrl)
const client = new LotusRPC(provider, { schema })

export default client