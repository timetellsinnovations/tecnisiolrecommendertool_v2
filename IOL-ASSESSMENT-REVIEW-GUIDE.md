# TECNIS™ IOL Selection Tool - Assessment Review Guide

**Document Purpose**: Comprehensive guide for team review of the IOL recommendation logic, question flow, and all possible outcomes.

**Last Updated**: December 19, 2025

---

## Executive Summary

This tool guides patients through a 5-question assessment to recommend one of **3 approved TECNIS™ IOL products** (plus Toric variants for astigmatism) based on their lifestyle, preferences, and eye health. The recommendation algorithm prioritizes patient safety while matching lens capabilities to patient needs.

### Approved IOL Products

| Base Model | Standard Version | Toric Version (for Astigmatism) |
|------------|------------------|--------------------------------|
| **Eyhance** | TECNIS Eyhance™ IOL | TECNIS Eyhance™ Toric II IOL |
| **PureSee** | TECNIS PureSee™ IOL | TECNIS PureSee™ Toric IOL |
| **Odyssey** | TECNIS Odyssey™ IOL | TECNIS Odyssey™ Toric II IOL |

---

## Results Page Features

### 1. Call-to-Action Box (Red Banner)
At the top of results, patients see a prominent red banner:
> **Your Next Step**  
> **Ask your doctor about TECNIS [Lens Name]**

This displays the base model name (Eyhance, PureSee, or Odyssey) without the Toric suffix.

### 2. "Why You Matched" Section
Shows the specific user answers that led to the recommendation:

**For Odyssey recommendations:**
- "Your goal of spectacle independence"
- "Reading activities" (if selected)
- "Detail work and crafts" (if selected)
- "Computer work" (if selected)
- "Frequent night driving" or "Occasional night driving" (if applicable)

**For PureSee recommendations:**
- "Your preference for less glasses dependence"
- "Driving activities" (if selected)
- "Sports and recreation" (if selected)
- "Frequent night driving" or "Occasional night driving" (if applicable)

**For Eyhance recommendations:**
- "Your comfort with wearing glasses" (if "don't mind" selected)
- "Based on your overall responses" (fallback default)
- "You indicated previous eye surgery or conditions" (if eye history override)

### 3. Eye History Override Message (Amber Alert)
When Eyhance is recommended due to significant eye history (not by preference), an amber-colored message appears:

> **Important Information**  
> Because you selected you have previous eye surgery and conditions, that may exclude you from technologies outside of the basic IOL. **Talk to your eye doctor about this in more detail** — they will evaluate your individual circumstances and discuss all available choices.

This message ONLY appears when:
- Patient selected "Previous Surgery/Conditions" for eye history
- AND their other answers would have otherwise qualified them for PureSee or Odyssey

---

## IOL Product Specifications (Based on J&J Vision Official Data)

### TECNIS Eyhance™ (Enhanced Monofocal)
- **Visual Range**: Distance only
- **Best For**: Patients comfortable with reading glasses
- **Key Benefits**:
  - Clear distance vision for driving and outdoor activities
  - Low risk of halos and glare at night
  - Proven safety and reliability
- **Requires Glasses For**: Intermediate and Near tasks (reading, fine print, computer)

### TECNIS PureSee™ (Extended Depth of Focus - EDOF)
- **Visual Range**: Distance + Intermediate + Near*
- **Best For**: Active patients wanting reduced glasses dependence
- **Key Benefits**:
  - Seamless vision from distance to near (may need glasses for fine print)
  - Great for active lifestyles including golf and sports
  - Excellent performance in low light and night driving
  - Minimal visual disturbances - similar to standard lenses
- **May Need Glasses For**: *Fine print

### TECNIS Odyssey™ (Full Visual Range Multifocal)
- **Visual Range**: Distance + Intermediate + Near
- **Best For**: Patients who strongly want spectacle independence
- **Key Benefits**:
  - Full range of vision - near, intermediate, and far
  - Freedom from glasses for nearly all activities
  - 93% of patients report minimal or no halos and glare
- **Trade-offs**: May experience some halos/glare (though minimal with this lens)

