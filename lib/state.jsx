import { useState } from 'react';

export function useEmotionState(defaultValue = '') {
  const [emotion, setEmotion] = useState(defaultValue);
  return { emotion, setEmotion };
}
