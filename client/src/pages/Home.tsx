import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { ProgressSection } from '@/components/ProgressSection';
import { QuestionCard } from '@/components/QuestionCard';
import { LoadingState } from '@/components/LoadingState';
import { ResultsCard } from '@/components/ResultsCard';
import { Footer } from '@/components/Footer';
import { useAssessment } from '@/hooks/useAssessment';

export default function Home() {
  const {
    state,
    getCurrentQuestion,
    getProgress,
    setAnswer,
    hasAnswer,
    nextQuestion,
    previousQuestion,
    restartAssessment,
    announceToScreenReader
  } = useAssessment();

  // Keyboard navigation
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      // Skip if user is typing in an input field
      if (event.target && (event.target as HTMLElement).tagName === 'INPUT') {
        return;
      }
      
      switch (event.key) {
        case 'ArrowRight':
        case 'n':
        case 'N':
          if (hasAnswer() && !state.isLoading) {
            event.preventDefault();
            nextQuestion();
          }
          break;
          
        case 'ArrowLeft':
        case 'p':
        case 'P':
          if (state.currentQuestion > 0 && !state.isLoading) {
            event.preventDefault();
            previousQuestion();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [hasAnswer, state.isLoading, state.currentQuestion, nextQuestion, previousQuestion]);

  // Initial accessibility announcement
  useEffect(() => {
    announceToScreenReader('TECNIS IOL Selection Tool loaded. Use navigation buttons or arrow keys to proceed.');
  }, [announceToScreenReader]);

  const handleAnswerChange = (answer: string | string[]) => {
    setAnswer(state.currentQuestion + 1, answer);
  };

  const handlePrint = () => {
    window.print();
    announceToScreenReader('Print dialog opened');
  };

  const handleRestart = () => {
    if (confirm('Are you sure you want to start a new assessment? Your current progress will be lost.')) {
      restartAssessment();
    }
  };

  const progress = getProgress();
  const currentQuestion = getCurrentQuestion();
  const currentAnswer = state.answers[state.currentQuestion + 1];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <DisclaimerBanner />
      
      <main id="main-content" className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
        {!state.isComplete && (
          <>
            <ProgressSection 
              current={progress.current}
              total={progress.total}
              percentage={progress.percentage}
            />
            
            {state.isLoading ? (
              <LoadingState />
            ) : (
              <QuestionCard
                question={currentQuestion}
                answer={currentAnswer}
                onAnswerChange={handleAnswerChange}
                onNext={nextQuestion}
                onPrevious={previousQuestion}
                canGoNext={hasAnswer()}
                canGoPrevious={state.currentQuestion > 0}
                questionNumber={state.currentQuestion + 1}
              />
            )}
          </>
        )}
        
        {state.isComplete && state.results && (
          <ResultsCard
            results={state.results}
            onPrint={handlePrint}
            onRestart={handleRestart}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}
