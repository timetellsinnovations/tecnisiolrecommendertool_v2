export const DisclaimerBanner = () => {
  return (
    <div className="bg-white dark:bg-white border-b-4 border-primary shadow-sm disclaimer-banner" role="alert" aria-labelledby="disclaimer-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-center gap-3">
          <div className="text-primary text-xl">⚕️</div>
          <div className="text-center">
            <span className="font-semibold text-primary">Medical Disclaimer:</span>
            <span className="text-gray-800 ml-2">
              This educational tool does not provide medical advice and should not replace consultation with your healthcare provider. Please consult with your ophthalmologist or eye care professional for personalized IOL selection based on your individual medical history and needs.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
