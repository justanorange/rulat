import { useEffect, useState } from 'react';

import { hapticFeedback } from '@shared/lib/haptics';
import { X, Mic } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface TextInputProps {
  text: string;
  setText: (text: string) => void;
}

export const TextInput = ({ setText }: TextInputProps) => {
  const {
    isListening,
    interimTranscript,
    newTranscript,
    startListening,
    stopListening,
    clearNewTranscript,
  } = useSpeechRecognition();

  const [input, setInput] = useState('');
  
  const handleMic = () => {
    hapticFeedback();

    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    const convert = () => {
      if (input.trim() === '') {
        setText('');
        return;
      }
      setText(input);
    };
    const timeoutId = setTimeout(convert, 300);
    return () => clearTimeout(timeoutId);
  }, [input]);

  useEffect(() => {
    if (newTranscript) {
      setInput(newTranscript);
      clearNewTranscript();
    }
  }, [newTranscript, setInput, clearNewTranscript]);

  const handleClear = () => {
    hapticFeedback();
    setInput('');
  };

  return (
    <div className="flex flex-col gap-6 flex-1">
      {/* Text area / transcription preview */}
      <div className="
        relative
        flex-1 p-6
        flex justify-items-stretch
        bg-zinc-50 dark:bg-zinc-800 rounded-2xl
      ">
        {/* Transcript */}
        {isListening && interimTranscript && (
          <div className="text-sm tracking-tight font-normal text-yellow-500 italic">
            "{interimTranscript}"
          </div>
        )}
        
        {/* Textarea */}
        {!isListening && (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Введите текст..."
            className="w-full resize-none focus:outline-none bg-transparent"
          />
        )}
        
      </div>
      <div className="flex justify-center items-center relative">
        <button
          type="button"
          onClick={handleMic}
          className={`p-4 rounded-full border-2 border-red-700 dark:border-red-800 transition-colors ${isListening ? "bg-red-700 dark:bg-red-800 text-white" : "text-red-700 dark:text-red-800"}`}
        >
          <Mic size={24} />
        </button>
        {input !== '' && (
          <button
            type="button"
            onClick={handleClear}
            className="
              absolute left-0 top-2.5
              flex items-center gap-1
              p-2 rounded-full
              hover:bg-gray-200 dark:hover:bg-gray-700
            "
          >
            <X size={20} />
            <span>Очистить</span>
          </button>
        )}
      </div>
    </div>
  );
};
