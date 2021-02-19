import { useStore } from '../../../stores/typingStore';

export const awesomeTypingStore = () => {
  const { userName } = useStore();
  return { userName };
};
