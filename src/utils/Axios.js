import axios from 'axios';
import { API_URL } from '../config';

axios.defaults.baseURL = `${API_URL}/api`;

export default axios;