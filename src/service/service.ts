import axios from 'axios';

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
    console.log(error,'error')
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
      `http://192.168.23.208:8082/register`,
      '',
      submitData
    );
    return data;
  }

  postLogin = async (submitData: register) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.208:8082/login`,
      '',
      submitData
    );
    return data;
  }

  postProductDatabase= async (submitData: Product) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.208:8082/productDatabase`,
      '',
      submitData
    );
    return data;
  }

  postProductFilter= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.208:8082/productFilter`,
      '',
      submitData
    );
    return data;
  }

  postChartData= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.208:8082/chartData`,
      '',
      submitData
    );
    return data;
  }

  postCreateChart= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.208:8082/createChart`,
      '',
      submitData
    );
    return data;
  }

  postUploadChart= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'POST',
      `http://192.168.23.208:8082/uploadChart`,
      '',
      submitData
    );
    return data;
  }

  postDeleteChart= async (submitData: Cargo) => {
    let data = await fetchApi_AuthData(
      'Delete',
      `http://192.168.23.208:8082/deleteChart`,
      '',
      submitData
    );
    return data;
  }
}

export default new Service()