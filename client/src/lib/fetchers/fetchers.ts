import axios from "axios";

export async function postProducts(){
  const data = await fetch('http://localhost:1337/openai')
    const products = await data.json()
    console.log("post products", products)
    return products
}



export const createOutfit = async ({ searchTerm, gender }: any) => {
    const response = await axios.post("http://localhost:1337/openai", {
      // const response = await axios.post("http://localhost:3000/api/createOutfit", {
      searchTerm,
      gender,
    });
    return response.data;
  };
  