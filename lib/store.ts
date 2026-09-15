"use client";

import { useEffect, useState } from "react";

export type BookMetadata = {
  chapter_title: string;
  overall_tone: string;
  art_style_preset: string;
  estimated_listen_time_minutes: number;
};

export type Scene = {
  scene_index: number;
  camera_motion: string;
  image_prompt: string;
  narration_script: string;
  dialogue_tone: string;
  ambient_sfx: string;
};

export type Gamification = {
  xp_reward: number;
  comprehension_quiz: {
    question: string;
    options: string[];
    correct_option_index: number;
    explanation: string;
  }[];
};

export type Story = {
  id: string;
  title: string;
  book_type: string;
  metadata: BookMetadata;
  scenes: Scene[];
  gamification: Gamification;
  created_at: number;
};

export const useStoryStore = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("storymotion_stories");
    if (stored) {
      setStories(JSON.parse(stored));
    }
    setIsLoaded(true);
  }, []);

  const addStory = (story: Omit<Story, "id" | "created_at">) => {
    const newStory: Story = {
      ...story,
      id: crypto.randomUUID(),
      created_at: Date.now(),
    };
    const updated = [...stories, newStory];
    setStories(updated);
    localStorage.setItem("storymotion_stories", JSON.stringify(updated));
    return newStory;
  };

  const getStory = (id: string) => {
    return stories.find((s) => s.id === id);
  };

  return {
    stories,
    isLoaded,
    addStory,
    getStory,
  };
};
