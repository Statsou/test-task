import axios from "@/api/axios";

const getProjects = apiUrl => {
  return axios.get(apiUrl)
}

export default {
  getProjects
}

