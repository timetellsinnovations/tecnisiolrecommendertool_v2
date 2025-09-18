import { useState, useCallback } from 'react';
import { AssessmentState, Question, AssessmentAnswers, AssessmentResults } from '@/types/assessment';

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What is your primary visual lifestyle need?",
    help: "Consider your daily activities and what vision distances are most important to you.",
    type: 'single',
    options: [
      { id: 'near-vision', text: 'Near Vision Priority', description: 'Reading, computer work, and close-up tasks', icon: 'book' },
      { id: 'distance-vision', text: 'Distance Vision Priority', description: 'Driving, sports, and far-away activities', icon: 'eye' },
      { id: 'balanced-vision', text: 'Balanced Vision', description: 'Equal importance for near and distance activities', icon: 'globe' }
    ]
  },
  {
    id: 2,
    text: "How important is it to minimize your dependence on glasses?",
    help: "Consider your lifestyle preferences and daily activities.",
    type: 'single',
    options: [
      { id: 'very-important', text: 'Very Important', description: 'I strongly prefer not to wear glasses', icon: 'target' },
      { id: 'somewhat-important', text: 'Somewhat Important', description: 'I would like reduced dependence on glasses', icon: 'trending-up' },
      { id: 'not-important', text: 'Not Important', description: 'I am comfortable wearing glasses', icon: 'glasses' }
    ]
  },
  {
    id: 3,
    text: "How often do you drive at night or in low light conditions?",
    help: "This helps determine the best IOL for your vision needs in challenging lighting.",
    type: 'single',
    options: [
      { id: 'frequently', text: 'Frequently', description: 'Regular night driving or low-light activities', icon: 'moon' },
      { id: 'occasionally', text: 'Occasionally', description: 'Some evening or challenging condition driving', icon: 'sunset' },
      { id: 'rarely', text: 'Rarely or Never', description: 'Minimal night or challenging condition driving', icon: 'sun' }
    ]
  },
  {
    id: 4,
    text: "Which activities are most important to your daily routine?",
    help: "Select all that apply to your lifestyle.",
    type: 'multi',
    options: [
      { id: 'reading', text: 'Reading', description: 'Books, newspapers, tablets', icon: 'book-open' },
      { id: 'computer', text: 'Computer Work', description: 'Professional or personal computer use', icon: 'monitor' },
      { id: 'driving', text: 'Driving', description: 'Daily commuting and travel', icon: 'car' },
      { id: 'sports', text: 'Sports/Recreation', description: 'Athletic activities and hobbies', icon: 'activity' },
      { id: 'crafts', text: 'Detail Work/Crafts', description: 'Fine motor activities requiring precision', icon: 'scissors' }
    ]
  },
  {
    id: 5,
    text: "Do you have any history of eye conditions or surgeries?",
    help: "This information helps guide appropriate IOL recommendations.",
    type: 'single',
    options: [
      { id: 'none', text: 'No Significant History', description: 'No prior surgeries or major complications', icon: 'check' },
      { id: 'minor', text: 'Minor Conditions', description: 'Dry eye, allergies, or similar conditions', icon: 'droplet' },
      { id: 'significant', text: 'Previous Surgery/Conditions', description: 'Prior eye surgery, glaucoma, etc.', icon: 'medical' }
    ]
  },
  {
    id: 6,
    text: "Do you have astigmatism?",
    help: "Your eye doctor can confirm this during your examination.",
    type: 'single',
    options: [
      { id: 'yes-significant', text: 'Yes, Significant', description: 'Diagnosed with notable astigmatism', icon: 'eye' },
      { id: 'yes-mild', text: 'Yes, Mild', description: 'Some astigmatism present', icon: 'eye' },
      { id: 'no', text: 'No', description: 'No astigmatism', icon: 'circle' },
      { id: 'unknown', text: 'Not Sure', description: 'Need to check with eye doctor', icon: 'help-circle' }
    ]
  },
  {
    id: 7,
    text: "What is your age range?",
    help: "Age can influence IOL selection and expected outcomes.",
    type: 'single',
    options: [
      { id: 'under-50', text: 'Under 50', description: 'Early presbyopia considerations', icon: 'user' },
      { id: '50-65', text: '50-65', description: 'Active lifestyle considerations', icon: 'user' },
      { id: '65-75', text: '65-75', description: 'Standard cataract surgery age', icon: 'user' },
      { id: 'over-75', text: 'Over 75', description: 'Senior lifestyle considerations', icon: 'user' }
    ]
  },
  {
    id: 8,
    text: "How would you describe your overall health and healing ability?",
    help: "This helps assess surgical candidacy and recovery expectations.",
    type: 'single',
    options: [
      { id: 'excellent', text: 'Excellent', description: 'Very healthy with good healing', icon: 'heart' },
      { id: 'good', text: 'Good', description: 'Generally healthy', icon: 'heart' },
      { id: 'fair', text: 'Fair', description: 'Some health considerations', icon: 'heart' },
      { id: 'poor', text: 'Poor', description: 'Multiple health issues', icon: 'heart' }
    ]
  }
];

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>({
    currentQuestion: 0,
    totalQuestions: QUESTIONS.length,
    answers: {},
    isLoading: false,
    isComplete: false,
  });

  const announceToScreenReader = useCallback((message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  const getCurrentQuestion = useCallback((): Question => {
    return QUESTIONS[state.currentQuestion];
  }, [state.currentQuestion]);

  const getProgress = useCallback(() => {
    const current = state.currentQuestion + 1;
    const percentage = Math.round((current / state.totalQuestions) * 100);
    return { current, total: state.totalQuestions, percentage };
  }, [state.currentQuestion, state.totalQuestions]);

  const setAnswer = useCallback((questionId: number, answer: string | string[]) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }));
  }, []);

  const hasAnswer = useCallback((questionId?: number) => {
    const qId = questionId ?? state.currentQuestion + 1;
    const answer = state.answers[qId];
    return answer !== undefined && (Array.isArray(answer) ? answer.length > 0 : answer !== '');
  }, [state.answers, state.currentQuestion]);

  const nextQuestion = useCallback(() => {
    if (state.currentQuestion < state.totalQuestions - 1) {
      setState(prev => ({ ...prev, isLoading: true }));
      
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          isLoading: false
        }));
        
        const progress = getProgress();
        announceToScreenReader(`Question ${progress.current} of ${progress.total}, ${progress.percentage}% complete`);
      }, 800);
    } else {
      completeAssessment();
    }
  }, [state.currentQuestion, state.totalQuestions, getProgress, announceToScreenReader]);

  const previousQuestion = useCallback(() => {
    if (state.currentQuestion > 0) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
      
      const progress = getProgress();
      announceToScreenReader(`Question ${progress.current} of ${progress.total}, ${progress.percentage}% complete`);
    }
  }, [state.currentQuestion, getProgress, announceToScreenReader]);

  const calculateResults = useCallback((answers: AssessmentAnswers): AssessmentResults => {
    // Simple scoring algorithm based on answers
    const scores = {
      monofocal: 0,
      multifocal: 0,
      toric: 0,
      extended: 0
    };

    // Question 1: Visual lifestyle need
    const q1 = answers[1] as string;
    if (q1 === 'near-vision') {
      scores.multifocal += 3;
      scores.extended += 2;
    } else if (q1 === 'distance-vision') {
      scores.monofocal += 3;
      scores.toric += 2;
    } else if (q1 === 'balanced-vision') {
      scores.multifocal += 2;
      scores.extended += 3;
    }

    // Question 2: Glasses dependence
    const q2 = answers[2] as string;
    if (q2 === 'very-important') {
      scores.multifocal += 3;
      scores.extended += 2;
    } else if (q2 === 'somewhat-important') {
      scores.extended += 3;
      scores.multifocal += 1;
    } else if (q2 === 'not-important') {
      scores.monofocal += 3;
    }

    // Question 3: Night driving
    const q3 = answers[3] as string;
    if (q3 === 'frequently') {
      scores.monofocal += 2;
      scores.toric += 2;
    } else if (q3 === 'occasionally') {
      scores.extended += 1;
    } else if (q3 === 'rarely') {
      scores.multifocal += 1;
    }

    // Question 6: Astigmatism
    const q6 = answers[6] as string;
    if (q6 === 'yes-significant' || q6 === 'yes-mild') {
      scores.toric += 4;
    }

    // Find the highest scoring IOL type
    const maxScore = Math.max(...Object.values(scores));
    const recommendedType = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] || 'monofocal';

    // Map to actual IOL recommendations
    const iolMapping = {
      monofocal: {
        name: 'TECNIS® Monofocal IOL',
        benefits: [
          'Excellent distance vision quality',
          'Reduced risk of glare and halos',
          'Proven track record of safety',
          'Good option for active lifestyles'
        ]
      },
      multifocal: {
        name: 'TECNIS® Multifocal IOL',
        benefits: [
          'Excellent near and intermediate vision',
          'Reduced dependence on glasses',
          'High patient satisfaction rates',
          'Advanced optical design'
        ]
      },
      extended: {
        name: 'TECNIS® Symfony Extended Range IOL',
        benefits: [
          'Extended range of clear vision',
          'Reduced chromatic aberrations',
          'Good intermediate vision',
          'Lower incidence of halos'
        ]
      },
      toric: {
        name: 'TECNIS® Toric IOL',
        benefits: [
          'Corrects astigmatism effectively',
          'Improved distance vision quality',
          'Stable lens positioning',
          'Reduced dependence on glasses for distance'
        ]
      }
    };

    const recommendation = iolMapping[recommendedType as keyof typeof iolMapping];
    const matchScore = Math.min(95, Math.max(75, (maxScore / 15) * 100));

    return {
      primaryIOL: recommendation.name,
      matchScore: Math.round(matchScore),
      benefits: recommendation.benefits,
      considerations: [
        'Results may vary based on individual eye anatomy',
        'Final recommendation should be made by your surgeon',
        'Multiple factors influence IOL selection'
      ]
    };
  }, []);

  const completeAssessment = useCallback(() => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    setTimeout(() => {
      const results = calculateResults(state.answers);
      setState(prev => ({
        ...prev,
        isComplete: true,
        isLoading: false,
        results
      }));
      
      announceToScreenReader('Assessment complete. Results are now displayed.');
    }, 1500);
  }, [state.answers, calculateResults, announceToScreenReader]);

  const restartAssessment = useCallback(() => {
    setState({
      currentQuestion: 0,
      totalQuestions: QUESTIONS.length,
      answers: {},
      isLoading: false,
      isComplete: false,
    });
    
    announceToScreenReader('Assessment restarted');
  }, [announceToScreenReader]);

  return {
    state,
    getCurrentQuestion,
    getProgress,
    setAnswer,
    hasAnswer,
    nextQuestion,
    previousQuestion,
    restartAssessment,
    announceToScreenReader,
  };
};
