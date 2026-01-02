import { useState, useCallback } from 'react';

export interface QueuePerson {
  id: string;
  name: string;
  phone: string;
  position: number;
  notes: string;
  enteredAt: string;
  photo?: string;
}

const STORAGE_KEY = 'paula-card-queue';

const getStoredQueue = (): QueuePerson[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const useCardQueue = () => {
  const [queue, setQueue] = useState<QueuePerson[]>(getStoredQueue);

  const saveQueue = (newQueue: QueuePerson[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newQueue));
    setQueue(newQueue);
  };

  const addToQueue = useCallback((person: Omit<QueuePerson, 'id' | 'position' | 'enteredAt' | 'notes'>) => {
    const newPerson: QueuePerson = {
      ...person,
      id: Date.now().toString(),
      position: queue.length + 1,
      notes: '',
      enteredAt: new Date().toISOString(),
    };
    saveQueue([...queue, newPerson]);
    return newPerson;
  }, [queue]);

  const removeFromQueue = useCallback((id: string) => {
    const filtered = queue.filter(p => p.id !== id);
    const reindexed = filtered.map((p, i) => ({ ...p, position: i + 1 }));
    saveQueue(reindexed);
  }, [queue]);

  const updateNotes = useCallback((id: string, notes: string) => {
    const updated = queue.map(p => p.id === id ? { ...p, notes } : p);
    saveQueue(updated);
  }, [queue]);

  const reorderQueue = useCallback((fromIndex: number, toIndex: number) => {
    const newQueue = [...queue];
    const [moved] = newQueue.splice(fromIndex, 1);
    newQueue.splice(toIndex, 0, moved);
    const reindexed = newQueue.map((p, i) => ({ ...p, position: i + 1 }));
    saveQueue(reindexed);
  }, [queue]);

  const moveToPosition = useCallback((id: string, newPosition: number) => {
    const currentIndex = queue.findIndex(p => p.id === id);
    if (currentIndex === -1) return;
    reorderQueue(currentIndex, newPosition - 1);
  }, [queue, reorderQueue]);

  const markAsServed = useCallback((id: string) => {
    removeFromQueue(id);
  }, [removeFromQueue]);

  return {
    queue,
    addToQueue,
    removeFromQueue,
    updateNotes,
    reorderQueue,
    moveToPosition,
    markAsServed,
  };
};
