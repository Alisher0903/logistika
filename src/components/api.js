export const url = 'http://192.168.100.69:80/'

export const byIdObj = (id) => document.getElementById(id);
export const byIdProductObj = (id) => document.getElementById(id);

export const config = {
    headers: {
        Authorization: sessionStorage.getItem("jwtToken"),
    }
}

export const setConfig = () => config.headers.Authorization = sessionStorage.getItem("jwtToken")