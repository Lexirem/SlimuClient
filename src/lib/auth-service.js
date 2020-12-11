import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: "http://localhost:4000",
      withCredentials: true,
    });
  }

  signup({ email, password }) {
    return this.auth
      .post("/auth/signup", { email, password })
      .then(({ data }) => data);
  }

  login({ email, password }) {
    return this.auth
      .post("/auth/login", { email, password })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post("/auth/logout", {}).then(({ data }) => data);
  }

  me() {
    return this.auth.get("/auth/me").then(({ data }) => data);
  }

  profile(id){
    return this.auth.get(`/profile/${id}`).then(({data}) => data);
  }

  editUser(){
    return this.auth.get(`/profile/:id/edit`).then(({data}) => data);
  }
  handleUpload = async (theFile)=>{
    console.log("file in service", theFile);
    try {
      const res= await this.auth.post("/upload", theFile);
      return res.data;
    } catch (error) {
      console.log(error)
    }
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
