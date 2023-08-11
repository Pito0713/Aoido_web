import axios from 'axios'
import { useStore } from '@STORE/main';
const store = useStore();

const requestInterceptor = (config:any) => {
  config.timeout = 10000
  return config;
};

const responseInterceptor = response => {
  return response;
};

const requestInterceptorError = error => {
  return Promise.reject(error);
};

const responseInterceptorError = error => {
  store.isNotificationChange(true);
  store.NotificationMessageChange(error.response.data?.message)
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
    return error.response;
  };
}

interface Userinfo {
  account?: string,
  password?: string,
  uesrName?: string,
  birth?: Date | string,
  mail?: string,
  phone?: Number | string,
  addres?: string,
  city?: string,
  town?: string,
  token?: string | null | undefined,
  oldPassWord?: string | null | undefined,
  newPassWord?: string | null | undefined,
  newPassWordAgain?: string | null | undefined,
}

interface Cargo {
  token?: string | null | undefined,
  page?: Number | string,
  pagination?: Number | string,
  id?: string,
  count?: Number | string,
}

interface Coupon {
  id?: string,
  token?: string | null | undefined,
  user?: string,
}

interface Product {
  searchText?: string,
  category?: string,
  page?: string,
  pagination?: string,
  isSort?: boolean,
}

class Service {
  postRegister= async (submitData: Userinfo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://localhost:8082/register`,
      '',
      submitData
    );
    return data;
  }

  postLogin = async (submitData: Userinfo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://localhost:8082/login`,
      '',
      submitData
    );
    return data;
  }

  postUserinfo = async (submitData: Userinfo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://localhost:8082/userinfo`,
      '',
      submitData
    );
    return data;
  }

  postHandPassWord = async (submitData: Userinfo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://localhost:8082/handPassWord`,
      '',
      submitData
    );
    return data;
  }


  postUploadUser= async (submitData: Userinfo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://localhost:8082/uploadUser`,
      '',
      submitData
    );
    return data;
  }

  postUploadUserImage= async (submitData:any) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://localhost:8082/uploadUserImage`,
      '',
      submitData
    );
    return data;
  }

  postProductDatabase= async (submitData: Product) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://localhost:8082/productDatabase`,
      '',
      submitData
    );
    return data;
  }

  postProductFilter= async (submitData: Product) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://localhost:8082/productFilter`,
      '',
      submitData
    );
    return data;
  }

  postCartData= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://localhost:8082/cartData`,
      '',
      submitData
    );
    return data;
  }

  postCreateCart= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://localhost:8082/createCart`,
      '',
      submitData
    );
    return data;
  }

  postUploadCart= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://localhost:8082/uploadCart`,
      '',
      submitData
    );
    return data;
  }

  postDeleteCart= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'DELETE',
      `http://localhost:8082/deleteCart`,
      '',
      submitData
    );
    return data;
  }

  postFindAllCoupon= async (submitData: Coupon) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://localhost:8082/findAllCoupon`,
      '',
      submitData
    );
    return data;
  }

  postFindPersonalCoupon= async (submitData: Coupon) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://localhost:8082/findPersonalCoupon`,
      '',
      submitData
    );
    return data;
  }

  getCountyItems= async (submitData: any) => {
    let data = await fetchApi_AuthData(
      'get',
      `http://localhost:8082/allCountry`,
      '',
      submitData
    );
    return data;
  }

  patchUpdateCouponUser= async (submitData: Coupon) => {
    let data = await fetchApi_AuthData(
      'PATCH',
      `http://localhost:8082/updateCouponUser/`,
      submitData.id,
      submitData
    );
    return data;
  }

  getFindActiveCarouselImg= async (submitData: any) => {
    let data = await fetchApi_AuthData(
      'GET',
      `http://localhost:8082/findActiveCarouselImg`,
      '',
      submitData
    );
    return data;
  }
  getFindActiveAboutImg= async (submitData: any) => {
    let data = await fetchApi_AuthData(
      'GET',
      `http://localhost:8082/findActiveAboutImg`,
      '',
      submitData
    );
    return data;
  }
  getFindActiveMainImg= async (submitData: any) => {
    let data = await fetchApi_AuthData(
      'GET',
      `http://localhost:8082/findActiveMainImg`,
      '',
      submitData
    );
    return data;
  }

  postCreateOrder= async (submitData: any) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://localhost:8082/createOrder`,
      '',
      submitData
    );
    return data;
  }

}

export default new Service()