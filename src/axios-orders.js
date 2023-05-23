import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-e9184-default-rtdb.firebaseio.com'
});

export default instance;