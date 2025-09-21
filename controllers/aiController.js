const Groq = require("groq-sdk");
const { UserStory } = require("../models");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.generateUserStories = async (req, res) => {
  const { projectDescription, projectId } = req.body;

  if (!projectDescription) {
    return res.status(400).json({ message: "Project description is required" });
  }

  try {
    // ✅ Use Groq’s latest supported model
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // updated from mixtral (decommissioned)
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates user stories from project descriptions.",
        },
        {
          role: "user",
          content: `Generate detailed user stories in the format: 
          As a [role], I want to [action], so that [benefit].
          
          Project description: ${projectDescription}`,
        },
      ],
    });

    // ✅ Extract response text safely
    const output =
      completion.choices?.[0]?.message?.content?.trim() || "";

    // ✅ Convert to array of user stories
    const stories = output
      .split("\n")
      .map((s) => s.replace(/^\d+\.?\s*/, "").trim()) // remove numbering like "1. ..."
      .filter((s) => s.length > 0);

    // ✅ Save stories in DB if projectId provided
    if (projectId) {
      for (let story of stories) {
        await UserStory.create({
          story,
          projectId,
        });
      }
    }

    return res.json({ stories });
  } catch (err) {
    console.error("Groq error:", err);

    // helpful error response
    return res.status(500).json({
      message: "Error generating user stories",
      error: err.message || "Unknown error",
    });
  }
};
// Sync the model with the database