import openaiFunc from "@/lib/utils/openai";

export const runtime = 'edge';
export const fetchCache = 'force-no-store'

export async function GET(Request) {
    const response = await openaiFunc.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "Your role is to respond only with productivity strategies ONLY in this JSON structure with only the given keys: {\"name\":\"Pomodoro Technique\",\"taskTimeSeconds\":5400,\"breakTimeSeconds\":1200}" },
            { "role": "user", "content": "Generate a similar well known productivity technique. Make sure that name is correct alongside with the task time and break time." }
        ],
    });

    const result = await response.json();
    const completionString = result.choices[0].message.content;

    return new Response(completionString);
}