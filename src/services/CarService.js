import axios from 'axios';

const CARS_URL = '/cars/';
class CarService {
  getCars = async (carId = '') => {
    return await axios.get(CARS_URL + carId);
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
}

export default new CarService();
