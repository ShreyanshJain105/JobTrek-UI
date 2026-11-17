import axiosInstance from "../Interceptor/AxiosInterceptor";

// Post a new job
const postJob = async (job: any) => {
  try {
    const response = await axiosInstance.post(`/jobs/post`, job);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all jobs with pagination
const getAllJobs = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await axiosInstance.get(`/jobs/getAll?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single job by ID
const getJob = async (id: any) => {
  try {
    const response = await axiosInstance.get(`/jobs/get/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Apply for job
const applyJob = async (id: any, applicant: any) => {
  try {
    const response = await axiosInstance.post(`/jobs/apply/${id}`, applicant);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get jobs posted by specific user
const getJobPostedBy = async (id: any) => {
  try {
    const response = await axiosInstance.get(`/jobs/postedBy/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Change application status
const changeAppStatus = async (application: any) => {
  try {
    const response = await axiosInstance.post(`/jobs/changeAppStatus`, application);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete job (Superadmin or owner)
const deleteJob = async (id: any) => {
  try {
    const response = await axiosInstance.delete(`/jobs/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  postJob,
  getAllJobs,
  getJob,
  applyJob,
  getJobPostedBy,
  changeAppStatus,
  deleteJob
};