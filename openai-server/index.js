/*CONFIGURATIONS */
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const createOutfit = require('./routes/openai');
const napResponse = require('./routes/nap')
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }))

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.post('/openai', async (req, res) => {
    try{
        const {searchTerm, gender} = req.body;
        const openAiResponse = await createOutfit(searchTerm, gender);
        const napResponse2 = await napResponse(openAiResponse, gender);
        console.log("openai response", openAiResponse);
        console.log("nap server response", napResponse2);
        res.send(napResponse2);
    } catch (err) {
        console.error(err);
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);