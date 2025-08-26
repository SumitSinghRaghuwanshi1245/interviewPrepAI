const { GoogleGenAI } = require("@google/genai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// @desc  Generate interview questions and answer using Gemini
// @route POST /api/ai/generate-questions
// @access  Private

const genertaeInterviewQuestions = async (req, res) => {
    try {

        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if(! role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required Fields"})
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });
        let rawText = response.text;

        // clean it: Remove ```json and ``` from beginning to end 

        const cleanedText = rawText
        .replace(/^```json\s*/, "")           // remove starting ``` json
        .replace(/```$/, "")                 // Remove ending ```
        .trim();                           // reomve extra spaces

        //  now safe to parse 
        const data = JSON.parse(cleanedText);

        res.status(200).json(data);

        
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        });
        
    }
};


// @desc  Generate interview questions and answer using Gemini
// @route POST /api/ai/generate-questions
// @access  Private

const generateConceptExplanation = async (req, res) => {
    try {
        const {question} = req.body;

        if (!question){
            return res.status(400).json({ message : "Missing required fields"});
        }

        const prompt = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,   
        });

        const rawText =  response.text;

        // clean it: Remove ```json and ``` from beginning to end 

        const cleanedText = rawText
        .replace(/^```json\s*/, "")           // remove starting ``` json
        .replace(/```$/, "")                 // Remove ending ```
        .trim();                           // reomve extra spaces

        //  now safe to parse 
        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
        
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        });
        
    }
};


module.exports = { generateConceptExplanation, genertaeInterviewQuestions};
