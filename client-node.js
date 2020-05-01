import LotusRPC from './lotus-client-rpc';
import BrowserProvider from './lotus-client-provider-browser';
// import schema from '@filecoin-shipyard/lotus-client-schema/prototype/testnet-v3.js';
import schema from './lotus-client-schema';

const api = 'lotus.testground.ipfs.team'
const wsUrl = `wss://${api}/tour_api/0/node/rpc/v0`
const provider = new BrowserProvider(wsUrl, {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.CFIxIFjQlXg6kznqIFhieJ9Pteq2SjmweoEdUJcacy4'
})
const client = new LotusRPC(provider, { schema })

export default client