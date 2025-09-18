interface ProgressSectionProps {
  current: number;
  total: number;
  percentage: number;
}

export const ProgressSection = ({ current, total, percentage }: ProgressSectionProps) => {
  return (
    <section className="bg-card dark:bg-card rounded-lg shadow-md p-6 mb-8" aria-labelledby="progress-title">
      <h2 id="progress-title" className="text-lg font-semibold text-card-foreground mb-4">Assessment Progress</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Question <span data-testid="text-current-question">{current}</span> of <span data-testid="text-total-questions">{total}</span></span>
          <span data-testid="text-progress-percentage">{percentage}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-secondary to-primary transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-labelledby="progress-title"
            data-testid="progress-bar"
          />
        </div>
      </div>
    </section>
  );
};
