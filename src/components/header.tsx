import { ThemeToggle } from '@/components/themeToggle';
import LanguageSwitcher from '@/components/languageSwitcher';

export const Header = () => {
  return (
    <header className='h-16 px-layout bg-header shadow rounded-b-xl flex items-center justify-between'>
      <h1 className='font-700 text-xl tracking-[.5rem]'>Food Planner</h1>
      <div className='flex w-[125px] items-center justify-between p-1 rounded-2xl text-sm bg-main shadow dark:text-white '>
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </header>
  );
};
