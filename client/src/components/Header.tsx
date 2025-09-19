import { Settings } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export const Header = () => {
  const handleAccessibilityMenu = () => {
    // TODO: Implement accessibility menu with font size, contrast options
    console.log('Accessibility menu activated');
  };

  return (
    <header className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground sticky top-0 z-40 shadow-lg" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-foreground rounded-full flex items-center justify-center text-primary font-bold text-lg" aria-hidden="true">
              T
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">TECNIS® IOL Selection Tool</h1>
              <p className="text-sm opacity-90 hidden sm:block">Patient Education Guide</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            <button 
              onClick={handleAccessibilityMenu}
              className="p-2 rounded-md hover:bg-primary-foreground/10 focus-ring transition-colors"
              aria-label="Accessibility options"
              aria-expanded="false"
              aria-haspopup="true"
              data-testid="button-accessibility-menu"
            >
              <Settings className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
