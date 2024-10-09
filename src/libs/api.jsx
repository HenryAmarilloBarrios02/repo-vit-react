import authApi from './axios'

export const getData = async (endpoint) => {
    const res = await authApi.get(`/api/v1/${endpoint}`)
    return res.data
}