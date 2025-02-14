async function generateLetter() {
    const name = document.getElementById("name").value || "Dear Friend";
    const mood = document.getElementById("mood").value;
    const senderName = "Programmer_AD"; // sender name
    const apiKey = "AIzaSyD_yyi6zUkg691XyPK8e_DwLR7W5LYdc2k"; 

    // safe and friendly prompt
    const prompt = `Write a positive and uplifting message for my friend ${name}. 
    Keep it friendly, encouraging, and full of good vibes. 
    End the message with "Lots of love, ${senderName}".`;

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

        // extract
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
