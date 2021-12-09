import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'

const consumerId =
   process.env.NEXT_PUBLIC_CONSUMER_ID ||
   `demo-file-picker-${Math.random().toString(36).substring(7)}-${new Date().toISOString()}`

const headers = (consumerId: string) => ( {
   'Content-Type': 'application/json',
   Authorization: `Bearer ${process.env.APIDECK_API_KEY}`,
   'X-APIDECK-CONSUMER-ID': consumerId,
   'X-APIDECK-APP-ID': `${process.env.APIDECK_APP_ID}`,
} )

export default withApiAuthRequired(async function sessions(req, res) {
   const { body } = req
   const s = await getSession(req, res)
   const raw = await fetch(`${process.env.APIDECK_PUBLIC_BASE_URL}/vault/sessions`, {
      method: 'POST',
      headers: headers(s?.idToken ?? `file-picker-${Math.random().toString(36).substring(7)}-${new Date().toISOString()}`),
      body,
   })
   const response = await raw.json()
   res.json(response)
})
