import axiosInstance from "../Interceptor/AxiosInterceptor";

const getNotifications = async (id: any) => {
    return axiosInstance
        .get(`/notification/get/${id}`)
        .then((res) => res.data)
        .catch((error) => {
            throw error;
        });
};

const readNotifications = async (id: any) => {
    return axiosInstance
        .put(`/notification/read/${id}`)
        .then((res) => res.data)
        .catch((error) => {
            throw error;
        });
};

const sendNotification = async (noti: any) => {
    return axiosInstance
        .post(`/notification/send`, noti)
        .then((res) => res.data)
        .catch((error) => {
            console.error("Notification dispatch error:", error);
            return null;
        });
};

export { getNotifications, readNotifications, sendNotification };
