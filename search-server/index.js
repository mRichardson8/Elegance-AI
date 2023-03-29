const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')

//Constants
const nap_config = {
    basePath : 'https://www.net-a-porter.com/en-us/shop/product/',
    searchAPI : 'http://lb.search.wcs.prd01.nap.ewe1.aws.prod.e-comm:9080/search/resources/store/nap_gb/sitecontent/productSuggestionsBySearchTerm/',
    searchAPI2: 'https://ecomm.ynap.biz/api/nap/search/resources/store/nap_gb/productview/bySearchTerm/',
    reccsAPI : 'http://lb.search.wcs.prd01.nap.ewe1.aws.prod.e-comm:9080/search/resources/store/nap_gb/productview/bySearchTerm/',
    store: 'Net-A-Porter',
}

const mrp_config = {
    basePath : 'https://www.mrporter.com/en-gb/mens/product/',
    searchAPI : 'http://lb.search.wcs.prd01.inseason.ewe1.aws.prod.e-comm:9080/search/resources/store/mrp_gb/sitecontent/productSuggestionsBySearchTerm/',
    reccsAPI : 'http://lb.search.wcs.prd01.inseason.ewe1.aws.prod.e-comm:9080/search/resources/store/mrp_gb/productview/bySearchTerm/',
    store: 'Mr-Porter'
}

//Routing
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World! Try using the /search path to get a result')
})

app.get('/search', async (req,res) => {
    res.send('Please try again using a POST request and attach the search term in teh body');
})

app.post('/search', async (req,res) => {
    console.log(req.body)
    const items = convertInputToJSON(req.body.body.outfitRequest)
    // items = req.body.body.outfitRequest
    console.log(req.body.body.outfitRequest)
    console.log(req.body.body.gender)
    const searchTerm = []
    searchTerm.push(items["1"]);
    searchTerm.push(items["2"]);
    searchTerm.push(items["3"]);
    searchTerm.push(items["4"]);
    searchTerm.push(items["5"]);
    const gender = req.body.body.gender;
    let config = setConfig(gender);
    let promises = []
    let toReturn = []
    searchTerm.forEach(async term => {
        promises.push(new Promise(async (resolve, reject)=>{
            let suggestions = await bySearchTerm(term, config)
            promises.push(suggestions);
            let items = [];
            suggestions.forEach(async element => {
                promises.push(new Promise((resolve, reject) => {
                    items.push({ 
                        'imageURL' : `https://${element.productColours[0].imageTemplate.replace("{view}/w{width}.jpg", "in/w1000.jpg").substring(2)}`,
                        'itemName' : element.shortDescription,
                        'designerName' : element.designerName,
                        'price' : `${element.price.currency.symbol}${element.price.sellingPrice.amount / element.price.sellingPrice.divisor}`,
                        'productLink' : `${config.basePath}${element.partNumber}`,
                        'partNumber' : `${element.partNumber}`,
                        'store' : `${config.store}`
                    });
                    resolve(1)
                }))
                resolve(1);
                });
                toReturn.push(items);

        }))
    });
    Promise.allSettled(promises).then(() => {
        res.send(toReturn);
        console.log("Response successfully sent")
    })
    console.log(toReturn)
});

//use this one with postman, it takes in standard json inputs that don't require formatting
app.post('/v2/search', async (req,res) => {
    // const items = convertInputToJSON(req.body.body.outfitRequest)
    items = req.body.body.outfitRequest
    console.log(req.body.body.outfitRequest)
    const searchTerm = []
    searchTerm.push(items["1"]);
    searchTerm.push(items["2"]);
    searchTerm.push(items["3"]);
    searchTerm.push(items["4"]);
    searchTerm.push(items["5"]);
    const gender = req.body.body.gender;
    let config = setConfig(gender);
    let promises = []
    let toReturn = []
    searchTerm.forEach(async term => {
        promises.push(new Promise(async (resolve, reject)=>{
            let suggestions = await bySearchTerm(term, config)
            promises.push(suggestions);
            let items = [];
            suggestions.forEach(async element => {
                promises.push(new Promise((resolve, reject) => {
                    items.push({ 
                        'imageURL' : `https://${element.productColours[0].imageTemplate.replace("{view}/w{width}.jpg", "in/w1000.jpg").substring(2)}`,
                        'itemName' : element.shortDescription,
                        'designerName' : element.designerName,
                        'price' : `${element.price.currency.symbol}${element.price.sellingPrice.amount / element.price.sellingPrice.divisor}`,
                        'productLink' : `${config.basePath}${element.partNumber}`,
                        'partNumber' : `${element.partNumber}`,
                        'store' : `${config.store}`
                    });
                    resolve(1)
                }))
                resolve(1);
                });
                toReturn.push(items);

        }))
    });
    Promise.allSettled(promises).then(() => {
        res.send(toReturn);
        console.log("Response successfully sent")
    })
    console.log(toReturn)
});


function setConfig(gender){
    let config;
    switch (gender) {
        case 'Male':
            config = mrp_config;
            break;
        case 'Female':
            config = nap_config;
            break;  
        default:
            config = nap_config;
            break;
    }
    return config;
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function bySearchTerm(term, config){
    console.log(`${config.searchAPI2}${term}`)
        let result = await axios.get(`${config.searchAPI2}${term}`,
        {
            headers: {
                "x-ibm-client-id": "95f14cbd-793e-46ec-9f76-6fac2fbb6683"
            },
            timeout: 5000
        });
        let data = await result.data.products
        if(data.length < 1 || data == undefined)    {
            return bySearchTerm(simplifyTerm(term), config)
        }
        return data.slice(0,3)
}

function simplifyTerm(term){
    let words = term.split(" ").filter(Boolean);
    if (words.length == 1){
        return "shoes"
    }
    return term.replace(`${words[words.length-1]}`, "")
}

async function byPartnumber(partNumber){
    let result = await axios.get(`http://lb.search.wcs.prd01.nap.ewe1.aws.prod.e-comm:9080/search/resources/store/nap_us/productview/${partNumber}`,
    {
        proxy: {
            protocol: 'http',
            host: 'internal-lb-core-svc-proxy-389545272.eu-west-1.elb.amazonaws.com'
        },
        timeout: 5000
    });
    console.log(`http://lb.search.wcs.prd01.nap.ewe1.aws.prod.e-comm:9080/search/resources/store/nap_us/productview/${partNumber}`)
    let data = await result.data.products[0]

    return data
}

function convertInputToJSON(inputString) {
    // Remove all unnecessary characters from the input string
    // const cleanedString = inputString.replace(/\s/g, '');
    const cleanedString = inputString

    // Extract the JSON object from the cleaned string
    const jsonStartIndex = cleanedString.indexOf('{');
    const jsonEndIndex = cleanedString.lastIndexOf('}');
    const jsonString = cleanedString.substring(jsonStartIndex, jsonEndIndex + 1);
  
    // Parse the JSON string into an object
    const jsonObject = JSON.parse(jsonString);
  
    // Return the parsed JSON object
    console.log(jsonObject)
    return jsonObject;
  }
  