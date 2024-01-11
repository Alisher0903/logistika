export const url = 'http://192.168.76.139/'

export const byIdObj = (id) => document.getElementById(id);

export const config = {
    headers: {
        Authorization: sessionStorage.getItem("jwtToken"),
    }
}