import axios from 'axios';

const SERVICES_URL = '/services/';

class ServiceService {
  getServices = async () => {
    return await axios.get(SERVICES_URL);
  };
}

export default new ServiceService();
