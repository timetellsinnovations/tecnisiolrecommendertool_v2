import { BookOpen, Eye, Globe, Target, TrendingUp, Glasses, Moon, Sunset, Sun, Monitor, Car, Activity, Scissors, Check, Droplet, Activity as Medical, Circle, HelpCircle, User, Heart } from 'lucide-react';
import { Question } from '@/types/assessment';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  answer: string | string[] | undefined;
  onAnswerChange: (answer: string | string[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  questionNumber: number;
}

const iconMap = {
  'book': BookOpen,
  'eye': Eye,
  'globe': Globe,
  'target': Target,
  'trending-up': TrendingUp,
  'glasses': Glasses,
  'moon': Moon,
  'sunset': Sunset,
  'sun': Sun,
  'book-open': BookOpen,
  'monitor': Monitor,
  'car': Car,
  'activity': Activity,
  'scissors': Scissors,
  'check': Check,
  'droplet': Droplet,
  'medical': Medical,
  'circle': Circle,
  'help-circle': HelpCircle,
  'user': User,
  'heart': Heart,
};

export const QuestionCard = ({
  question,
  answer,
  onAnswerChange,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  questionNumber
}: QuestionCardProps) => {
  const helpTextId = `question-${question.id}-help`;
  const questionTextId = `question-${question.id}-text`;
  const previousLabel = canGoPrevious ? `Go to previous question (question ${questionNumber - 1})` : 'Go to previous question';
  const nextLabel = canGoNext ? `Go to next question (question ${questionNumber + 1})` : 'Complete current question to proceed';

  const handleSingleSelect = (optionId: string) => {
    onAnswerChange(optionId);
  };

  const handleMultiSelect = (optionId: string) => {
    const currentAnswers = Array.isArray(answer) ? answer : [];
    const newAnswers = currentAnswers.includes(optionId)
      ? currentAnswers.filter(id => id !== optionId)
      : [...currentAnswers, optionId];
    onAnswerChange(newAnswers);
  };

  const isSelected = (optionId: string) => {
    if (question.type === 'single') {
      return answer === optionId;
    } else {
      return Array.isArray(answer) && answer.includes(optionId);
    }
  };

  return (
    <div className="animate-fade-in">
      <article className="bg-card dark:bg-card rounded-lg shadow-lg p-3 sm:p-6 md:p-8 mb-4 sm:mb-8" role="group" aria-labelledby={questionTextId}>
        <header className="flex items-start mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full flex items-center justify-center font-bold mr-2 sm:mr-4 flex-shrink-0 text-sm sm:text-base">
            <span data-testid="text-question-number">{questionNumber}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 id={questionTextId} className="text-base sm:text-lg md:text-xl font-semibold text-card-foreground mb-1 sm:mb-2" data-testid="text-question">
              {question.text}
            </h3>
            <p id={helpTextId} className="text-xs sm:text-sm text-muted-foreground" data-testid="text-question-help">
              {question.help}
            </p>
          </div>
        </header>
        
        <div 
          className="space-y-2 sm:space-y-3 md:space-y-4" 
          role={question.type === 'single' ? 'radiogroup' : 'group'} 
          aria-labelledby={questionTextId}
          aria-describedby={helpTextId}
          data-testid="answer-options"
        >
          {question.options.map((option) => {
            const IconComponent = iconMap[option.icon as keyof typeof iconMap];
            const selected = isSelected(option.id);
            const optionTitleId = `option-title-${question.id}-${option.id}`;
            const optionDescriptionId = `option-description-${question.id}-${option.id}`;
            
            return (
              <label key={option.id} className="block">
                <input 
                  type={question.type === 'single' ? 'radio' : 'checkbox'}
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={selected}
                  onChange={() => question.type === 'single' ? handleSingleSelect(option.id) : handleMultiSelect(option.id)}
                  className="sr-only peer"
                  aria-labelledby={`${optionTitleId} ${optionDescriptionId}`}
                  data-testid={`input-${option.id}`}
                />
                <div className={`flex items-center p-2.5 sm:p-3 md:p-4 bg-muted hover:bg-card hover:shadow-md border-2 border-transparent ${
                  selected ? 'border-primary bg-primary/5 dark:bg-primary/10' : ''
                } rounded-lg cursor-pointer transition-all duration-200 focus-ring peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring`}>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-card dark:bg-card rounded-lg flex items-center justify-center mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
                    {IconComponent && <IconComponent className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-muted-foreground" aria-hidden="true" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 id={optionTitleId} className="font-medium text-card-foreground text-sm sm:text-base" data-testid={`text-option-title-${option.id}`}>
                      {option.text}
                    </h4>
                    <p id={optionDescriptionId} className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1" data-testid={`text-option-description-${option.id}`}>
                      {option.description}
                    </p>
                  </div>
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 border-2 border-muted-foreground ${
                    question.type === 'single' ? 'rounded-full' : 'rounded'
                  } ${selected ? 'border-primary bg-primary' : ''} flex items-center justify-center ml-2 sm:ml-4 flex-shrink-0`}>
                    {selected && (
                      <div className={`${
                        question.type === 'single' ? 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-foreground rounded-full' : 'w-2.5 h-2.5 sm:w-3 sm:h-3'
                      }`}>
                        {question.type === 'multi' && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary-foreground" />}
                      </div>
                    )}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
        
        <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between">
          <Button 
            onClick={onPrevious}
            disabled={!canGoPrevious}
            variant="secondary"
            className="focus-ring w-full sm:w-auto"
            aria-label={previousLabel}
            data-testid="button-previous"
          >
            <ChevronLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Previous
          </Button>
          
          <Button 
            onClick={onNext}
            disabled={!canGoNext}
            className="focus-ring w-full sm:w-auto"
            aria-label={nextLabel}
            data-testid="button-next"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Button>
        </div>
      </article>
    </div>
  );
};
