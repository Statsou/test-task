import axios from '@/api/axios'

const login = () => {
  return axios.post('/login')
}

export default {
  login
}
