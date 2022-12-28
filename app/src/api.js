import axios from 'axios';

const cloudDB = process.env.REACT_APP_CLOUD_DB;

async function get(endpoint) {
  const apiUrl = `${cloudDB}/api${endpoint}`;
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    //응답 값 데이터만 전송
    return response.data;
  } catch (error) {
    if (error.response) {
      // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
      const { data, status } = error.response;
      const errorContent = { status, data };
      throw errorContent;
    } else if (error.request) {
      // 요청이 전송되었지만, 응답이 수신되지 않았습니다.
      // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
      // node.js에서는 http.ClientRequest 인스턴스입니다.
      throw error.request;
    } else {
      // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
      throw error.message;
    }
  }
}

async function post(endpoint, data) {
  const apiUrl = `${cloudDB}/api${endpoint}`;
  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      const errorContent = { status, data };
      throw errorContent;
    } else if (error.request) {
      throw error.request;
    } else {
      throw error.message;
    }
  }
}
//put: 새로 데이터를 작성하는 것
//patch : 덮어쓰기? 틀은 그대로 있고 안에 내용을 바꾸는거
//기존 데이터 + 바뀌는 데이터 다 작성
async function put(endpoint, data) {
  const apiUrl = `${cloudDB}/api${endpoint}`;
  try {
    const response = await axios.put(apiUrl, data, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      const errorContent = { status, data };
      throw errorContent;
    } else if (error.request) {
      throw error.request;
    } else {
      throw error.message;
    }
  }
}

//변경할 데이터만 작성
async function patch(endpoint, data) {
  const apiUrl = `${cloudDB}/api${endpoint}`;
  try {
    const response = await axios.patch(apiUrl, data, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      const errorContent = { status, data };
      throw errorContent;
    } else if (error.request) {
      throw error.request;
    } else {
      throw error.message;
    }
  }
}

async function del(endpoint) {
  const apiUrl = `${cloudDB}/api${endpoint}`;
  try {
    const response = await axios.delete(apiUrl, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      const errorContent = { status, data };
      throw errorContent;
    } else if (error.request) {
      throw error.request;
    } else {
      throw error.message;
    }
  }
}

export { get, post, put, patch, del as delete };
