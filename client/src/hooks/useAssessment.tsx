import { useState, useCallback, useEffect } from 'react';
import { AssessmentState, Question, AssessmentAnswers, AssessmentResults } from '@/types/assessment';

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Which activities are most important to your daily routine?",
    help: "Select all that apply to your lifestyle.",
    type: 'multi',
    options: [
      { id: 'reading', text: 'Reading', description: 'Books, newspapers, tablets', icon: 'book-open' },
      { id: 'computer', text: 'Computer Work', description: 'Professional or personal computer use', icon: 'monitor' },
      { id: 'driving', text: 'Driving', description: 'Daily commuting and travel', icon: 'car' },
      { id: 'sports', text: 'Sports/Recreation', description: 'Athletic activities and hobbies', icon: 'activity' },
      { id: 'crafts', text: 'Detail Work/Crafts', description: 'Fine motor activities requiring precision', icon: 'scissors' },
      { id: 'not-sure', text: 'Not Sure', description: 'Need help determining', icon: 'help-circle' }
    ]
  },
  {
    id: 2,
    text: "How do you feel about wearing glasses after cataract surgery?",
    help: "Consider your lifestyle preferences and daily activities.",
    type: 'single',
    options: [
      { id: 'hate-glasses', text: 'I hate wearing glasses', description: 'I strongly want to be glasses-free', icon: 'x-circle' },
      { id: 'nice-not-to-wear', text: 'It would be nice not to wear glasses', description: 'I prefer less dependence on glasses', icon: 'smile' },
      { id: 'dont-mind', text: 'I do not mind wearing glasses', description: 'I am comfortable with glasses', icon: 'glasses' }
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
    id: 5,
    text: "Do you have astigmatism?",
    help: "Your eye doctor can confirm this during your examination.",
    type: 'single',
    options: [
      { id: 'yes', text: 'Yes', description: 'I have been diagnosed with astigmatism', icon: 'eye' },
      { id: 'no', text: 'No', description: 'I do not have astigmatism', icon: 'circle' },
      { id: 'not-sure', text: 'Not Sure', description: 'Need to check with eye doctor', icon: 'help-circle' }
    ]
  }
];

const STORAGE_KEY = 'tecnis-iol-assessment';
const HISTORY_KEY = 'tecnis-iol-assessment-history';

// Helper functions for localStorage
const saveToStorage = (data: AssessmentState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...data,
      timestamp: new Date().toISOString()
    }));
  } catch (error) {
    console.warn('Failed to save assessment to localStorage:', error);
  }
};

const loadFromStorage = (): AssessmentState | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Only restore if the assessment is not complete and has progress
      if (!parsed.isComplete && (parsed.currentQuestion > 0 || Object.keys(parsed.answers || {}).length > 0)) {
        return {
          currentQuestion: parsed.currentQuestion || 0,
          totalQuestions: QUESTIONS.length,
          answers: parsed.answers || {},
          isLoading: false,
          isComplete: false,
          results: parsed.results
        };
      }
    }
  } catch (error) {
    console.warn('Failed to load assessment from localStorage:', error);
  }
  return null;
};

const saveCompletedAssessment = (results: AssessmentResults, answers: AssessmentAnswers) => {
  try {
    const history = getAssessmentHistory();
    const newEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      results,
      answers
    };
    
    // Keep only the last 10 assessments
    const updatedHistory = [newEntry, ...history].slice(0, 10);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.warn('Failed to save assessment history:', error);
  }
};

const getAssessmentHistory = () => {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to load assessment history:', error);
    return [];
  }
};

const clearCurrentAssessment = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear current assessment:', error);
  }
};

