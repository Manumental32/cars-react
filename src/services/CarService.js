import axios from 'axios';

const CARS_URL = '/cars/';
const SERVICES_URL = '/services/';

class CarService {
  getCars = async () => {
    return await axios.get(CARS_URL);
  };
  createCar = async (data) => {
    return await axios.post(CARS_URL, data);
  };
  updateCar = async (data) => {
    return await axios.put(CARS_URL + data.id, data);
  };
  deleteCar = async (id) => {
    return await axios.delete(CARS_URL + id);
  };

  getServices = async () => {
    return await axios.get(SERVICES_URL);
  };
}

export default new CarService();
