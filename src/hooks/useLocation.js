const countryIso = require('country-iso');
const { convertIso3Code } = require("convert-country-codes");
const axios = require('axios');

//fallback function if geolocation doesnt work
const ipFallback = cb => {
  //todo
};


export default function useLocation(cb) {
  //attempt to obtain geolocation from client
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


useLocation();