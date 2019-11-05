import axios from 'axios';
import { useCookies } from 'react-cookie';

const API_SERVER = process.env.REACT_APP_API_SERVER;

export default (toCountry, content) => {
  const [cookies] = useCookies(['user']);

  return axios.post(`${API_SERVER}/users/${cookies.id}/letters/`, {
    from_country_code: cookies.country.toUpperCase(),
    to_country_code: toCountry.toUpperCase(),
    content
  });
};