---

## Assessment Question Flow

### Question 1: Activities (Multi-Select)
**"Which activities are most important to your daily routine?"**

| Option | Description | Classification |
|--------|-------------|----------------|
| Reading | Books, newspapers, tablets | **Near Activity** |
| Computer Work | Professional or personal computer use | **Intermediate Activity** |
| Driving | Daily commuting and travel | **Intermediate Activity** |
| Sports/Recreation | Athletic activities and hobbies | **Intermediate Activity** |
| Detail Work/Crafts | Fine motor activities requiring precision | **Near Activity** |
| Not Sure | Need help determining | **No Classification** (safe default) |

**Activity Classification Logic**:
- **Near Activities**: reading, crafts (count toward Odyssey eligibility)
- **Intermediate Activities**: computer, sports, driving (count toward PureSee eligibility)

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
| Rarely or Never | Minimal night or challenging condition driving | No impact on recommendation (Odyssey can still be triggered with near activities + "hate glasses" regardless of night driving frequency) |

---

### Question 4: Eye History (Single-Select)
**"Do you have any history of eye conditions or surgeries?"**

| Option | Description | Impact on Recommendation |
|--------|-------------|-------------------------|
| No Significant History | No prior surgeries, major complications, dry eye, or allergies | No override |
| **Previous Surgery/Conditions** | Prior eye surgery, glaucoma, macular degeneration, etc. | **OVERRIDES ALL OTHER CRITERIA → Eyhance + Special Message** |

**Safety Note**: Significant eye history always results in Eyhance recommendation regardless of other preferences, as it is the safest option for complex cases. The special eye history override message is displayed.

---

### Question 5: Astigmatism (Single-Select)
**"Do you have astigmatism?"**

| Option | Description | Impact on Recommendation |
|--------|-------------|-------------------------|
| **Yes** | Diagnosed with astigmatism | **Applies Toric variant** to base model |
| No | No astigmatism | Standard (non-Toric) version |
| Not Sure | Need to check with eye doctor | **Shows BOTH Toric and non-Toric options** (e.g., "TECNIS Odyssey™ IOL or TECNIS Odyssey™ Toric II IOL") |

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
┌─────────────────────────────┐   ┌─────────────────────────────────┐
│ RECOMMEND: EYHANCE          │   │ STEP 2: Check Glasses + Near    │
│ (Safety Override)           │   │ Is glasses = "hate-glasses"     │
│ + Show Override Message     │   │ AND near activities > 0?        │
└─────────────────────────────┘   └─────────────────────────────────┘
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
│  • Eyhance → Eyhance™ Toric II                                  │
│  • PureSee → PureSee™ Toric                                     │
│  • Odyssey → Odyssey™ Toric II                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Complete Scenario Matrix

### Eyhance Scenarios (Safe/Conservative)

| # | Activities | Glasses Pref | Night Driving | Eye History | Astigmatism | **Result** | Override Message |
|---|------------|--------------|---------------|-------------|-------------|------------|------------------|
| 1 | Any | Any | Any | **Significant** | No | **Eyhance** | YES |
| 2 | Any | Any | Any | **Significant** | Yes | **Eyhance Toric II** | YES |
| 3 | reading, driving | **Don't mind** | Rarely | None | No | **Eyhance** | No |
| 4 | sports, driving | **Don't mind** | Occasionally | None | Yes | **Eyhance Toric II** | No |
| 5 | **Not sure** | Nice not to wear | Rarely | None | No | **Eyhance** (safe default) | No |
| 6 | sports, driving (no near) | **Hate glasses** | Rarely | None | No | **Eyhance** (no near activities) | No |
| 7 | reading, crafts (near only) | **Nice not to wear** | Rarely | None | No | **Eyhance** (no intermediate) | No |

**Key Insight**: Eyhance is recommended when:
- Patient has significant eye history (safety override) - **shows amber message**
- Patient is comfortable wearing glasses
- Patient's activity/preference combination doesn't qualify for PureSee or Odyssey

---

### PureSee Scenarios (Active Lifestyle)

