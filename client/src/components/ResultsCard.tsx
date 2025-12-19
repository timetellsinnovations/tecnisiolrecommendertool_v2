import { CheckCircle, Check, Printer, RotateCcw, MessageCircle } from 'lucide-react';
import { AssessmentResults } from '@/types/assessment';
import { Button } from '@/components/ui/button';

interface ResultsCardProps {
  results: AssessmentResults;
  onPrint: () => void;
  onRestart: () => void;
}

export const ResultsCard = ({ results, onPrint, onRestart }: ResultsCardProps) => {
  const currentDate = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Get the base model name for the CTA (without Toric suffix)
  const getBaseModelName = () => {
    switch (results.baseModel) {
      case 'odyssey': return 'TECNIS Odyssey™';
      case 'puresee': return 'TECNIS PureSee™';
      case 'eyhance': return 'TECNIS Eyhance™';
      default: return 'TECNIS Eyhance™';
    }
  };

  return (
    <div className="animate-fade-in bg-gradient-to-br from-accent/5 to-primary/5 dark:from-accent/10 dark:to-primary/10 rounded-lg shadow-lg p-3 sm:p-6 md:p-8 page-break-inside-avoid results-card" role="region" aria-labelledby="results-title" data-testid="results-card">
      {/* Print Header - Hidden on screen */}
      <div className="hidden print:block print-header">
        <h1>TECNIS™ IOL Selection Tool</h1>
        <div className="subtitle">Patient Education Guide - Assessment Results</div>
      </div>
      
      {/* Prominent Call-to-Action Box */}
      <div 
        className="bg-primary text-primary-foreground rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 text-center shadow-lg border-2 border-primary"
        role="banner"
        aria-label="Recommended lens call to action"
        data-testid="cta-box"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          <span className="text-sm sm:text-base font-medium uppercase tracking-wide">Your Next Step</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold" data-testid="text-cta-lens">
          Ask your doctor about {getBaseModelName()}
        </h2>
      </div>
      
      <div className="text-center mb-4 sm:mb-6 md:mb-8">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center print:hidden">
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-accent-foreground" aria-hidden="true" />
        </div>
        <h2 id="results-title" className="text-xl sm:text-2xl font-bold text-card-foreground mb-1 sm:mb-2 results-title" data-testid="text-results-title">
          Assessment Complete
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">Here are your personalized IOL recommendations</p>
      </div>
      
      <div className="grid gap-3 sm:gap-4 md:gap-6 md:grid-cols-2 results-grid">
        <div className="bg-card dark:bg-card rounded-lg p-3 sm:p-4 md:p-6 shadow-md iol-recommendation">
          <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-2 sm:mb-3">Recommended IOL Type</h3>
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Primary Recommendation:</span>
              <span className="font-medium text-card-foreground iol-name text-xs sm:text-sm text-right" data-testid="text-primary-iol">
                {results.primaryIOL}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Match Score:</span>
              <span className="font-medium text-accent match-score text-xs sm:text-sm" data-testid="text-match-score">
                {results.matchScore}%
              </span>
            </div>
          </div>
        </div>
        
        {/* Why You Matched Section */}
        <div className="bg-card dark:bg-card rounded-lg p-3 sm:p-4 md:p-6 shadow-md iol-recommendation">
          <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-2 sm:mb-3">Why You Matched</h3>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground" data-testid="list-match-reasons">
            {results.matchReasons.map((reason, index) => (
              <li key={index} className="flex items-start" data-testid={`text-match-reason-${index}`}>
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent mt-0.5 mr-1.5 sm:mr-2 flex-shrink-0 print:hidden" aria-hidden="true" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Eye History Override Message */}
      {results.isEyeHistoryOverride && (
        <div 
          className="mt-3 sm:mt-4 md:mt-6 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 sm:p-4 md:p-6 shadow-md"
          role="alert"
          aria-label="Important information about your recommendation"
          data-testid="eye-history-override-message"
        >
          <h3 className="text-base sm:text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2 sm:mb-3">Important Information</h3>
          <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
            Because you indicated previous eye surgery or conditions, this may affect which lens options are best for you. 
            Some advanced technology lenses may not be suitable depending on your specific situation. 
            <strong> Talk to your eye care professional about what option is right for you</strong> — they will evaluate your individual circumstances and discuss all available choices.
          </p>
        </div>
      )}
      
      <div className="mt-3 sm:mt-4 md:mt-6 bg-card dark:bg-card rounded-lg p-3 sm:p-4 md:p-6 shadow-md iol-recommendation">
        <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-2 sm:mb-3">Key Benefits</h3>
        <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground benefits-list" data-testid="list-benefits">
          {results.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start" data-testid={`text-benefit-${index}`}>
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent mt-0.5 mr-1.5 sm:mr-2 flex-shrink-0 print:hidden" aria-hidden="true" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {results.considerations && results.considerations.length > 0 && (
        <div className="mt-3 sm:mt-4 md:mt-6 bg-card dark:bg-card rounded-lg p-3 sm:p-4 md:p-6 shadow-md iol-recommendation">
          <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-2 sm:mb-3">Important Considerations</h3>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground considerations-list" data-testid="list-considerations">
            {results.considerations.map((consideration, index) => (
              <li key={index} className="flex items-start" data-testid={`text-consideration-${index}`}>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0 print:hidden" aria-hidden="true" />
                <span>{consideration}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Print Footer - Hidden on screen */}
      <div className="hidden print:block print-footer">
        <div className="print-disclaimer">
          <strong>Medical Disclaimer:</strong> This tool is for educational purposes only and should not replace professional medical advice. Please consult with your ophthalmologist or eye care professional for personalized IOL selection based on your individual needs and medical history.
        </div>
        <div className="print-timestamp">
          Assessment completed on: {currentDate}
        </div>
      </div>
      
      <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 no-print">
        <Button 
          onClick={onPrint}
          variant="default"
          className="flex-1 focus-ring text-sm sm:text-base"
          aria-label="Print assessment results"
          data-testid="button-print"
        >
          <Printer className="w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true" />
          Print Results
        </Button>
        
        <Button 
          onClick={onRestart}
          variant="outline"
          className="flex-1 focus-ring text-sm sm:text-base"
          aria-label="Start new assessment"
          data-testid="button-restart"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true" />
          Start New Assessment
        </Button>
      </div>
    </div>
  );
};
