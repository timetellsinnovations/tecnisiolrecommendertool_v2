import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = "Loading next question..." }: LoadingStateProps) => {
  return (
    <div className="bg-card dark:bg-card rounded-lg shadow-lg p-8 text-center" aria-live="polite" aria-label={message} data-testid="loading-state">
      <div className="pulse-gentle">
        <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" aria-hidden="true" />
        </div>
        <p className="text-muted-foreground" data-testid="text-loading-message">{message}</p>
      </div>
    </div>
  );
};
