const countryIso = require('country-iso');
const { convertIso3Code } = require("convert-country-codes");
const axios = require('axios');

const API_SERVER = process.env.REACT_APP_API_SERVER;

// Fallback function if geolocation doesnt work
const ipFallback = cb => {
  axios.get(`${API_SERVER}/country`)
    .then(r => cb(r.data.data));
};

/**
 * Get's ISO 2 code for country that user is in
 * @param {function} cb callback function that is passed an iso2 code when recieved
 */
export default function useLocation(cb) {

  // Attempt to obtain geolocation from client
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(x => {
      const iso3 = countryIso.get(x.coords.latitude, x.coords.longitude);
      const { iso2 } = convertIso3Code(iso3);
      cb(iso2);
      
    }, () => {
      ipFallback(cb);
    });

  } else {
    ipFallback(cb);
  }

}