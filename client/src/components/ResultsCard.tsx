import { CheckCircle, Check, Printer, RotateCcw } from 'lucide-react';
import { AssessmentResults } from '@/types/assessment';
import { Button } from '@/components/ui/button';

interface ResultsCardProps {
  results: AssessmentResults;
  onPrint: () => void;
  onRestart: () => void;
}

export const ResultsCard = ({ results, onPrint, onRestart }: ResultsCardProps) => {
  return (
    <div className="animate-fade-in bg-gradient-to-br from-accent/5 to-primary/5 dark:from-accent/10 dark:to-primary/10 rounded-lg shadow-lg p-6 sm:p-8 page-break-inside-avoid" role="region" aria-labelledby="results-title" data-testid="results-card">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-accent-foreground" aria-hidden="true" />
        </div>
        <h2 id="results-title" className="text-2xl font-bold text-card-foreground mb-2" data-testid="text-results-title">
          Assessment Complete
        </h2>
        <p className="text-muted-foreground">Here are your personalized IOL recommendations</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card dark:bg-card rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-card-foreground mb-3">Recommended IOL Type</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Primary Recommendation:</span>
              <span className="font-medium text-card-foreground" data-testid="text-primary-iol">
                {results.primaryIOL}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Match Score:</span>
              <span className="font-medium text-accent" data-testid="text-match-score">
                {results.matchScore}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-card dark:bg-card rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-card-foreground mb-3">Key Benefits</h3>
          <ul className="space-y-2 text-sm text-muted-foreground" data-testid="list-benefits">
            {results.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start" data-testid={`text-benefit-${index}`}>
                <Check className="w-4 h-4 text-accent mt-0.5 mr-2 flex-shrink-0" aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {results.considerations && results.considerations.length > 0 && (
        <div className="mt-6 bg-card dark:bg-card rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-card-foreground mb-3">Important Considerations</h3>
          <ul className="space-y-2 text-sm text-muted-foreground" data-testid="list-considerations">
            {results.considerations.map((consideration, index) => (
              <li key={index} className="flex items-start" data-testid={`text-consideration-${index}`}>
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" aria-hidden="true" />
                <span>{consideration}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-8 flex flex-col sm:flex-row gap-4 no-print">
        <Button 
          onClick={onPrint}
          variant="secondary"
          className="flex-1 focus-ring"
          aria-label="Print assessment results"
          data-testid="button-print"
        >
          <Printer className="w-5 h-5 mr-2" aria-hidden="true" />
          Print Results
        </Button>
        
        <Button 
          onClick={onRestart}
          variant="outline"
          className="flex-1 focus-ring"
          aria-label="Start new assessment"
          data-testid="button-restart"
        >
          <RotateCcw className="w-5 h-5 mr-2" aria-hidden="true" />
          Start New Assessment
        </Button>
      </div>
    </div>
  );
};