| # | Activities | Glasses Pref | Night Driving | Eye History | Astigmatism | **Result** |
|---|------------|--------------|---------------|-------------|-------------|------------|
| 1 | sports, driving | **Nice not to wear** | Rarely | None | No | **PureSee** |
| 2 | driving | **Nice not to wear** | **Frequently** | None | No | **PureSee** |
| 3 | computer, sports | **Nice not to wear** | **Occasionally** | None | No | **PureSee** |
| 4 | sports, driving | **Nice not to wear** | Frequently | None | Yes | **PureSee Toric** |
| 5 | reading (near only) | **Nice not to wear** | **Frequently** | None | No | **PureSee** (night driving qualifies) |
| 6 | computer | **Nice not to wear** | Occasionally | None | Not Sure | **PureSee or PureSee Toric** |

**Key Insight**: PureSee is recommended when:
- Patient prefers less glasses dependence ("nice not to wear")
- AND has intermediate activities (computer/sports/driving) OR drives at night frequently/occasionally
- No significant eye history

---

### Odyssey Scenarios (Maximum Independence)

| # | Activities | Glasses Pref | Night Driving | Eye History | Astigmatism | **Result** |
|---|------------|--------------|---------------|-------------|-------------|------------|
| 1 | **reading** | **Hate glasses** | Rarely | None | No | **Odyssey** |
| 2 | **crafts** | **Hate glasses** | Occasionally | None | No | **Odyssey** |
| 3 | **reading, crafts** | **Hate glasses** | Frequently | None | No | **Odyssey** |
| 4 | **reading, driving** | **Hate glasses** | Rarely | None | No | **Odyssey** |
| 5 | **crafts** | **Hate glasses** | Rarely | None | Yes | **Odyssey Toric II** |
| 6 | **reading, crafts** | **Hate glasses** | Rarely | None | Not Sure | **Odyssey or Odyssey Toric II** |

**Key Insight**: Odyssey is recommended when:
- Patient strongly dislikes glasses ("hate glasses")
- AND has at least one near activity (reading or crafts)
- No significant eye history

---

## Edge Cases and Safe Defaults

| Scenario | Expected Behavior | Rationale |
|----------|-------------------|-----------|
| "Not sure" activities + any preference | **Eyhance** | Can't determine activity needs, default to safest |
| Hate glasses but ONLY computer/sports/driving (no near) | **Eyhance** | Odyssey requires near activities (reading/crafts) to justify full multifocal |
| Nice not to wear but ONLY reading/crafts (no intermediate) + rarely drives at night | **Eyhance** | PureSee requires intermediate focus or night driving |
| Any combination with significant eye history | **Eyhance + Override Message** | Safety always takes priority |
| Astigmatism = "not sure" | **Shows BOTH versions** (e.g., "IOL or IOL Toric") | Avoids cost surprise when patient learns they have astigmatism at practice visit |

---

## IOL Comparison Chart (Displayed on Results Page)

The results page includes a visual comparison chart showing all 6 approved products:

| IOL Product | Distance | Intermediate | Near | Astigmatism |
|-------------|:--------:|:------------:|:----:|:-----------:|
| TECNIS Eyhance™ | ✓ | ✓ | ✗ | ✗ |
| TECNIS Eyhance™ Toric II | ✓ | ✓ | ✗ | ✓ |
| TECNIS PureSee™ | ✓ | ✓ | ✓* | ✗ |
| TECNIS PureSee™ Toric | ✓ | ✓ | ✓* | ✓ |
| TECNIS Odyssey™ | ✓ | ✓ | ✓ | ✗ |
| TECNIS Odyssey™ Toric II | ✓ | ✓ | ✓ | ✓ |

**Legend**:
- ✓ = Feature/capability available
- ✗ = Feature/capability not available
- *TECNIS PureSee™: May need glasses for fine print

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

## Official References & Source Documents

### Primary Source Documents (Johnson & Johnson Vision)

