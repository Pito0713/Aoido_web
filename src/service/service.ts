import axios from 'axios';

const fetchApi = async (method: string, url: string) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error: any) {
    //console.log(`\x1B[41m\x1B[37m${errorResult.errorHTTP}\x1B[0m \x1B[31m${errorResult.errorText} `)
  }
};

const fetchApi_AuthParams = async (method: string, url: string, params: string) => {
  try {
    const response = await axios({
      method: method,
      url: url + params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error: any) {
     //console.log(`\x1B[41m\x1B[37m${errorResult.errorHTTP}\x1B[0m \x1B[31m${errorResult.errorText} `)
  }
};

const fetchApi_AuthData = async (method: string, url: string, params: string | undefined, body: any) => {
  try {
    const response = await axios({
      method: method,
      url: url + params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: body,
    });
    return response.data;
  } catch (error: any) {
     //console.log(`\x1B[41m\x1B[37m${errorResult.errorHTTP}\x1B[0m \x1B[31m${errorResult.errorText} `)
  }
};

const fetchApi_upload_file = async (method: string, url: string, params: string | undefined, body: any) => {
  try {
    const response = await axios({
      method: method,
      url: url + params,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: body,
    });
    return response.data;
  } catch (error: any) {
     //console.log(`\x1B[41m\x1B[37m${errorResult.errorHTTP}\x1B[0m \x1B[31m${errorResult.errorText} `)
  }
};

interface getExchange {
  currency: string,
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

interface register {
  account?: string,
  password?: string,
}

interface Platform {
  id?: string,
  label?: string,
  rate?: number | string,
  token?: string | null | undefined,
}
interface Product {
  id?: string,
  describe?: string,
  price?: string,
  remark?: string,
  token?: string | null | undefined,
  imageUrl?: string,
}

interface Image {
  imageUrl?: FormData,
}


const Service = {
  getExchange: async (submitData: getExchange) => {
    let data = await fetchApi_AuthParams(
      'GET',
      `https://api.coinbase.com/v2/exchange-rates?`,
      `currency=${submitData.currency}`
    );
    return data;
  },
  postAllCargos: async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.205:8082/allCargos`,
      '',
      submitData,
    );
    return data;
  },

  postAddCargo: async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.205:8082/addCargo`,
      '',
      submitData
    );
    return data;
  },

  patchUpdateCargo: async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'PATCH',
      `http://192.168.23.205:8082/updateCargo/`,
      submitData.id,
      submitData
    );
    return data;
  },

  deleteCargo: async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'DELETE',
      `http://192.168.23.205:8082/delCargo/`,
      submitData.id,
      {},
    );
    return data;
  },

  postRegister: async (submitData: register) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.205:8082/register`,
      '',
      submitData
    );
    return data;
  },
  postLogin: async (submitData: register) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.205:8082/login`,
      '',
      submitData
    );
    return data;
  },
  postPlatformRate: async (submitData: Platform) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.205:8082/platformRate`,
      '',
      submitData,
    );
    return data;
  },

  postCreateModifyRate: async (submitData: Platform) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.205:8082/createModifyRate`,
      '',
      submitData
    );
    return data;
  },

  deleteModifyRate: async (submitData: Platform) => {
    let data = await fetchApi_AuthData(
      'DELETE',
      `http://192.168.23.205:8082/deleteModifyRate`,
      '',
      submitData
    );
    return data;
  },

  postSearchCargo: async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.205:8082/searchCargo`,
      '',
      submitData
    );
    return data;
  },

  postHandPassWord: async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.205:8082/handPassWord`,
      '',
      submitData
    );
    return data;
  },
  postAllProduct: async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.205:8082/allProduct`,
      '',
      submitData
    );
    return data;
  },
  postAddProduct: async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.205:8082/addProduct`,
      '',
      submitData
    );
    return data;
  },
  postUploadProduct: async (submitData: Product) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.205:8082/uploadProduct`,
      '',
      submitData
    );
    return data;
  },

  deleteProductOne: async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'DELETE',
      `http://192.168.23.205:8082/deleteProductOne/`,
      submitData.id,
      {},
    );
    return data;
  },

  deleteProductCategory: async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'DELETE',
      `http://192.168.23.205:8082/deleteProductCategory`,
      '',
      submitData,
    );
    return data;
  },

  postUploadImage: async (submitData: FormData | undefined) => {
    let data = await fetchApi_upload_file(
      'POST',
      `http://192.168.23.205:8082/uploadImage`,
      '',
      submitData
    );
    return data;
  },

  postProductFilter: async (submitData: Platform) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.205:8082/productFilter`,
      '',
      submitData,
    );
    return data;
  },

  postCreateProductFilter: async (submitData: Platform) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.205:8082/createProductFilter`,
      '',
      submitData
    );
    return data;
  },

  deleteProductFilter: async (submitData: Platform) => {
    let data = await fetchApi_AuthData(
      'DELETE',
      `http://192.168.23.205:8082/deleteProductFilter`,
      '',
      submitData
    );
    return data;
  },
}

export default Service;
