import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { Storage } from '@google-cloud/storage'
import { NextApiRequest, NextApiResponse } from 'next'

export default withApiAuthRequired(async function upload(req: NextApiRequest, res: NextApiResponse) {
   const storage = new Storage({
      projectId: process.env.GCS_PROJECT_ID,
      credentials: {
         client_email: process.env.GCS_CLIENT_EMAIL,
         private_key: process.env.GCS_PRIVATE_KEY,
      },
   })
   
   console.log(process.env.GCS_BUCKET_NAME, req.query.file)
   
   if (process.env.GCS_BUCKET_NAME && typeof req.query.file === 'string') {
      const bucket = storage.bucket(process.env.GCS_BUCKET_NAME)
      
      const file = bucket.file(req.query.file)
      
      const options = {
         expires: Date.now() + 1 * 60 * 1000, //  1 minute,
         fields: { 'x-goog-meta-test': 'data' },
      }
      
      // bucket.storage.getBucketsStream().
      
      const [response] = await file.generateSignedPostPolicyV4(options)
      res.status(200).json({ location: response.url + response.fields.key, raw: response })
   }
})
