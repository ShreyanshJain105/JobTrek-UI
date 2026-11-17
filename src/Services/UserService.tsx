import axiosInstance from "../Interceptor/AxiosInterceptor";

const registerUser=async (user:any)=>{
    return axiosInstance.post(`/users/register`,user)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}
const loginUser=async (login:any)=>{
    return axiosInstance.post(`/users/login`,login)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const sendOtp=async (email:any)=>{
    return axiosInstance.post(`/users/sendOtp/${email}`)
    .then(result=>result.data)
    .catch(error=>{throw error;});
}
const verifyOtp=async (email:any,otp:any)=>{
    return axiosInstance.get(`/users/verifyOtp/${email}/${otp}`)
    .then(result=>result.data)
    .catch(error=>{throw error;});
}

const changePass= async (email:string,password:string)=>{
    return axiosInstance.post(`/users/changePass`,{email,password})
    .then(result=>result.data)
    .catch(error=>{throw error;});
}

const getAllUsers = async () => {
    return axiosInstance.get(`/users/getAll`)
        .then(result => result.data)
        .catch(error => { throw error; });
};

const adminCreateUser = async (user: any) => {
    return axiosInstance.post(`/users/admin/create`, user)
        .then(result => result.data)
        .catch(error => { throw error; });
};

const adminUpdateUser = async (user: any) => {
    return axiosInstance.put(`/users/admin/update`, user)
        .then(result => result.data)
        .catch(error => { throw error; });
};

const adminDeleteUser = async (id: number | string) => {
    return axiosInstance.delete(`/users/admin/delete/${id}`)
        .then(result => result.data)
        .catch(error => { throw error; });
};

export {
    registerUser,
    loginUser,
    sendOtp,
    verifyOtp,
    changePass,
    getAllUsers,
    adminCreateUser,
    adminUpdateUser,
    adminDeleteUser
};
