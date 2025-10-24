import { Github } from 'lucide-react';

import { Logo } from '@/widgets/logo/ui/Logo';
import { ThemeMode } from '@/widgets/theme-mode/ui/ThemeMode';

export const Header = () => {
  return (
    <header className="p-6 flex items-center gap-6">
      <div className="flex gap-2">
        <Logo />
        <h1
          className="
            text-4xl
            font-bold
          "
        >
        </h1>
      </div>
      <div className="ml-auto">
        <ThemeMode />
      </div>
      <a href="https://github.com/justanorange/rulat" target="_blank"><Github /></a>
    </header>
  )
}
