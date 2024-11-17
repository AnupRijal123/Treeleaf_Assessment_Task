export const GET_URL = 'GET_URL';


export function getUrl(value) {
    return {
        type: 'GET_URL',
        payload: value
    }
}
