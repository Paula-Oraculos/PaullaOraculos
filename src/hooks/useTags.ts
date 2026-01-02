import { useState, useCallback } from 'react';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

const STORAGE_KEY = 'paula-tags';

const DEFAULT_TAGS: Tag[] = [
  { id: '1', name: 'VIP', color: '#C9A24D' },
  { id: '2', name: 'Mentoria', color: '#8A9A5B' },
  { id: '3', name: 'Energia Blindada', color: '#B87333' },
  { id: '4', name: 'TikTok', color: '#ff0050' },
  { id: '5', name: 'Interessado', color: '#3B82F6' },
  { id: '6', name: 'Pagou', color: '#22C55E' },
];

const getStoredTags = (): Tag[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_TAGS;
  } catch {
    return DEFAULT_TAGS;
  }
};

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>(getStoredTags);

  const saveTags = (newTags: Tag[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTags));
    setTags(newTags);
  };

  const addTag = useCallback((name: string, color: string) => {
    const newTag: Tag = {
      id: Date.now().toString(),
      name,
      color,
    };
    saveTags([...tags, newTag]);
    return newTag;
  }, [tags]);

  const updateTag = useCallback((id: string, updates: Partial<Tag>) => {
    const updated = tags.map(t => t.id === id ? { ...t, ...updates } : t);
    saveTags(updated);
  }, [tags]);

  const deleteTag = useCallback((id: string) => {
    saveTags(tags.filter(t => t.id !== id));
  }, [tags]);

  return {
    tags,
    addTag,
    updateTag,
    deleteTag,
  };
};
