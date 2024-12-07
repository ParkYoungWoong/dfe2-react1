import axios from 'axios'

const headers = {
  'Content-Type': 'application/json',
  apikey: process.env.APIKEY,
  username: process.env.USERNAME
}

export default async function (req, res) {
  const { method = 'GET', endpoint = '', body } = req.body
  const { data } = await axios({
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${endpoint}`,
    method,
    headers,
    data: body
  })
  res.status(200).json(data)
}
