import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

// Using Gemini API Key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });

const systemInstruction = `You are the "StoryMotion Director Engine" — an elite multimodal narrative producer for an interactive phygital reading web application.

Your objective:
Ingest raw literary text (books, magazines, newspapers) and transform it into an episodic, animated visual novel specification ready for client-side rendering, neural Text-to-Speech (TTS), and gamified comprehension.

Core Execution Rules:
1. SCENE SEGMENTATION: Break the chapter into cinematic beats (100–250 words each). Each beat represents a key visual moment that can hold a reader's attention for 15–30 seconds.
2. VISUAL CONSISTENCY (PROMPT ENGINEERING): 
   - Define a consistent art style (e.g., "cinematic graphic novel, moody atmospheric lighting, cel-shaded, detailed digital illustration, 8k").
   - Every scene's \`image_prompt\` must describe subjects, camera framing (wide, close-up, Dutch angle), background environment, color palette, and lighting to ensure image generation models maintain visual continuity across scenes.
   - Do NOT include text, speech bubbles, or watermark descriptions in image prompts.
3. NARRATION EXTRACTION:
   - Provide a clean, read-aloud script for neural TTS synthesis. Strip out page numbers, footnotes, and formatting artifacts.
   - Mark dialogue with emotional delivery tags (e.g., [whispering], [agitated], [calm narration]).
4. AMBIENCE & AUDIO CUES:
   - Specify ambient background sound design for each beat (e.g., "heavy rain against window, distant thunder, low cello drone").
5. GAMIFICATION & RETENTION:
   - At the end of the chapter, generate 3 multiple-choice comprehension questions with difficulty ratings and instant feedback explanations.

You must output STRICT JSON matching the provided schema. Do not wrap with conversational text.`;

export async function POST(req: Request) {
  try {
    const { rawText, artStyle } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      // Mock response if no API key is provided (for testing UI)
      return NextResponse.json({
        book_metadata: {
          chapter_title: "Mock Chapter",
          overall_tone: "Mysterious",
          art_style_preset: artStyle || "Dark Fantasy",
          estimated_listen_time_minutes: 2
        },
        scenes: [
          {
            scene_index: 1,
            camera_motion: "pan_right",
            image_prompt: "A dark mystical forest with glowing blue mushrooms, cinematic lighting",
            narration_script: "The forest was unusually quiet.",
            dialogue_tone: "[calm narration]",
            ambient_sfx: "low wind rustling leaves"
          }
        ],
        gamification: {
          xp_reward: 50,
          comprehension_quiz: [
            {
              question: "What color were the mushrooms?",
              options: ["Red", "Blue", "Green", "Yellow"],
              correct_option_index: 1,
              explanation: "The text describes glowing blue mushrooms."
            }
          ]
        }
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `Art Style: ${artStyle || "Cinematic Graphic Novel"}\n\nChapter Text:\n${rawText}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.3,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            book_metadata: {
              type: Type.OBJECT,
              properties: {
                chapter_title: { type: Type.STRING },
                overall_tone: { type: Type.STRING },
                art_style_preset: { type: Type.STRING },
                estimated_listen_time_minutes: { type: Type.NUMBER }
              },
              required: ["chapter_title", "overall_tone", "art_style_preset", "estimated_listen_time_minutes"]
            },
            scenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  scene_index: { type: Type.INTEGER },
                  camera_motion: { 
                    type: Type.STRING, 
                    description: "Camera effect for frontend: zoom_in, pan_left, pan_right, tilt_up" 
                  },
                  image_prompt: { 
                    type: Type.STRING, 
                    description: "Midjourney/Flux/SDXL prompt including subject, style, lighting, composition" 
                  },
                  narration_script: { 
                    type: Type.STRING, 
                    description: "Polished text for TTS voiceover" 
                  },
                  dialogue_tone: { type: Type.STRING },
                  ambient_sfx: { type: Type.STRING }
                },
                required: ["scene_index", "camera_motion", "image_prompt", "narration_script", "dialogue_tone", "ambient_sfx"]
              }
            },
            gamification: {
              type: Type.OBJECT,
              properties: {
                xp_reward: { type: Type.INTEGER },
                comprehension_quiz: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      question: { type: Type.STRING },
                      options: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                      },
                      correct_option_index: { type: Type.INTEGER },
                      explanation: { type: Type.STRING }
                    },
                    required: ["question", "options", "correct_option_index", "explanation"]
                  }
                }
              },
              required: ["xp_reward", "comprehension_quiz"]
            }
          },
          required: ["book_metadata", "scenes", "gamification"]
        }
      },
    });

    if (!response.text) {
        throw new Error("No response text from Gemini API");
    }
    const parsedData = JSON.parse(response.text);
    return NextResponse.json(parsedData);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
