import { WORD_LISTS } from '../constants/wordLists';

export function generateNGWord(topic: string): string {
  const wordList = WORD_LISTS[topic as keyof typeof WORD_LISTS];
  
  if (!wordList) {
    throw new Error(`Invalid topic: ${topic}`);
  }
  
  return wordList[Math.floor(Math.random() * wordList.length)];
}