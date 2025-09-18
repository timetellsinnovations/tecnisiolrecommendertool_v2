import { useState, useEffect } from 'react';
import { AlertCircle, RotateCcw, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SavedProgressNotificationProps {
  hasSavedProgress: boolean;
  onResumeProgress: () => void;
  onStartFresh: () => void;
}

export const SavedProgressNotification = ({
  hasSavedProgress,
  onResumeProgress,
  onStartFresh
}: SavedProgressNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(hasSavedProgress);
  }, [hasSavedProgress]);

  if (!isVisible) return null;

  const handleResume = () => {
    onResumeProgress();
    setIsVisible(false);
  };

  const handleStartFresh = () => {
    onStartFresh();
    setIsVisible(false);
  };

  return (
    <div className="animate-fade-in mb-6">
      <Alert className="border-accent bg-accent/5 dark:bg-accent/10" data-testid="alert-saved-progress">
        <AlertCircle className="h-4 w-4 text-accent" aria-hidden="true" />
        <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-card-foreground">
            <strong>Previous Assessment Found</strong>
            <p className="text-sm text-muted-foreground mt-1">
              You have a partially completed assessment. Would you like to continue where you left off or start fresh?
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
            <Button
              onClick={handleResume}
              variant="default"
              size="sm"
              className="flex items-center gap-2"
              data-testid="button-resume-assessment"
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              Resume Assessment
            </Button>
            <Button
              onClick={handleStartFresh}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              data-testid="button-start-fresh"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              Start Fresh
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};