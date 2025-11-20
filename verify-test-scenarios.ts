import { AssessmentAnswers, AssessmentResults } from './client/src/types/assessment';

// Extracted calculateResults logic for testing
function calculateResults(answers: AssessmentAnswers): AssessmentResults {
  const activities = answers[1] as string[] || [];
  const glassesFeeling = answers[2] as string;
  const nightDriving = answers[3] as string;
  const eyeHistory = answers[4] as string;
  const astigmatism = answers[5] as string;

  const hasAstigmatism = astigmatism === 'yes';

  const nearActivities = activities.filter(a => 
    ['reading', 'computer', 'crafts'].includes(a)
  ).length;
  const intermediateActivities = activities.filter(a => 
    ['sports', 'driving'].includes(a)
  ).length;

  let baseModel: 'eyhance' | 'puresee' | 'odyssey';

  if (eyeHistory === 'significant') {
    baseModel = 'eyhance';
  }
  else if (glassesFeeling === 'hate-glasses' && nearActivities > 0) {
    baseModel = 'odyssey';
  }
  else if (glassesFeeling === 'nice-not-to-wear' && (intermediateActivities > 0 || nightDriving === 'frequently' || nightDriving === 'occasionally')) {
    baseModel = 'puresee';
  }
  else if (glassesFeeling === 'dont-mind') {
    baseModel = 'eyhance';
  }
  else {
    baseModel = 'eyhance';
  }

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
  
  let matchScore = 85;
  
  if (glassesFeeling === 'hate-glasses' && nearActivities >= 2) matchScore += 5;
  if (glassesFeeling === 'nice-not-to-wear' && intermediateActivities > 0) matchScore += 5;
  if (glassesFeeling === 'dont-mind') matchScore += 5;
  if (hasAstigmatism) matchScore += 3;
  
  matchScore = Math.min(95, matchScore);

  return {
    primaryIOL: recommendation.name,
    matchScore: Math.round(matchScore),
    benefits: recommendation.benefits,
    considerations: [
      'This recommendation is based on your responses and general guidance. Individual results may vary based on your unique eye anatomy and overall health. Your eye surgeon will perform a comprehensive examination and discuss all available options to determine the best IOL for your specific needs. Multiple factors beyond this assessment influence the final IOL selection.'
    ]
  };
}

// Test scenarios
const criticalTests = [
  {
    name: 'Critical Test 1: Don\'t Mind Glasses, No Astigmatism',
    input: {
      1: ['reading', 'driving'],
      2: 'dont-mind',
      3: 'rarely',
      4: 'none',
      5: 'no'
    },
    expected: 'TECNIS® Eyhance™ IOL'
  },
  {
    name: 'Critical Test 2: Hate Glasses + Reading + Astigmatism',
    input: {
      1: ['reading'],
      2: 'hate-glasses',
      3: 'rarely',
      4: 'none',
      5: 'yes'
    },
    expected: 'TECNIS® Odyssey™ Toric II IOL'
  },
  {
    name: 'Critical Test 3: Nice Not to Wear + Sports + Frequent Night Driving',
    input: {
      1: ['sports'],
      2: 'nice-not-to-wear',
      3: 'frequently',
      4: 'none',
      5: 'no'
    },
    expected: 'TECNIS® PureSee™ IOL'
  },
  {
    name: 'Critical Test 4: Significant Eye History Override',
    input: {
      1: ['reading', 'computer', 'crafts'],
      2: 'hate-glasses',
      3: 'rarely',
      4: 'significant',
      5: 'no'
    },
    expected: 'TECNIS® Eyhance™ IOL'
  },
  {
    name: 'Critical Test 5: "Not Sure" Activities + Nice Not to Wear',
    input: {
      1: ['not-sure'],
      2: 'nice-not-to-wear',
      3: 'rarely',
      4: 'none',
      5: 'no'
    },
    expected: 'TECNIS® Eyhance™ IOL'
  }
];

// Run tests
console.log('='.repeat(80));
console.log('TECNIS IOL SELECTION TOOL - CRITICAL TEST VERIFICATION');
console.log('='.repeat(80));
console.log();

let passCount = 0;
let failCount = 0;

criticalTests.forEach((test, index) => {
  console.log(`\n${test.name}`);
  console.log('-'.repeat(80));
  console.log('Input:', JSON.stringify(test.input, null, 2));
  
  const result = calculateResults(test.input);
  const actual = result.primaryIOL;
  const passed = actual === test.expected;
  
  console.log(`Expected: ${test.expected}`);
  console.log(`Actual:   ${actual}`);
  console.log(`Status:   ${passed ? '✓ PASS' : '✗ FAIL'}`);
  console.log(`Match Score: ${result.matchScore}%`);
  
  if (passed) {
    passCount++;
  } else {
    failCount++;
  }
});

console.log('\n' + '='.repeat(80));
console.log(`TEST SUMMARY: ${passCount}/${criticalTests.length} PASSED, ${failCount}/${criticalTests.length} FAILED`);
console.log('='.repeat(80));

process.exit(failCount > 0 ? 1 : 0);
