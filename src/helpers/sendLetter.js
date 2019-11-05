import axios from 'axios';

const API_SERVER = process.env.REACT_APP_API_SERVER;

/**
 * @param {*} userId 
 * @param {*} fromCountry 
 * @param {*} toCountry 
 * @param {*} content 
 * @param {*} idOfRepliedLetter
 */
export default function(userId, fromCountry, toCountry, content, idOfRepliedLetter = null) {
  return axios.post(`${API_SERVER}/users/${userId}/letters/`, {
    from_country_code: fromCountry.toUpperCase(),
    to_country_code: toCountry.toUpperCase(),
    content: content,
    letter_replied_to: idOfRepliedLetter,
    reply: idOfRepliedLetter ? true : false
  });
}



