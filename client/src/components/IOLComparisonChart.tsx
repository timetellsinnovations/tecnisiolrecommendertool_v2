import { Mountain, Monitor, BookOpen, Eye, Check, X } from 'lucide-react';

export const IOLComparisonChart = () => {
  const iolProducts = [
    {
      name: 'TECNIS Eyhance™',
      distance: true,
      intermediate: true,
      near: false,
      nearNote: null,
      astigmatism: false,
    },
    {
      name: 'TECNIS Eyhance™ Toric II',
      distance: true,
      intermediate: true,
      near: false,
      nearNote: null,
      astigmatism: true,
    },
    {
      name: 'TECNIS PureSee™',
      distance: true,
      intermediate: true,
      near: true,
      nearNote: 'May need glasses for fine print',
      astigmatism: false,
    },
    {
      name: 'TECNIS PureSee™ Toric',
      distance: true,
      intermediate: true,
      near: true,
      nearNote: 'May need glasses for fine print',
      astigmatism: true,
    },
    {
      name: 'TECNIS Odyssey™',
      distance: true,
      intermediate: true,
      near: true,
      nearNote: null,
      astigmatism: false,
    },
    {
      name: 'TECNIS Odyssey™ Toric II',
      distance: true,
      intermediate: true,
      near: true,
      nearNote: null,
      astigmatism: true,
    },
  ];

  const capabilities = [
    { name: 'Distance', icon: Mountain, key: 'distance' as const },
    { name: 'Intermediate', icon: Monitor, key: 'intermediate' as const },
    { name: 'Near', icon: BookOpen, key: 'near' as const },
    { name: 'Available for Astigmatism Correction', icon: Eye, key: 'astigmatism' as const },
  ];

  return (
    <section 
      className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mt-6 md:mt-8 page-break-inside-avoid"
      role="region"
      aria-labelledby="comparison-title"
      data-testid="iol-comparison-chart"
    >
      <div className="text-center mb-4 sm:mb-6">
        <h2 
          id="comparison-title" 
          className="text-xl sm:text-2xl font-bold text-card-foreground mb-3 sm:mb-4"
          data-testid="text-comparison-title"
        >
          Compare TECNIS™ IOL Options
        </h2>
        <div 
          className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4 text-sm sm:text-base text-blue-900 dark:text-blue-100"
          role="note"
          aria-label="Important disclaimer about IOL selection"
          data-testid="text-comparison-disclaimer"
        >
          <p className="leading-relaxed">
            <strong>Remember:</strong> No single IOL is right for all patients. Your eye care professional will go over the benefits and trade-offs of your IOL options with you in more detail.
          </p>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table 
          className="w-full border-collapse bg-card dark:bg-card rounded-lg overflow-hidden shadow-md"
          role="table"
          aria-label="IOL Products Comparison Table"
        >
          <thead>
            <tr className="bg-primary dark:bg-primary">
              <th 
                className="p-3 sm:p-4 text-left font-semibold text-sm sm:text-base text-primary-foreground"
                scope="col"
                data-testid="header-product"
              >
                IOL Product
              </th>
              {capabilities.map((capability) => (
                <th 
                  key={capability.key}
                  className="p-3 sm:p-4 text-center font-semibold text-sm sm:text-base text-primary-foreground"
                  scope="col"
                  data-testid={`header-${capability.key}`}
                >
                  <div className="flex flex-col items-center gap-1 sm:gap-2">
                    <capability.icon 
                      className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" 
                      aria-hidden="true" 
                    />
                    <span className="text-xs sm:text-sm text-primary-foreground">{capability.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {iolProducts.map((product, index) => (
              <tr 
                key={product.name}
                className={`border-t border-border ${
                  index % 2 === 0 
                    ? 'bg-card dark:bg-card' 
                    : 'bg-muted/30 dark:bg-muted/10'
                }`}
                data-testid={`row-product-${index}`}
              >
                <td 
                  className="p-3 sm:p-4 font-medium text-card-foreground text-sm sm:text-base"
                  data-testid={`text-product-name-${index}`}
                >
                  {product.name}
                </td>
                {capabilities.map((capability) => (
                  <td 
                    key={capability.key}
                    className="p-3 sm:p-4 text-center"
                    data-testid={`cell-${capability.key}-${index}`}
                  >
                    {product[capability.key] ? (
                      <div className="flex flex-col items-center">
                        <Check 
                          className="w-5 h-5 sm:w-6 sm:h-6 text-accent mx-auto" 
                          aria-label={`${capability.name} supported`}
                          data-testid={`icon-check-${capability.key}-${index}`}
                        />
                        {capability.key === 'near' && product.nearNote && (
                          <span className="text-[10px] sm:text-xs text-muted-foreground mt-1 max-w-[100px]">*</span>
                        )}
                      </div>
                    ) : (
                      <X 
                        className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/40 mx-auto" 
                        aria-label={`${capability.name} not supported`}
                        data-testid={`icon-x-${capability.key}-${index}`}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Footnote for PureSee */}
        <div className="mt-3 text-xs sm:text-sm text-muted-foreground" data-testid="text-puresee-footnote">
          <span className="font-medium">*</span> TECNIS PureSee™: May need glasses for fine print
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {iolProducts.map((product, productIndex) => (
          <div 
            key={product.name}
            className="bg-card dark:bg-card rounded-lg shadow-md p-4 border border-border"
            data-testid={`card-product-${productIndex}`}
          >
            <h3 
              className="font-semibold text-card-foreground mb-3 text-base"
              data-testid={`text-mobile-product-name-${productIndex}`}
            >
              {product.name}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {capabilities.map((capability) => (
                <div 
                  key={capability.key}
                  className="flex items-center gap-2"
                  data-testid={`mobile-capability-${capability.key}-${productIndex}`}
                >
                  <capability.icon 
                    className="w-4 h-4 text-muted-foreground flex-shrink-0" 
                    aria-hidden="true"
                  />
                  <span className="text-xs text-muted-foreground flex-1">
                    {capability.name}
                  </span>
                  {product[capability.key] ? (
                    <Check 
                      className="w-4 h-4 text-accent flex-shrink-0" 
                      aria-label="Supported"
                      data-testid={`mobile-icon-check-${capability.key}-${productIndex}`}
                    />
                  ) : (
                    <X 
                      className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" 
                      aria-label="Not supported"
                      data-testid={`mobile-icon-x-${capability.key}-${productIndex}`}
                    />
                  )}
                </div>
              ))}
            </div>
            {/* Mobile footnote for PureSee */}
            {product.nearNote && (
              <p className="mt-3 text-xs text-muted-foreground italic" data-testid={`text-mobile-note-${productIndex}`}>
                * {product.nearNote}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div 
        className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground"
        role="region"
        aria-label="Chart legend"
        data-testid="comparison-legend"
      >
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-accent" aria-hidden="true" />
          <span>Feature Available</span>
        </div>
        <div className="flex items-center gap-2">
          <X className="w-4 h-4 text-muted-foreground/40" aria-hidden="true" />
          <span>Feature Not Available</span>
        </div>
      </div>
    </section>
  );
};
