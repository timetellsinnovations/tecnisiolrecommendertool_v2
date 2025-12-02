# TECNIS® IOL Selection Tool - Assessment Review Guide

**Document Purpose**: Comprehensive guide for team review of the IOL recommendation logic, question flow, and all possible outcomes.

**Last Updated**: December 2, 2025

---

## Executive Summary

This tool guides patients through a 5-question assessment to recommend one of **6 approved TECNIS® IOL products** based on their lifestyle, preferences, and eye health. The recommendation algorithm prioritizes patient safety while matching lens capabilities to patient needs.

### Approved IOL Products (6 Total)

| Base Model | Standard Version | Toric Version (for Astigmatism) |
|------------|------------------|--------------------------------|
| **Eyhance** | TECNIS® Eyhance™ IOL | TECNIS® Eyhance™ Toric II IOL |
| **PureSee** | TECNIS® PureSee™ IOL | TECNIS® PureSee™ Toric IOL |
| **Odyssey** | TECNIS® Odyssey™ IOL | TECNIS® Odyssey™ Toric II IOL |

---

## IOL Product Specifications (Based on J&J Vision Official Data)

### TECNIS® Eyhance™ (Enhanced Monofocal)
- **Visual Range**: Distance + Enhanced Intermediate (arm's length)
- **Best For**: Patients comfortable with reading glasses
- **Key Benefits**:
  - Clear distance vision for driving and outdoor activities
  - Improved arm's length vision for phones, dashboards, and cooking
  - Low risk of halos and glare at night
  - Proven safety and reliability
- **Requires Glasses For**: Near tasks (reading, fine print)

### TECNIS® PureSee™ (Extended Depth of Focus - EDOF)
- **Visual Range**: Distance + Intermediate + Functional Near
- **Best For**: Active patients wanting reduced glasses dependence
- **Key Benefits**:
  - Seamless vision from distance to arm's length
  - Great for active lifestyles including golf and sports
  - Excellent performance in low light and night driving
  - Minimal visual disturbances - similar to standard lenses
- **May Need Glasses For**: Extended close reading

### TECNIS® Odyssey™ (Full Visual Range Multifocal)
- **Visual Range**: Distance + Intermediate + Near (Complete Range)
- **Best For**: Patients who strongly want glasses independence
- **Key Benefits**:
  - Complete range of vision - near, intermediate, and far
  - Freedom from glasses for nearly all activities
  - Read small print on phones and tablets easily
  - Two times better contrast in dim lighting than competing lenses
  - 93% of patients report minimal or no halos and glare
- **Trade-offs**: May experience some halos/glare (though minimal with this lens)

---

## Assessment Question Flow

### Question 1: Activities (Multi-Select)
**"Which activities are most important to your daily routine?"**

| Option | Description | Classification |
|--------|-------------|----------------|
| Reading | Books, newspapers, tablets | **Near Activity** |
| Computer Work | Professional or personal computer use | **Near Activity** |
| Driving | Daily commuting and travel | **Intermediate Activity** |
| Sports/Recreation | Athletic activities and hobbies | **Intermediate Activity** |
| Detail Work/Crafts | Fine motor activities requiring precision | **Near Activity** |
| Not Sure | Need help determining | **No Classification** (safe default) |

**Activity Classification Logic**:
- **Near Activities**: reading, computer, crafts (count toward Odyssey eligibility)
- **Intermediate Activities**: sports, driving (count toward PureSee eligibility)

---

### Question 2: Glasses Preference (Single-Select)
**"How do you feel about wearing glasses after cataract surgery?"**

| Option | Description | Impact on Recommendation |
|--------|-------------|-------------------------|
| **I hate wearing glasses** | Strongly want to be glasses-free | Triggers Odyssey (if near activities selected) |
| **It would be nice not to wear glasses** | Prefer less dependence on glasses | Triggers PureSee (if intermediate activities OR night driving) |
| **I do not mind wearing glasses** | Comfortable with glasses | Triggers Eyhance (safe, reliable option) |

---

### Question 3: Night Driving (Single-Select)
**"How often do you drive at night or in low light conditions?"**

| Option | Description | Impact on Recommendation |
|--------|-------------|-------------------------|
| Frequently | Regular night driving or low-light activities | Can trigger PureSee (with "nice not to wear" preference) |
| Occasionally | Some evening or challenging condition driving | Can trigger PureSee (with "nice not to wear" preference) |
| Rarely or Never | Minimal night or challenging condition driving | No impact on recommendation |

---

### Question 4: Eye History (Single-Select)
**"Do you have any history of eye conditions or surgeries?"**

| Option | Description | Impact on Recommendation |
|--------|-------------|-------------------------|
| No Significant History | No prior surgeries or major complications | No override |
| Minor Conditions | Dry eye, allergies, or similar conditions | No override |
| **Previous Surgery/Conditions** | Prior eye surgery, glaucoma, etc. | **OVERRIDES ALL OTHER CRITERIA → Eyhance** |

**Safety Note**: Significant eye history always results in Eyhance recommendation regardless of other preferences, as it is the safest option for complex cases.

---

### Question 5: Astigmatism (Single-Select)
**"Do you have astigmatism?"**

| Option | Description | Impact on Recommendation |
|--------|-------------|-------------------------|
| **Yes** | Diagnosed with astigmatism | **Applies Toric variant** to base model |
| No | No astigmatism | Standard (non-Toric) version |
| Not Sure | Need to check with eye doctor | Standard (non-Toric) version |

---

## Decision Logic Algorithm

```
┌─────────────────────────────────────────────────────────────────┐
│                    START DECISION TREE                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Check Eye History                                      │
│  Is eye history = "significant" (previous surgery/conditions)?  │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │ YES                           │ NO
              ▼                               ▼
┌─────────────────────┐       ┌─────────────────────────────────┐
│ RECOMMEND: EYHANCE  │       │ STEP 2: Check Glasses + Near    │
│ (Safety Override)   │       │ Is glasses = "hate-glasses"     │
└─────────────────────┘       │ AND near activities > 0?        │
                              └─────────────────────────────────┘
                                              │
                              ┌───────────────┴───────────────┐
                              │ YES                           │ NO
                              ▼                               ▼
                ┌─────────────────────┐   ┌─────────────────────────────────┐
                │ RECOMMEND: ODYSSEY  │   │ STEP 3: Check Glasses + Inter   │
                │ (Full Visual Range) │   │ Is glasses = "nice-not-to-wear" │
                └─────────────────────┘   │ AND (intermediate > 0           │
                                          │      OR night driving =         │
                                          │      frequently/occasionally)?  │
                                          └─────────────────────────────────┘
                                                          │
                                          ┌───────────────┴───────────────┐
                                          │ YES                           │ NO
                                          ▼                               ▼
                            ┌─────────────────────┐   ┌─────────────────────────────────┐
                            │ RECOMMEND: PURESEE  │   │ STEP 4: Check Glasses Comfort   │
                            │ (EDOF - Extended)   │   │ Is glasses = "dont-mind"?       │
                            └─────────────────────┘   └─────────────────────────────────┘
                                                                      │
                                                      ┌───────────────┴───────────────┐
                                                      │ YES                           │ NO
                                                      ▼                               ▼
                                        ┌─────────────────────┐   ┌─────────────────────┐
                                        │ RECOMMEND: EYHANCE  │   │ RECOMMEND: EYHANCE  │
                                        │ (User comfortable)  │   │ (Safe Default)      │
                                        └─────────────────────┘   └─────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FINAL STEP: Apply Astigmatism Correction                       │
│  If astigmatism = "yes" → Add "Toric" to base model             │
│  • Eyhance → Eyhance Toric II                                   │
│  • PureSee → PureSee Toric                                      │
│  • Odyssey → Odyssey Toric II                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Complete Scenario Matrix

### Eyhance Scenarios (Safe/Conservative)

| # | Activities | Glasses Pref | Night Driving | Eye History | Astigmatism | **Result** |
|---|------------|--------------|---------------|-------------|-------------|------------|
| 1 | Any | Any | Any | **Significant** | No | **Eyhance** |
| 2 | Any | Any | Any | **Significant** | Yes | **Eyhance Toric II** |
| 3 | reading, driving | **Don't mind** | Rarely | None | No | **Eyhance** |
| 4 | sports, driving | **Don't mind** | Occasionally | None | Yes | **Eyhance Toric II** |
| 5 | **Not sure** | Nice not to wear | Rarely | None | No | **Eyhance** (safe default) |
| 6 | sports, driving (no near) | **Hate glasses** | Rarely | None | No | **Eyhance** (no near activities) |
| 7 | reading, computer (near only) | **Nice not to wear** | Rarely | None | No | **Eyhance** (no intermediate) |

**Key Insight**: Eyhance is recommended when:
- Patient has significant eye history (safety override)
- Patient is comfortable wearing glasses
- Patient's activity/preference combination doesn't qualify for PureSee or Odyssey

---

### PureSee Scenarios (Active Lifestyle)

| # | Activities | Glasses Pref | Night Driving | Eye History | Astigmatism | **Result** |
|---|------------|--------------|---------------|-------------|-------------|------------|
| 1 | sports, driving | **Nice not to wear** | Rarely | None | No | **PureSee** |
| 2 | driving | **Nice not to wear** | **Frequently** | None | No | **PureSee** |
| 3 | sports | **Nice not to wear** | **Occasionally** | Minor | No | **PureSee** |
| 4 | sports, driving | **Nice not to wear** | Frequently | None | Yes | **PureSee Toric** |
| 5 | reading (near only) | **Nice not to wear** | **Frequently** | None | No | **PureSee** (night driving qualifies) |

**Key Insight**: PureSee is recommended when:
- Patient prefers less glasses dependence ("nice not to wear")
- AND has intermediate activities (sports/driving) OR drives at night frequently/occasionally
- No significant eye history

---

### Odyssey Scenarios (Maximum Independence)

| # | Activities | Glasses Pref | Night Driving | Eye History | Astigmatism | **Result** |
|---|------------|--------------|---------------|-------------|-------------|------------|
| 1 | **reading** | **Hate glasses** | Rarely | None | No | **Odyssey** |
| 2 | **computer** | **Hate glasses** | Occasionally | None | No | **Odyssey** |
| 3 | **reading, computer, crafts** | **Hate glasses** | Frequently | None | No | **Odyssey** |
| 4 | **reading, driving** | **Hate glasses** | Rarely | Minor | No | **Odyssey** |
| 5 | **crafts** | **Hate glasses** | Rarely | None | Yes | **Odyssey Toric II** |
| 6 | **reading, computer** | **Hate glasses** | Rarely | None | Yes | **Odyssey Toric II** |

**Key Insight**: Odyssey is recommended when:
- Patient strongly dislikes glasses ("hate glasses")
- AND has at least one near activity (reading, computer, or crafts)
- No significant eye history

---

## Edge Cases and Safe Defaults

| Scenario | Expected Behavior | Rationale |
|----------|-------------------|-----------|
| "Not sure" activities + any preference | **Eyhance** | Can't determine activity needs, default to safest |
| Hate glasses but ONLY sports/driving (no near) | **Eyhance** | Odyssey requires near activities to justify full multifocal |
| Nice not to wear but ONLY reading (no intermediate) + rarely drives at night | **Eyhance** | PureSee requires intermediate focus or night driving |
| Any combination with significant eye history | **Eyhance** | Safety always takes priority |
| Astigmatism = "not sure" | **Non-Toric version** | Err on side of caution, doctor will confirm |

---

## IOL Comparison Chart (Displayed on Results Page)

The results page includes a visual comparison chart showing all 6 approved products:

| IOL Product | Distance | Intermediate | Near | Astigmatism |
|-------------|:--------:|:------------:|:----:|:-----------:|
| TECNIS Eyhance® | ✓ | ✓ | ✗ | ✗ |
| TECNIS Eyhance® Toric II | ✓ | ✓ | ✗ | ✓ |
| TECNIS PureSee® | ✓ | ✓ | ✓ | ✗ |
| TECNIS PureSee® Toric | ✓ | ✓ | ✓ | ✓ |
| TECNIS Odyssey® | ✓ | ✓ | ✓ | ✗ |
| TECNIS Odyssey® Toric II | ✓ | ✓ | ✓ | ✓ |

**Legend**:
- ✓ = Feature/capability available
- ✗ = Feature/capability not available

---

## Match Score Calculation

The tool displays a "match score" (85-95%) indicating how well the patient's answers align with clear recommendation criteria:

| Condition | Score Adjustment |
|-----------|------------------|
| Base Score | 85% |
| Hate glasses + 2+ near activities | +5% |
| Nice not to wear + intermediate activities | +5% |
| Don't mind glasses (clear preference) | +5% |
| Has astigmatism (clear Toric need) | +3% |
| **Maximum Score** | **95%** |

---

## Medical Disclaimer (Displayed on Results)

> "This recommendation is based on your responses and general guidance. Individual results may vary based on your unique eye anatomy and overall health. Your eye surgeon will perform a comprehensive examination and discuss all available options to determine the best IOL for your specific needs. Multiple factors beyond this assessment influence the final IOL selection."

---

## Technical Implementation Notes

### Data Sources
- Product specifications based on official J&J Vision TECNIS® documentation
- Visual capabilities verified against published clinical data
- Decision criteria aligned with ophthalmology best practices

### Code Location
- Assessment logic: `client/src/hooks/useAssessment.tsx`
- Comparison chart: `client/src/components/IOLComparisonChart.tsx`
- Results display: `client/src/components/ResultsCard.tsx`

### Testing Coverage
- 38 documented test scenarios covering all logic paths
- Edge cases validated for safe defaults
- Responsive design tested on mobile, tablet, and desktop

---

## Questions for Review Team

1. **Decision Logic**: Does the criteria-based algorithm accurately reflect clinical best practices for IOL selection?

2. **Product Benefits**: Are the patient-friendly benefit descriptions accurate and appropriate?

3. **Edge Cases**: Are the safe defaults (defaulting to Eyhance) appropriate for unclear scenarios?

4. **Comparison Chart**: Does the capability matrix accurately represent each product's visual range?

5. **Disclaimers**: Is the medical disclaimer comprehensive enough for regulatory compliance?

---

**Document prepared for internal review. Not for patient distribution.**
