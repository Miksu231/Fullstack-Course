import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = async () => {
  const result = await axios.get(baseUrl)
  const response = result.data.sort((a, b) => { return b.likes - a.likes })
  return response
}
const addLike = async (newObject, id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`/api/blogs/${id}`, newObject, config);
  return response.data;
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, addLike }
