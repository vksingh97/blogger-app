const axios = require('axios');

module.exports = {
  chatGptCompletionApi: async ({ prompt, model }) => {
    console.log('inside');
    return await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages: [
          {
            role: 'system',
            content:
              'You are a good assistant who generates a simple summary of the prompt you are given and displays the user',
          },

          { role: 'user', content: `Generate summary for ${prompt}` },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
        },
      }
    );
  },
  chatGptDalleApi: async ({ prompt, model }) => {
    return await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        model,
        prompt,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
        },
      }
    );
  },
};
