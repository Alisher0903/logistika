export const url = 'http://137.184.13.215/'

export const byIdObj = (id) => document.getElementById(id);
export const byIdProductObj = (id) => document.getElementById(id);
export const byId = (id) => byIdObj(id) ? byIdObj(id).value : "";

export const config = {
    headers: {
        Authorization: sessionStorage.getItem("jwtToken"),
    }
}

export const setConfig = () => config.headers.Authorization = sessionStorage.getItem("jwtToken")