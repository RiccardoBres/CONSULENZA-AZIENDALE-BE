/* const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/api/openai', async (req, res) => {
    const companyString = req.body.company;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a consultant helping businesses to grow and succeed. You should provide detailed advice based on the company data provided.' },
                { role: 'user', content: companyString }
            ]
        }, {
            headers: {
                'Organization': process.env.OPENAI_ORGANIZATION_ID,
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        res.json({
            success: true,
            message: response.data.choices[0].message.content
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
});

module.exports = router;
 */