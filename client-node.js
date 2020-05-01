import LotusRPC from './lotus-client-rpc';
import BrowserProvider from './lotus-client-provider-browser';
// import schema from '@filecoin-shipyard/lotus-client-schema/prototype/testnet-v3.js';
import schema from './lotus-client-schema';

const api = '127.0.0.1'
const wsUrl = `ws://${api}:9000/api/0/node/rpc/v0`
const provider = new BrowserProvider(wsUrl, {
  token: async () => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.R73RlxclWW0Dl26sIhWO73YsIuKLJ-Q7hYA7CihgOOA'
})
const client = new LotusRPC(provider, { schema })

export default client