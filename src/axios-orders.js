import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-4f0d6.firebaseio.com/'
});

export default instance;