import { ThemeToggle } from '@/components/themeToggle';

export const Header = () => {
  return (
    <header className='h-16 px-layout bg-header shadow rounded-b-xl flex items-center justify-between'>
      <h1 className='font-700 text-xl tracking-[.5rem]'>Food Planner</h1>
      <ThemeToggle />
    </header>
  );
};
