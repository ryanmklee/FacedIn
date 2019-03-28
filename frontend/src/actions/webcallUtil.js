import axios from "axios";

export function axiosGetRequestHelper(dispatch, url, params, successFunction, errorFunction) {
    return axios.get(url, params)
        .then(response => {
            console.log("Get " + url + " Response:");
            console.log(response);
            dispatch(successFunction(response))
        })
        .catch(error => {
            console.log("Get " + url + " Error:");
            console.log(error);
            dispatch(errorFunction())
        })
}

export function axiosPostRequestHelper(dispatch, url, params, successFunction, errorFunction) {
    return axios.post(url, null,  params)
        .then(response => {
            console.log("Post " + url + " Response:");
            console.log(response);
            dispatch(successFunction(response))
        })
        .catch(error => {
            console.log("Post " + url+ " Error:");
            console.log(error);
            dispatch(errorFunction(error))
        })
}