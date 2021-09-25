import axios from 'axios';

const OWNERS_URL = '/owners/';

class OwnerService {
  getOwners = async () => {
    return await axios.get(OWNERS_URL);
  };
  createOwner = async (data) => {
    return await axios.post(OWNERS_URL, data);
  };
  updateOwner = async (data) => {
    return await axios.put(OWNERS_URL + data.id, data);
  };
  deleteOwner = async (id) => {
    return await axios.delete(OWNERS_URL + id);
  };
}

export default new OwnerService();
