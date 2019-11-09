import axios from 'axios';

const API_SERVER = process.env.REACT_APP_API_SERVER;

/**
 * @param {number/string} userId id of the user sending the letter
 * @param {string} fromCountry country code the letter is being sent from
 * @param {string} toCountry country code the letter is being sent to
 * @param {string} content letter content
 * @param {number/string} idOfRepliedLetters (optional)
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



