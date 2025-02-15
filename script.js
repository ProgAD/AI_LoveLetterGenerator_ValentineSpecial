async function generateLetter() {
    const name = document.getElementById("name").value || "Mere Mitr";
    const mood = document.getElementById("mood").value;
    const senderName = "Programmer_AD"; // Sender name
    const apiKey = "AIzaSyCm39M8zTTYKS_WVsWYrKa0Ikgq54ElSA4"; // Replace with a valid API key

    // Improved prompts to avoid AI safety restrictions
    let prompt = "";
    switch (mood) {
        case "romantic":
            prompt = `Write a heartfelt letter to ${name} in a poetic and traditional Indian style.  
            Make it a message of admiration, companionship, and deep affection, like in classic Hindi poetry or Bollywood songs.  
            Include references to Indian elements like the moon, ghazals, Radha-Krishna, and timeless devotion.  
            It should feel like a respectful and warm note rather than an overly passionate love letter.  
            End with "Tumhara hamesha, ${senderName}".`;
            break;
        case "funny":
            prompt = `Write a humorous letter for ${name} with Indian-style humor.  
            Use desi jokes, funny references like Bollywood dialogues, chai, and jugaad.  
            Keep it witty and lighthearted while showing appreciation.  
            End with "Tera filmy dost, ${senderName}".`;
            break;
        case "self-love":
            prompt = `Write an uplifting self-appreciation letter for ${name}, rooted in Indian culture.  
            Include elements of mindfulness, spirituality, and self-care from Indian traditions like yoga and meditation.  
            Encourage self-worth using wisdom from ancient Indian teachings.  
            End with "Apne aap se pyaar karo, ${senderName}".`;
            break;
        case "sarcastic":
            prompt = `Write a playful and sarcastic letter for ${name} in an Indian desi style.  
            Use humorous taunts like "Shaadi kab kar rahe ho?" or "Kahan kho gaye ho, WhatsApp pe last seen bhi nahi hai!".  
            Keep it fun, engaging, and friendly.  
            End with "Tumhara nakhrebaaz dost, ${senderName}".`;
            break;
        default:
            prompt = `Write a warm and uplifting letter for ${name}, inspired by Indian traditions.  
            Use a respectful and friendly tone with positive words.  
            End with "Pyaar bhari shubhkamnayein, ${senderName}".`;
    }

    document.getElementById("letter").innerHTML = "Generating... 💌";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
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

        // Handle AI safety blocking
        if (data.candidates?.[0]?.finishReason === "SAFETY") {
            document.getElementById("letter").innerHTML = "⚠️ AI restricted this response. Try a different mood!";
            return;
        }

        // Extract AI-generated text
        let generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "AI couldn't generate a message. Try again!";
        const formattedText = generatedText.replace(/\n/g, "<br>");
        document.getElementById("letter").innerHTML = formattedText;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("letter").innerHTML = "⚠️ Error fetching response. Check API key or try again later.";
    }
}
