import axios from 'axios'

const requestInterceptor = (config:any) => {
  config.timeout = 5000
  return config;
};

const responseInterceptor = response => {
  return response;
};

const requestInterceptorError = error => {
  return Promise.reject(error);
};

const responseInterceptorError = error => {
  return Promise.reject(error);
};

axios.interceptors.request.use(requestInterceptor, requestInterceptorError);
axios.interceptors.response.use(responseInterceptor, responseInterceptorError);

const fetchApi_AuthData = async (method: string, url: string, params: string | undefined, body: any) => {
  try {
    const response = await axios({
      method,
      url: url + params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // "Access-Control-Allow-Origin": '*',
      },
      data: body,
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
    return error;
  };
}
interface register {
  account?: string,
  password?: string,
}

interface Cargo {
  id?: string,
  describe?: string,
  singNumber?: string,
  startDate?: Date | string,
  endDate?: Date | string,
  remark?: string,
  token?: string | null | undefined,
}

interface Product {
  searchText?: string,
  category?: string,
  page?: string,
  pagination?: string,
}

class Service {
  postRegister= async (submitData: register) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.140:8082/register`,
      '',
      submitData
    );
    return data;
  }

  postLogin = async (submitData: register) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.140:8082/login`,
      '',
      submitData
    );
    return data;
  }

  postUserinfo = async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.140:8082/userinfo`,
      '',
      submitData
    );
    return data;
  }

  postUploadUser= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.140:8082/uploadUser`,
      '',
      submitData
    );
    return data;
  }

  postUploadUserImage= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.140:8082/uploadUserImage`,
      '',
      submitData
    );
    return data;
  }

  postProductDatabase= async (submitData: Product) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.140:8082/productDatabase`,
      '',
      submitData
    );
    return data;
  }

  postProductFilter= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.140:8082/productFilter`,
      '',
      submitData
    );
    return data;
  }

  postChartData= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.140:8082/chartData`,
      '',
      submitData
    );
    return data;
  }

  postCreateChart= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.140:8082/createChart`,
      '',
      submitData
    );
    return data;
  }

  postUploadChart= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.140:8082/uploadChart`,
      '',
      submitData
    );
    return data;
  }

  postDeleteChart= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'Delete',
      `http://192.168.23.140:8082/deleteChart`,
      '',
      submitData
    );
    return data;
  }

  postFindAllCoupon= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.140:8082/findAllCoupon`,
      '',
      submitData
    );
    return data;
  }

  getCountyItems= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'get',
      `http://192.168.23.140:8082/allCountry`,
      '',
      submitData
    );
    return data;
  }

  patchUpdateCouponUser= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'PATCH',
      `http://192.168.23.140:8082/updateCouponUser/`,
      submitData.id,
      submitData
    );
    return data;
  }

}

export default new Service()