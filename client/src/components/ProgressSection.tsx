interface ProgressSectionProps {
  current: number;
  total: number;
  percentage: number;
}

export const ProgressSection = ({ current, total, percentage }: ProgressSectionProps) => {
  const progressLabel = `Assessment progress: ${current} of ${total} questions completed, ${percentage} percent`;
  
  return (
    <section className="bg-card dark:bg-card rounded-lg shadow-md p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8" aria-labelledby="progress-title">
      <h2 id="progress-title" className="text-base sm:text-lg font-semibold text-card-foreground mb-3 sm:mb-4">Assessment Progress</h2>
      <div className="space-y-3 sm:space-y-4" aria-live="polite" aria-atomic="true">
        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
          <span>Question <span data-testid="text-current-question">{current}</span> of <span data-testid="text-total-questions">{total}</span></span>
          <span data-testid="text-progress-percentage" className="font-medium">{percentage}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5 sm:h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-secondary to-primary transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={progressLabel}
            data-testid="progress-bar"
          />
        </div>
      </div>
    </section>
  );
};
