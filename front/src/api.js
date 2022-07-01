import axios from 'axios';

// const BACKEND_PORT_NUMBER = '5001';
const serverUrl = 'https://' + window.location.hostname + '/api/';

// 어느 요청이나 공통인 baseUrl이므로 구성 기본값으로 설정.
axios.defaults.baseURL = serverUrl;

async function get(endpoint, params = '') {
    console.log(`%cGET 요청 ${serverUrl + endpoint + '/' + params}`, 'color: #a25cd1;');

    console.log(sessionStorage.getItem('userToken'));

    return axios.get(endpoint + '/' + params, {
        // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
    });
}

async function post(endpoint, data) {
    // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
    // 예시: {name: "Kim"} => {"name": "Kim"}
    const bodyData = JSON.stringify(data);
    console.log(`%cPOST 요청: ${serverUrl + endpoint}`, 'color: #296aba;');
    console.log(`%cPOST 요청 데이터: ${bodyData}`, 'color: #296aba;');

    return axios.post(endpoint, bodyData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
    });
}

async function put(endpoint, data) {
    // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
    // 예시: {name: "Kim"} => {"name": "Kim"}
    const bodyData = JSON.stringify(data);
    console.log(`%cPUT 요청: ${serverUrl + endpoint}`, 'color: #059c4b;');
    console.log(`%cPUT 요청 데이터: ${bodyData}`, 'color: #059c4b;');
    console.log('endpoint:', endpoint);

    return axios.put(endpoint, bodyData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
    });
}
async function patch(endpoint, data) {
    // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
    // 예시: {name: "Kim"} => {"name": "Kim"}
    const bodyData = JSON.stringify(data);
    console.log(`%cPUT 요청: ${serverUrl + endpoint}`, 'color: #059c4b;');
    console.log(`%cPUT 요청 데이터: ${bodyData}`, 'color: #059c4b;');

    return axios.patch(endpoint, bodyData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
    });
}

async function sendImage(endpoint, formData) {
    const bodyData = JSON.stringify(formData);
    console.log(`%cPOST 요청: ${serverUrl + endpoint}`, 'color: #296aba;');
    console.log(`%cPOST 요청 데이터: ${bodyData}`, 'color: #296aba;');
    return axios.post(serverUrl + endpoint, formData, {
        headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
    });
}

async function getQuery(endpoint, params = '') {
    // console.log(`%cGET 요청 ${serverUrl + endpoint + '?' + params}`, 'color: #a25cd1;');

    return axios.get(serverUrl + endpoint, {
        params,
        // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
    });
}

async function putQuery(endpoint, data) {
    // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
    // 예시: {name: "Kim"} => {"name": "Kim"}
    const bodyData = JSON.stringify(data);
    console.log(`%cPOST 요청: ${serverUrl + endpoint}`, 'color: #296aba;');
    console.log(`%cPOST 요청 데이터: ${bodyData}`, 'color: #296aba;');

    return axios.put(endpoint, bodyData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
    });
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint, params = '') {
    console.log(`DELETE 요청 ${serverUrl + endpoint + '/' + params}`);
    return axios.delete(endpoint + '/' + params, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
    });
}

async function delpw(endpoint, data) {
    // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
    // 예시: {name: "Kim"} => {"name": "Kim"}
    const bodyData = JSON.stringify(data);
    console.log(`%cdelpw 요청: ${serverUrl + endpoint}`, 'color: #059c4b;');
    console.log(`%cdelpw 요청 데이터: ${bodyData}`, 'color: #059c4b;');
    console.log('endpoint:', endpoint)
    return axios.post(endpoint, bodyData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
    });
}

async function delData(endpoint, data) {
    // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
    // 예시: {name: "Kim"} => {"name": "Kim"}
    const bodyData = JSON.stringify(data);
    console.log(`%cDEL 요청: ${serverUrl + endpoint}`, 'color: #296aba;');
    console.log(`%cDEL 요청 데이터: ${bodyData}`, 'color: #296aba;');

    return axios.delete(endpoint, bodyData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
    });
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export {
    get,
    post,
    put,
    del,
    patch as delete,
    sendImage,
    getQuery,
    putQuery,
    delData,
    delpw,
    patch,
};