export const useAssessment = () => {
  // Initialize state WITHOUT auto-restore to allow user choice
  const [state, setState] = useState<AssessmentState>({
    currentQuestion: 0,
    totalQuestions: QUESTIONS.length,
    answers: {},
    isLoading: false,
    isComplete: false,
  });

  // Save state to localStorage whenever it changes (except loading states and completed states)
  useEffect(() => {
    if (!state.isLoading && !state.isComplete) {
      saveToStorage(state);
    }
  }, [state]);

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

  const calculateResults = useCallback((answers: AssessmentAnswers): AssessmentResults => {
    // Get answers
    const activities = answers[1] as string[] || [];
    const glassesFeeling = answers[2] as string;
    const nightDriving = answers[3] as string;
    const eyeHistory = answers[4] as string;
    const astigmatism = answers[5] as string;

    // Determine if patient has astigmatism
    const hasAstigmatism = astigmatism === 'yes';

    // Analyze activities for near vs intermediate/distance focus
    const nearActivities = activities.filter(a => 
      ['reading', 'computer', 'crafts'].includes(a)
    );
    const intermediateActivities = activities.filter(a => 
      ['sports', 'driving'].includes(a)
    );

    // Track match reasons and eye history override
    const matchReasons: string[] = [];
    let isEyeHistoryOverride = false;

    // Decision tree based on reviewer criteria - requires activity alignment
    let baseModel: 'eyhance' | 'puresee' | 'odyssey';

    // Check for significant eye history first (Eyhance is safest option)
    if (eyeHistory === 'significant') {
      baseModel = 'eyhance';
      isEyeHistoryOverride = true;
      matchReasons.push('You indicated previous eye surgery or conditions');
    }
    // Hate glasses + near activities → Odyssey
    else if (glassesFeeling === 'hate-glasses' && nearActivities.length > 0) {
      baseModel = 'odyssey';
      matchReasons.push('Your goal of not wearing glasses');
      if (nearActivities.includes('reading')) matchReasons.push('Reading activities');
      if (nearActivities.includes('computer')) matchReasons.push('Computer work');
      if (nearActivities.includes('crafts')) matchReasons.push('Detail work and crafts');
      if (nightDriving === 'frequently') matchReasons.push('Frequent night driving');
      else if (nightDriving === 'occasionally') matchReasons.push('Occasional night driving');
    }
    // Nice not to wear + intermediate activities → PureSee
    else if (glassesFeeling === 'nice-not-to-wear' && (intermediateActivities.length > 0 || nightDriving === 'frequently' || nightDriving === 'occasionally')) {
      baseModel = 'puresee';
      matchReasons.push('Your preference for less glasses dependence');
      if (intermediateActivities.includes('driving')) matchReasons.push('Driving activities');
      if (intermediateActivities.includes('sports')) matchReasons.push('Sports and recreation');
      if (nightDriving === 'frequently') matchReasons.push('Frequent night driving');
      else if (nightDriving === 'occasionally') matchReasons.push('Occasional night driving');
    }
    // Don't mind glasses → Eyhance (safe, reliable option)
    else if (glassesFeeling === 'dont-mind') {
      baseModel = 'eyhance';
      matchReasons.push('Your comfort with wearing glasses');
      if (intermediateActivities.includes('driving')) matchReasons.push('Driving activities');
      if (intermediateActivities.includes('sports')) matchReasons.push('Sports and recreation');
    }
    // All other cases → Eyhance (safest default for unclear activity patterns)
    else {
      baseModel = 'eyhance';
      matchReasons.push('Based on your overall responses');
    }

    // Map to IOL recommendations with patient-friendly language
    const iolMapping = {
      eyhance: {
        name: hasAstigmatism ? 'TECNIS® Eyhance™ Toric II IOL' : 'TECNIS® Eyhance™ IOL',
        benefits: hasAstigmatism ? [
          'Clear distance vision for driving and outdoor activities',
          'Improved arm\'s length vision for phones, dashboards, and cooking',
          'Corrects astigmatism for sharper, clearer vision',
          'Low risk of halos and glare at night',
          'Exceptional lens stability and positioning'
        ] : [
          'Clear distance vision for driving and outdoor activities',
          'Improved arm\'s length vision for phones, dashboards, and cooking',
          'Low risk of halos and glare at night',
          'Proven safety and reliability'
        ]
      },
      puresee: {
        name: hasAstigmatism ? 'TECNIS® PureSee™ Toric IOL' : 'TECNIS® PureSee™ IOL',
        benefits: hasAstigmatism ? [
          'Seamless vision from distance to arm\'s length',
          'Great for active lifestyles including golf and sports',
          'Excellent performance in low light and night driving',
          'Corrects astigmatism for enhanced clarity',
          'Minimal visual disturbances - similar to standard lenses'
        ] : [
          'Seamless vision from distance to arm\'s length',
          'Great for active lifestyles including golf and sports',
          'Excellent performance in low light and night driving',
          'Minimal visual disturbances - similar to standard lenses'
        ]
      },
      odyssey: {
        name: hasAstigmatism ? 'TECNIS® Odyssey™ Toric II IOL' : 'TECNIS® Odyssey™ IOL',
        benefits: hasAstigmatism ? [
          'Complete range of vision - near, intermediate, and far',
          'Freedom from glasses for nearly all activities',
          'Read small print on phones and tablets easily',
          'Two times better contrast in dim lighting than competing lenses',
          'Corrects astigmatism while providing full visual range',
          '93% of patients report minimal or no halos and glare'
        ] : [
          'Complete range of vision - near, intermediate, and far',
          'Freedom from glasses for nearly all activities',
          'Read small print on phones and tablets easily',
          'Two times better contrast in dim lighting than competing lenses',
          '93% of patients report minimal or no halos and glare'
        ]
      }
    };

    const recommendation = iolMapping[baseModel];
    
    // Calculate match score based on how well answers align
    let matchScore = 85; // Base score
    
    // Adjust based on clarity of answers
    if (glassesFeeling === 'hate-glasses' && nearActivities.length >= 2) matchScore += 5;
    if (glassesFeeling === 'nice-not-to-wear' && intermediateActivities.length > 0) matchScore += 5;
    if (glassesFeeling === 'dont-mind') matchScore += 5;
    if (hasAstigmatism) matchScore += 3; // Clear need for toric
    
    matchScore = Math.min(95, matchScore);

    return {
      primaryIOL: recommendation.name,
      baseModel,
      matchScore: Math.round(matchScore),
      benefits: recommendation.benefits,
      considerations: [
        'This recommendation is based on your responses and general guidance. Individual results may vary based on your unique eye anatomy and overall health. Your eye surgeon will perform a comprehensive examination and discuss all available options to determine the best IOL for your specific needs. Multiple factors beyond this assessment influence the final IOL selection.'
      ],
      matchReasons,
      isEyeHistoryOverride
    };
  }, []);

  const completeAssessment = useCallback(() => {
    const results = calculateResults(state.answers);
    setState(prev => ({
      ...prev,
      isComplete: true,
      results
    }));
    
    // Save completed assessment to history and clear current progress
    saveCompletedAssessment(results, state.answers);
    clearCurrentAssessment();
    
    announceToScreenReader('Assessment complete. Results are now displayed.');
  }, [state.answers, calculateResults, announceToScreenReader]);

  const nextQuestion = useCallback(() => {
    if (state.currentQuestion < state.totalQuestions - 1) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
      
      const progress = getProgress();
      announceToScreenReader(`Question ${progress.current} of ${progress.total}, ${progress.percentage}% complete`);
    } else {
      // On last question, delay completion slightly to ensure state has updated
      setTimeout(() => {
        completeAssessment();
      }, 50);
    }
  }, [state.currentQuestion, state.totalQuestions, getProgress, announceToScreenReader, completeAssessment]);

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

  const restartAssessment = useCallback(() => {
    // Clear stored progress
    clearCurrentAssessment();
    
    setState({
      currentQuestion: 0,
      totalQuestions: QUESTIONS.length,
      answers: {},
      isLoading: false,
      isComplete: false,
    });
    
    announceToScreenReader('Assessment restarted');
  }, [announceToScreenReader]);

  // Check if there's saved progress
  const hasSavedProgress = useCallback(() => {
    const stored = loadFromStorage();
    return stored !== null && (stored.currentQuestion > 0 || Object.keys(stored.answers).length > 0);
  }, []);

  // Restore saved progress (called when user chooses to resume)
  const restoreProgress = useCallback(() => {
    const stored = loadFromStorage();
    if (stored) {
      setState(stored);
      announceToScreenReader(`Resumed assessment at question ${stored.currentQuestion + 1}`);
    }
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
    hasSavedProgress,
    restoreProgress,
    getAssessmentHistory,
    clearCurrentAssessment,
  };
};
