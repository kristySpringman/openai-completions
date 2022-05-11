import { Configuration, OpenAIApi } from "openai";
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {prompt} = req.body
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    let openAiResponse
    try {
        openAiResponse = await openai.createCompletion("text-curie-001", {
            prompt: prompt,
            temperature: 0,
            max_tokens: 6,
        });
    } catch (error) {
        res.status(500)
        if (error.response) {
            res.status(error.response.status)
            res.json({ response: error.response.data.error.message })
        } else {
            res.json({ response: "OpenAI API Error - Unknown Error" })
        }
        return
    }

    if (openAiResponse.status == 200) {
        res.status(200)
        res.json({ response: openAiResponse.data.choices[0].text})

    } else {
        res.status(openAiResponse.status)
        res.json({ response: openAiResponse.data.choices[0].text })
    }
}