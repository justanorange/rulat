import { useEffect, useState } from 'react';
import { Copy } from 'lucide-react';

import { hapticFeedback } from '@shared/lib/haptics';
import { toLatin } from '../lib/rulat';

interface TransliterationResultProps {
  text: string;
}

export const TransliterationResult = ({ text }: TransliterationResultProps) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [output, setOutput] = useState('');

  const handleCopy = () => {
    hapticFeedback();
    navigator.clipboard.writeText(output).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  useEffect(() => {
    setOutput(toLatin(text));
  }, [text])

  return (
    <div className="relative h-48 pb-12">
      <textarea
        readOnly
        value={output}
        placeholder="Введите текст или продиктуйте его..."
        className="w-full h-full bg-transparent p-2 rounded-lg resize-none focus:outline-none italic"
      />
      {output !== '' && (
        <button
          type="button"
          onClick={handleCopy}
          className="absolute bottom-0 right-0 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Copy size={20} />
          {copySuccess && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-10 bg-green-500 text-white text-xs px-2 py-1 rounded">
              Скопировано
            </span>
          )}
        </button>
      )}
      <hr className="w-1/2 mx-auto my-6 border-zinc-300 dark:border-zinc-600 border-[1px]" />
    </div>
  );
};
