import Axios from "axios"

const AxiosInstance = Axios.create({
  baseURL: "http://localhost:5005/api"
})

export default AxiosInstance