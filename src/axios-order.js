import axios from "axios"

const instance = axios.create({
    baseURL:"https://my-burger-5a8b3-default-rtdb.firebaseio.com/"
})

export default instance;