import axios from 'axios';
import { useCookies } from 'react-cookie';

const API_SERVER = '//localhost:3000';

export default (toCountry, content) => {
  const [cookies] = useCookies(['user']);

  return axios.post(`${API_SERVER}/users/${cookies.id}/letters/`, {
    from_country_code: cookies.country.toUpperCase(),
    to_country_code: toCountry.toUpperCase(),
    content
  });
};