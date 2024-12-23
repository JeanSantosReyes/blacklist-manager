import API from '../api';

export const addCustomerToBlacklist = (customer: { name: string, number: string }) => {
    return API.post('/blacklist', customer)
}

export const deleteCustomerByNumber = (number: string) => {
    return API.delete('/blacklist', { data: { number } });
}

export const getBlacklist = () => {
    return API.get('/blacklist');
}