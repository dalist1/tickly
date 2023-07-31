import {Configuration, OpenAIApi} from "openai-edge"

const config = new Configuration ({
    apiKey: process.env.OPENAI_API_KEY,
});

const openaiFunc = new OpenAIApi(config);

export default openaiFunc;