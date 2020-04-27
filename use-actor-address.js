import { useEffect, useState } from 'react'

export default function useActorAddress (client) {
  const [address, setAddress] = useState()

  useEffect(() => {
    if (!client) return
    let state = { canceled: false }
    ;(async function run () {
      if (state.canceled) return
      const address = await client.actorAddress()
      if (state.canceled) return
      setAddress(address)
    })()
    return () => { state.canceled = true }
  }, [client])

  return address
}
