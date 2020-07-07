import axios from 'axios'
import { API_URL } from '../constant/constant_endpoint'
import access_token from './utils'

export function getSingleViewsRequest(){
    return axios({
        method: 'get',
        url: `${API_URL}api/sitemap/single-views`,
        headers: {
            'Authorization': access_token
        }
    })
}

export function getViewRequest(data){
    return axios({
        method: 'get',
        url: `${API_URL}api/sitemap/view/${data.viewId}`,
        headers: {
            'Authorization': access_token
        }
    })
}

export function addViewRequest(view){
    return axios({
        method: 'post',
        url: `${API_URL}api/sitemap/view`,
        headers: {
            'Authorization': access_token
        },
        data: view
    })
}

export function deleteViewRequest(data){
    return axios({
        method: 'delete',
        url: `${API_URL}api/sitemap/view`,
        headers: {
            'Authorization': access_token
        },
        data: data
    })
}