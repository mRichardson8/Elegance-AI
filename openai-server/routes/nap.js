const axios = require("axios");

const napResponse = async(outfitRequest, gender) => {
    console.log("im here")
    try {
      const response =  await axios.post('https://ynap-server.onrender.com/search', {
            body: {
                gender: gender,
                outfitRequest: outfitRequest, 
            }
        });

        console.log(response);
        return response.data; 
    }
    catch(error) {
        console.error(error);
    }
}

module.exports = napResponse;