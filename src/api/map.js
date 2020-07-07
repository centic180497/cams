import axios from 'axios'
import { MAP_API_KEY, API_URL } from'../constant/constant_endpoint'

export function reverseGeocoding({lat,lng}){
    return axios({
        method: 'get',
        url: `${API_URL}api/googlemap`,
        params: {
            lat: lat,
            lng: lng
            // key: MAP_API_KEY
        },
    })
}

