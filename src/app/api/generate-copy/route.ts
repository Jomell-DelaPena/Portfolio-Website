import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

// Platform-specific guidance for the model
const platformGuides: Record<string, string> = {
  "facebook-ad":
    "Facebook Ad: primary text ~125 chars max, clear value prop, strong CTA, no clickbait",
  "email-subject":
    "Email subject line: under 50 chars, curiosity-driven, personalized feel, avoid spam trigger words",
  "website-hero":
    "Website hero section: punchy headline under 10 words + one supporting sentence (max 20 words)",
  instagram:
    "Instagram caption: conversational, emoji-friendly, ends with a question or CTA, hashtag-ready",
  "google-ad":
    "Google Ad: format as 'Headline (max 30 chars): Description (max 90 chars)' — two parts clearly separated",
};

export async function POST(req: NextRequest) {
  // Initialize lazily so the build doesn't fail without GROQ_API_KEY set
  const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

  try {
    const { product, description, audience, platform, tone } = await req.json();

    if (!product || !description || !audience || !platform || !tone) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content:
            "You are a world-class marketing copywriter. Always respond with valid JSON only — no markdown, no explanations, no extra text.",
        },
        {
          role: "user",
          content: `Generate exactly 3 distinct marketing copy variations.

Product/Service: ${product}
Description: ${description}
Target Audience: ${audience}
Platform rules: ${platformGuides[platform] ?? platform}
Tone: ${tone}

Each variation must sound different — vary the angle, hook, or structure.
Respond ONLY with this JSON format:
{
  "variations": [
    { "label": "Variation 1", "copy": "...", "note": "one short tip about what makes this version work" },
    { "label": "Variation 2", "copy": "...", "note": "one short tip about what makes this version work" },
    { "label": "Variation 3", "copy": "...", "note": "one short tip about what makes this version work" }
  ]
}`,
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "";

    // Strip markdown code fences if the model wraps the JSON
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    const data = JSON.parse(cleaned);

    return NextResponse.json(data);
  } catch (err) {
    console.error("[generate-copy]", err);
    return NextResponse.json(
      { error: "Generation failed. Please try again." },
      { status: 500 }
    );
  }
}