#### TECNIS Eyhance™ IOL
| Document Type | Model | Document Number | Notes |
|--------------|-------|-----------------|-------|
| **DFU (US)** | DIB00 (preloaded) | Z311769E | U.S. Directions for Use |
| **DFU (INT)** | ICB00 (non-preloaded) | Z311583 | International version |
| **Toric II DFU** | ICU150-ICU600 | Z311058, Rev. 04 | Astigmatism correction |
| **Compendium** | All Eyhance | PP2022CT5439 | TECNIS Eyhance Compendium 2H 2022 - EMEA |

**Official Product Page:** https://www.jnjvisionpro.com/en-us/products/tecnis-eyhance/

#### TECNIS PureSee™ IOL
| Document Type | Model | Document Number | Notes |
|--------------|-------|-----------------|-------|
| **DFU (INT)** | ZEN00V (non-toric) | Z311973 | International Directions for Use |
| **DFU (Preloaded)** | DEN00V | Z311782 | With TECNIS SIMPLICITY™ Delivery System |
| **Toric II DFU** | DET100-DET600 | Z311783 | Astigmatism correction variants |
| **Compendium** | All PureSee | 2024 EMEA | TECNIS PureSee IOL Compendium 2024 |

**Official Product Page:** https://www.jnjvisionpro.com/en-eu/products/tecnis-puresee/

#### TECNIS Odyssey™ IOL
| Document Type | Model | Document Number | Notes |
|--------------|-------|-----------------|-------|
| **DFU (US)** | DRN00V | Z311926E, Rev B 07/2023 | U.S. Directions for Use |
| **Toric II DFU** | DRT150-DRT375 | Z311927E | Astigmatism correction variants |
| **DFU (EU/INT)** | All Odyssey | Z311982E | European/International version |
| **Spec Sheets** | All Odyssey | 2024REF4544 | TECNIS Odyssey IOL Spec Sheets 2024 |

**Official Product Page:** https://www.jnjvisionpro.com/en-us/products/tecnis-odyssey/

---

### Clinical Study References (Data on File - Johnson & Johnson)

#### Odyssey IOL Clinical Data
| Reference ID | Study Description | Sample Size |
|-------------|-------------------|-------------|
| **DOF2023CT4050** | Multicenter retrospective real-world study (1-month) | n=96 |
| **2024DOF4029** | Multicenter observational study (3-month) | n=33 |
| **DOF2023CT4023** | Simulated visual acuity, defocus curves | Bench |
| **2024DOF4030** | Low-light contrast comparison vs. PanOptix | Bench |
| **DOF2020CT4014** | Comparative clinical evaluation vs. PanOptix (Forte 1 study) | Clinical |

#### PureSee IOL Clinical Data
| Reference ID | Study Description |
|-------------|-------------------|
| **DOF2023CT4011** | Visual symptoms simulations |
| **DOF2023CT4043** | Clinical investigation patient satisfaction outcomes |

#### Key Clinical Claims and Sources
| Claim in Application | Source Reference |
|---------------------|------------------|
| "93% of patients report minimal or no halos and glare" (Odyssey) | DOF2023CT4050, 1-month post-op data |
| "2× better contrast in low lighting" (Odyssey vs. PanOptix) | 2024DOF4030 |
| "97% would recommend to friends/relatives" (PureSee) | DOF2023CT4043 |
| "100% did not need glasses for distance" (PureSee) | DOF2023CT4043 |

---

### Published Clinical Studies

1. **Dick, H. Burkhard MD, et al. (November 2022)** - "A Comparative Clinical Evaluation of a New TECNIS Presbyopia Correcting Intraocular Lens Against a Trifocal Intraocular Lens (Forte 1 Study)"

2. **Eye Journal (2024)** - "Quality of vision clinical outcomes for a new fully-refractive extended depth of focus Intraocular Lens" - PureSee clinical outcomes

3. **Holladay JT. Int'l IOL & Implant Registry 2003.** J Cataract Refract Surg. 2003; 29:176-197

---

### FDA & Regulatory References

