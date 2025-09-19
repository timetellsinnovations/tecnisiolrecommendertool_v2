import { AlertTriangle } from 'lucide-react';

export const DisclaimerBanner = () => {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 shadow-sm disclaimer-banner" role="alert" aria-labelledby="disclaimer-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 id="disclaimer-title" className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Important Medical Disclaimer
            </h3>
            <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
              This tool is for educational purposes only and should not replace professional medical advice. Please consult with your ophthalmologist or eye care professional for personalized IOL selection based on your individual needs and medical history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
