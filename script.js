async function generateLetter() {
    const name = document.getElementById("name").value || "Dear Friend";
    const mood = document.getElementById("mood").value;
    const senderName = "Programmer_AD"; // sender name
    const apiKey = "AIzaSyCm39M8zTTYKS_WVsWYrKa0Ikgq54ElSA4"; 

    // Generate prompt based on mood
    let prompt = `Write a positive and uplifting message for my friend ${name}. 
    Keep it friendly, encouraging, and full of good vibes. 
    End the message with "Lots of love, ${senderName}".`;

    if (mood === "romantic") {
        prompt = `Write a romantic love letter for my dear ${name}. Make it poetic, heartfelt, and deeply emotional. Express love, admiration, and devotion. Keep simple english that can be understood by indians.  End with "Forever yours, ${senderName}".`;
    } else if (mood === "funny") {
        prompt = `Write a funny and playful love letter for ${name}. Add humor, witty compliments, and light-hearted jokes. Make it entertaining yet sweet. Keep simple english that can be understood by indians. End with "Your hilarious admirer, ${senderName}".`;
    } else if (mood === "self-love") {
        prompt = `Write a self-love letter to ${name}, encouraging them to appreciate themselves. Boost their confidence with uplifting words. Make it warm, inspiring, and self-empowering. Keep simple english that can be understood by indians.  End with "With love, ${senderName}".`;
    } else if (mood === "sarcastic") {
        prompt = `Write a sarcastic love letter to ${name}. Be playful with over-the-top exaggerations and funny jabs. Make it sound dramatic yet fun. Keep simple english that can be understood by indians.  End with "Your most 'sincere' admirer, ${senderName}".`;
    }

    document.getElementById("letter").innerHTML = "Generating... 💌";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", JSON.stringify(data, null, 2));

        // Extract the generated text
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
            let generatedText = data.candidates[0].content.parts?.[0]?.text || "AI couldn't generate a message. Try again!";
            
            // Replace placeholder [Your name] with the sender's actual name
            generatedText = generatedText.replace("[Your name]", senderName);

            document.getElementById("letter").innerHTML = generatedText;
        } else {
            document.getElementById("letter").innerHTML = "No valid response from AI. Try again!";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("letter").innerHTML = "Oops! Something went wrong. 😢 Check the console for errors.";
    }
}
