import API from '../api';

export const getAll = () => {
    return API.get('/blacklist');
}

export const actionBlock = (intent: string, number: string) => {
    return API.post('/blacklist', { intent, number });
}