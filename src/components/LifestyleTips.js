import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LifestyleTips = ({ weatherData }) => {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (weatherData) {
            fetchLifestyleTips();
        }
    }, [weatherData]); // Fetch tips whenever the weatherData changes

    const fetchLifestyleTips = async () => {
        setLoading(true);
        
        try {
            const apiKey = process.env.REACT_APP_GEMINI_API_KEY; // Ensure your Google API key is in the environment variables
            const weatherCondition = weatherData.weather[0].main; // e.g., "Rain", "Clear", etc.

            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            const body = {
                contents: [
                    {
                        parts: [
                            {
                                text: `Give me lifestyle tips for ${weatherCondition} weather in json format with reacticons for each.`
                            }
                        ]
                    }
                ]
            };

            const response = await axios.post(url, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Raw API response:', response.data);

            // Extract the text from the response
            let rawText = response.data.candidates[0].content.parts[0].text;

            // Remove Markdown code block markers
            rawText = rawText.replace(/```json|```/g, '').trim();

            // Parse the cleaned string as JSON
            const jsonResponse = JSON.parse(rawText);

            // Combine all categories of tips
            const combinedTips = [];

            // Iterate over each key and add the items into combinedTips array
            for (const key in jsonResponse) {
                if (Array.isArray(jsonResponse[key])) {
                    jsonResponse[key].forEach(item => {
                        if (typeof item === 'string') {
                            combinedTips.push({ title: key, description: item });
                        } else {
                            combinedTips.push(item);
                        }
                    });
                }
            }

            setTips(combinedTips);
        } catch (error) {
            console.error('Error fetching lifestyle tips:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="lifestyle-tips">
            <h3 className="tips-title">Lifestyle Tips</h3>
            <div className="tips-container">
                {tips.map((tip, index) => (
                    <div className="tip-card" key={index}>
                        <div className="tip-icon">{tip.reacticon}</div>
                        <div className="tip-content">
                            <h4 className="tip-title">{tip.tip}</h4>
                            <p className="tip-description">{tip.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LifestyleTips;