| Product | FDA GUDID | Regulatory Status |
|---------|-----------|-------------------|
| TECNIS Eyhance IOL | FDA-cleared | US, EU, Global |
| TECNIS PureSee IOL | CE Mark | EMEA, APAC, Canada (US PMA pending) |
| TECNIS Odyssey IOL | 05050474810693 | US, Japan, EU, Korea, Canada, Singapore, AU, NZ |

**FDA MAUDE Database:** https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfmaude/search.cfm

**AccessGUDID (Odyssey):** https://accessgudid.nlm.nih.gov/devices/05050474810693

---

### Product Technical Specifications

#### Model Numbers & A-Constants
| Product | Model (Non-Toric) | Model (Toric) | A-Constant (Optical) | A-Constant (US) |
|---------|-------------------|---------------|---------------------|-----------------|
| Eyhance | ICB00/DIB00 | ICU150-ICU600 | 119.3 | 118.8 |
| PureSee | ZEN00V/DEN00V | DET100-DET600 | Per DFU | Per DFU |
| Odyssey | DRN00V | DRT150-DRT375 | Per DFU | Per DFU |

#### Material & Design (All TECNIS IOLs)
- **Material:** Hydrophobic acrylic with UV-absorbing properties
- **Optic Diameter:** 6.0 mm
- **Haptic Design:** Frosted haptics for rotational stability
- **Delivery System:** TECNIS SIMPLICITY™ Delivery System (preloaded models)

---

### Healthcare Professional Resources

| Resource | URL |
|----------|-----|
| J&J Vision Pro (US) | https://www.jnjvisionpro.com |
| J&J Vision Pro (EU) | https://www.jnjvisionpro.eu |
| Patient Education | https://www.clearvisionforyou.com |
| TECNIS Toric Calculator | https://www.TecnisToricCalc.com |
| Product Catalog (EMEA) | https://catalog.emeaassets.com/productsen/ |

---

### Document Revision History

| Date | Change | Reference Updated |
|------|--------|-------------------|
| January 2026 | Added official IFU/DFU document numbers | All products |
| January 2026 | Added clinical study references (DOF numbers) | Odyssey, PureSee |
| January 2026 | Added FDA GUDID and regulatory status | All products |

---

## Technical Implementation Notes

### Data Sources
- Product specifications based on official J&J Vision TECNIS™ IFU/DFU documentation (see references above)
- Visual capabilities verified against published clinical data and Data on File references
- Decision criteria aligned with ophthalmology best practices and on-label indications

### Code Location
- Assessment logic: `client/src/hooks/useAssessment.tsx`
- Results display: `client/src/components/ResultsCard.tsx`
- Comparison chart: `client/src/components/IOLComparisonChart.tsx`
- Types: `client/src/types/assessment.ts`

### Key Data Fields in Results
- `primaryIOL`: Full IOL name including Toric suffix if applicable
- `baseModel`: 'eyhance' | 'puresee' | 'odyssey' (used for CTA display)
- `matchScore`: Confidence percentage (85-95%)
- `matchReasons`: Array of strings explaining why this recommendation was made
- `isEyeHistoryOverride`: Boolean indicating if Eyhance was chosen due to safety override
- `benefits`: Array of patient-friendly benefit descriptions
- `considerations`: Array of important disclaimers

### Testing Coverage
- All logic paths validated through automated end-to-end tests
- Edge cases validated for safe defaults
- Responsive design tested on mobile, tablet, and desktop

---

## Questions for Review Team

1. **Decision Logic**: Does the criteria-based algorithm accurately reflect clinical best practices for IOL selection?

2. **Product Benefits**: Are the patient-friendly benefit descriptions accurate and appropriate?

3. **Edge Cases**: Are the safe defaults (defaulting to Eyhance) appropriate for unclear scenarios?

4. **Comparison Chart**: Does the simplified 3-product capability matrix accurately represent each product's visual range?

5. **Eye History Override**: Is the amber warning message appropriate for patients with significant eye history?

6. **"Why You Matched"**: Are the match reason descriptions clear and helpful for patients?

7. **Disclaimers**: Is the medical disclaimer comprehensive enough for regulatory compliance?

---

**Document prepared for internal review. Not for patient distribution.**
