import axios from "axios"
import router from "../../router";
const http = axios.create({
    baseURL: '/api'
})

// 请求拦截
http.interceptors.request.use(req => {
    //登录成功之后得到token，并把token从离线存储中取出来赋值给authorization
    let userInfo = sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo"))
    : {};

    //   请求头
    req.headers.authorization = userInfo.token;
    return req
})


// 响应拦截

http.interceptors.response.use(res => {
    if (res.data.code === 403) {
        alert(res.data.msg)
        router.push("/login")
        return res
    } else if (res.data.code == 500) {
        alert(res.data.msg);
        //全局拦截错误之后，跳转到登录
        router.push("/login");
        return res;
    } else {
        return res
    }
})




export default http