import axios from 'axios';

export default axios.create({
    baseURL: 'https://eodhistoricaldata.com/api/eod/VTSAX.US?from=2021-05-26&to=2021-05-27&api_token=60affe26dda9f6.34131452&period=d&fmt=json'
});