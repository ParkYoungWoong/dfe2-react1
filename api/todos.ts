import axios from 'axios'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const headers = {
  'Content-Type': 'application/json',
  apikey: process.env.APIKEY,
  username: process.env.USERNAME
}

export default async function (req: VercelRequest, res: VercelResponse) {
  const { method = 'GET', endpoint = '', body } = req.body
  const { data } = await axios({
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${endpoint}`,
    method,
    headers,
    data: body
  })
  res.status(200).json(data)
}
