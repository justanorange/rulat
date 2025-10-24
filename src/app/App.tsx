import { useState } from 'react';

import { Header } from '@widgets/header/ui/Header';
import { TransliterationResult } from '@/features/transliteration-result/ui/TransliterationResult';
import { TextInput } from '@/features/text-input/ui/TextInput';

import './assets/App.css'

function App() {
  const [text, setText] = useState('');

  return (
    <>
      <Header />

      <div className="
        flex flex-col items-stretch
        overflow-hidden mx-6 mb-6 space-y-3
      ">
        <TransliterationResult text={text} />
        <TextInput text={text} setText={setText} />
      </div>
    </>
  )
}

export default App
