import { ThemeToggle } from '@/components/ThemeToggle';
import { AccessibilityMenu } from '@/components/AccessibilityMenu';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground sticky top-0 z-40 shadow-lg" role="banner">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-foreground rounded-full flex items-center justify-center text-primary font-bold text-base sm:text-lg flex-shrink-0" aria-hidden="true">
              T
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold truncate leading-tight">TECNIS® IOL Selection Tool</h1>
              <p className="text-xs sm:text-sm opacity-90 hidden sm:block">Patient Education Guide</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <ThemeToggle />
            <AccessibilityMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
