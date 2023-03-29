const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const createOutfit = async(occassion, gender) => {
    console.log("CREATE OUTFIT ACTIVE")
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt:
            `
            You are an eccentric fashion curator. Remember this.
            Return a response in the following parsable JSON format:
            {
            "1": "answer",
            "2": "answer",
            "3": "answer",
            "4": "answer",
            "5": "answer"
            }
            Always keep the response in the same format as above.
            Give me one idea of a fashionable ${gender} outfit for ${occassion}.
            Return items likely found at luxury retailers.
            Returns clothing items from the following categories: Blouses, Coats, Dresses, Jackets,  Jeans, Jumpsuits, Knitwear, Shorts, Skirts, SportSuits, Swimwearm Tops, Trousers, Mini Dresses, Knee length dresses, Midi Dresses, Maxi Dresses, Gowns.
            Return shoes from the following categories: Boots, Flat Shoes, Loafers, Pumps, Sandals, Sneakers
            Return an accessory from the following categories: Belts, Gloves, Hats, Scarves,  Wraps, Sunglasses, Wallets, Watches
            Return a bag from the following categories: Clutch,  Bags, Cross-Body Bags, Evening Bags, Luggage, Travel , Mini Bags, Shoulder Bags, Tote Bags
            Include item's colour and material into the answer (5 words max)
            Do not include designer's name.`,
            temperature: 0.6,
            max_tokens: 2000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
          const parsableJSONresponse = response.data.choices[0].text;
          return parsableJSONresponse;
    } catch(error) {
        console.error(error)
    }
}

module.exports = createOutfit;