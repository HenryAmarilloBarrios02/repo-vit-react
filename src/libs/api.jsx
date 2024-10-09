export const getApi = () => {
    const dataApi = import.meta.env.VITE_API_URL
    return dataApi
}