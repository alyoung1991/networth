import axios from 'axios';

const API_TOKEN = '60affe26dda9f6.34131452';

export default axios.create({
    baseURL: 'https://eodhistoricaldata.com/api/eod',
    params: {
        api_token: API_TOKEN,
        period: 'd',
        fmt: 'json'
    }
});
