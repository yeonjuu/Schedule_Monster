import axios from 'axios';

async function get(endpoint) {
  try {
    const response = await axios.get(endpoint, {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    });
    //응답 값 데이터만 전송
    return response.data;
  } catch (error) {
    if (error.response) {
      // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
      throw new Error(error);
    } else if (error.request) {
      // 요청이 전송되었지만, 응답이 수신되지 않았습니다.
      // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
      // node.js에서는 http.ClientRequest 인스턴스입니다.
      throw new Error(error.request);
    } else {
      // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
      throw new Error(error.message);
    }
  }
}

async function post(endpoint, data) {
  try {
    const response = await axios.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error);
    } else if (error.request) {
      throw new Error(error.request);
    } else {
      throw new Error(error.message);
    }
  }
}
//put: 새로 데이터를 작성하는 것
//patch : 덮어쓰기? 틀은 그대로 있고 안에 내용을 바꾸는거
//기존 데이터 + 바뀌는 데이터 다 작성
async function put(endpoint, data) {
  try {
    const response = await axios.put(endpoint, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error);
    } else if (error.request) {
      throw new Error(error.request);
    } else {
      throw new Error(error.message);
    }
  }
}

//변경할 데이터만 작성
async function patch(endpoint, data) {
  try {
    const response = await axios.patch(endpoint, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error);
    } else if (error.request) {
      throw new Error(error.request);
    } else {
      throw new Error(error.message);
    }
  }
}

async function del(endpoint, data) {
  try {
    const response = await axios.delete(endpoint, {
      data: { data },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error);
    } else if (error.request) {
      throw new Error(error.request);
    } else {
      throw new Error(error.message);
    }
  }
}

export { get, post, put, patch, del as delete };
