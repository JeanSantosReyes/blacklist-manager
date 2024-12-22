import API from '../api';

export const verifyApi = (token: string) => {
    return API.post('/verify-token', { token });
}

export const addCustomerToBlacklist = (customer: { name: string, number: string }) => {
    return API.post('/blacklist', customer)
}

export const deleteCustomerByNumber = (number: string) => {
    return API.delete('/blacklist', { data: { number } });
}

export const getBlacklist = () => {
    return API.get('/blacklist');
}