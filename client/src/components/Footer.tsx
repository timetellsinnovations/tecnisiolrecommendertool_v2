export const Footer = () => {
  return (
    <footer className="bg-card dark:bg-card border-t border-border mt-16 no-print" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">About TECNIS™</h3>
            <p className="text-sm text-muted-foreground">
              TECNIS™ IOLs are designed to provide enhanced vision quality and reduced dependence on glasses for cataract and presbyopia patients.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Important Information</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a 
                  href="#" 
                  className="hover:text-primary focus-ring" 
                  data-testid="link-patient-info"
                  aria-label="Patient Information"
                >
                  Patient Information
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-primary focus-ring" 
                  data-testid="link-clinical-studies"
                  aria-label="Clinical Studies"
                >
                  Clinical Studies
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-primary focus-ring" 
                  data-testid="link-find-doctor"
                  aria-label="Find a Doctor"
                >
                  Find a Doctor
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Contact</h3>
            <p className="text-sm text-muted-foreground">
              For questions about this tool or TECNIS™ IOLs, please consult your eye care professional.
            </p>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 Johnson & Johnson and its affiliates. All rights reserved. TECNIS™ is a trademark of Johnson & Johnson Vision Care, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};
