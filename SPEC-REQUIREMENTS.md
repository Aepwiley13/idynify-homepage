# Idynify Spec Requirements Document

## 1. Data Model (Firebase/Firestore)

### Collections

#### `users` Collection
```javascript
{
  uid: string (document ID),
  email: string,
  fullName: string,
  company: string,
  phone: string,
  industry: string,
  tier: string ('tier1' | 'tier2' | 'tier3'),
  status: string ('active' | 'inactive'),
  createdAt: ISO timestamp,

  // ICP Progress
  icpStarted: boolean,
  icpStartedAt: ISO timestamp,
  icpSubmitted: boolean,
  icpSubmittedAt: ISO timestamp,
  icpCompleted: boolean,
  icpCompletedAt: ISO timestamp,

  // Questionnaire Progress
  currentSection: number (1-8),
  currentQuestion: number,
  completedQuestions: number (0-79),
  lastUpdated: ISO timestamp,

  // ICP Data Storage
  icpData: {
    // Section 1: Company Information (10 fields)
    companyName, website, yearFounded, companyStage, employeeCount,
    annualRevenue, fundingStage, primaryIndustry, secondaryIndustry,
    companyDescription,

    // Section 2: Product/Service (10 fields)
    productName, productCategory, productDescription, uniqueValue,
    pricingModel, averageContractValue, salesCycle, competitorsList,
    competitiveAdvantage, productMaturity,

    // Section 3: Current Customer Base (10 fields)
    totalCustomers, customerGrowthRate, customerRetentionRate,
    topCustomerIndustries[], averageCustomerSize, customerGeography[],
    expansionRate, churnRate, npsScore, customerSuccessStories,

    // Section 4: Target Market (10 fields)
    targetMarketSize, targetIndustries[], targetCompanySize[],
    targetGeography[], targetDepartments[], targetJobTitles,
    targetSeniority[], targetTechStack, targetGrowthStage[], targetBudget,

    // Section 5: Pain Points (10 fields)
    primaryPainPoint, secondaryPainPoints, currentSolutions, solutionGaps,
    urgencyLevel, impactOfNotSolving, desiredOutcomes, successMetrics,
    buyingTriggers[], objections,

    // Section 6: Buyer Personas (10 fields)
    championPersona, championTitle, championGoals, championChallenges,
    decisionMakerPersona, decisionMakerTitle, decisionCriteria, influencers,
    buyingCommittee, approvalProcess,

    // Section 7: Sales & Marketing (10 fields)
    leadSources[], marketingChannels[], contentTypes[], messagingThemes,
    valueProposition, differentiators, socialProof, salesEnablement,
    partnerChannels, communityPresence,

    // Section 8: Behavioral & Psychographic (9 fields)
    buyingBehavior, researchProcess, informationSources[], peerInfluence,
    riskTolerance, innovationAppetite, brandPreferences, communicationStyle,
    culturalValues
  },

  // Generated ICP
  generatedICP: {
    executiveSummary: {
      title, idealCustomerGlance, perfectFitIndicators[], antiProfile[],
      keyInsight
    },
    firmographics: {
      companySize, stage, budget, decisionSpeed, primaryIndustries[],
      decisionMakers[], linkedinSignals[]
    },
    psychographics: {
      topPainPoints[], coreValues[], goalsAspirations[], commonPhrases[],
      emotionalState[]
    },
    behavioralIndicators: {
      hotTriggers[], researchBehavior[], bestTimes[], avoidTimes[]
    },
    icpScoring: {
      description, scoreRanges[], criteria[]
    },
    messaging: {
      valueProposition, resonates[], avoid[], coldOutreachTemplates[],
      objectionHandling[]
    },
    channels: {
      primary: {name, why, tactics[]},
      secondary[], communities[], events[]
    },
    actionPlan: {
      diyApproach: {description, timeCommitment, investment},
      doneForyou: {description, whatTheyGet[], investment}
    }
  }
}
```

#### `requests` Collection
```javascript
{
  id: string (auto-generated),
  fullName: string,
  company: string,
  email: string,
  phone: string,
  industry: string,
  status: string ('pending' | 'approved' | 'rejected'),
  createdAt: ISO timestamp,
  createdAtTimestamp: number,

  // Approval workflow
  signupToken: string (generated on approval),
  accountCreated: boolean,
  accountCreatedAt: ISO timestamp,
  userId: string (reference to users collection)
}
```

#### `config` Collection
```javascript
{
  apiKeys: {
    anthropic: string (Claude API key)
  }
}
```

---

## 2. Core Features

### Feature 1: Access Request System
- Public form to request platform access
- Admin approval workflow with unique signup tokens
- Email verification system

### Feature 2: User Authentication
- Email/password signup with token validation
- Email/password login
- Session management via Firebase Auth
- Protected route handling

### Feature 3: ICP Questionnaire System
- 79-question structured questionnaire across 8 sections
- Multiple input types (text, textarea, select, multiselect, number, URL)
- Progress tracking and auto-save
- Resume functionality
- Section navigation

### Feature 4: AI-Powered ICP Generation
- Claude AI integration via Netlify Functions
- Converts 79 responses into 8-section ICP brief
- JSON-structured output parsing
- Real-time generation status updates

### Feature 5: User Dashboard
- ICP status tracking (not started, in progress, completed)
- Account overview
- Quick access to questionnaire and ICP view
- Progress visualization

### Feature 6: ICP Viewing Interface
- Tab-based navigation for 8 ICP sections
- Executive summary with perfect-fit indicators
- Anti-profile (companies to avoid)
- Scoring framework, messaging templates, channel strategy
- Action plan with DIY vs done-for-you options

---

## 3. Screens & Navigation Map

### Public Screens
1. **Homepage** (`/`) - IdynifyHomepage.jsx
2. **Request Access** (`/request`) - Request.jsx
3. **Login** (`/login`) - Login.jsx
4. **Signup** (`/signup?token=xyz`) - Signup.jsx

### Protected Screens (Require Authentication)
5. **Dashboard** (`/dashboard`) - Dashboard.jsx
6. **ICP Questionnaire** (`/icp-questionnaire`) - ICPQuestionnaire.jsx
7. **ICP Success** (`/icp-success`) - ICPQuestionnaireSuccess.jsx
8. **ICP View** (`/dashboard/icp`) - UserICPView.jsx
9. **Admin Dashboard** (`/admin`) - AdminDashboard.jsx
10. **API Setup** (`/api-setup`) - ApiKeySetup.jsx

---

## 4. Screen-by-Screen Specifications

### Screen 1: Homepage (`/`)
**Purpose:** Marketing landing page to attract and convert visitors

**Key Elements:**
- Hero section with value proposition
- Pricing tiers (Tier 1: $49.99, Tier 2: $99.99, Tier 3: $149.99)
- How it works (4-step process)
- What's included (8 ICP sections)
- Testimonials
- Comparison table (Idynify vs Consultants vs DIY)

**Buttons:**
- "Build Your ICP Now" → `/request`
- "Get Started" (multiple instances) → `/request`
- "Contact Us" (Tier 2/3) → `mailto:support@idynify.com`

**Acceptance Criteria:**
- ✅ All pricing information displays correctly
- ✅ CTA buttons navigate to correct pages
- ✅ Responsive design works on mobile/tablet/desktop
- ✅ Contact emails open with pre-filled subject/body

---

### Screen 2: Request Access (`/request`)
**Purpose:** Capture lead information for approval workflow

**Form Fields:**
- Full Name (required, text)
- Company Name (required, text)
- Email Address (required, email validation)
- Phone Number (required, tel format validation)
- Industry Sector (required, dropdown with 24 options)

**Buttons:**
- "Submit Application" → Adds to `requests` collection → Success screen

**Acceptance Criteria:**
- ✅ All required fields validated before submission
- ✅ Email format validation working
- ✅ Phone number accepts international formats
- ✅ Request saved to Firestore with status='pending'
- ✅ Success message displays after submission
- ✅ User can return to homepage

---

### Screen 3: Login (`/login`)
**Purpose:** Authenticate existing users

**Form Fields:**
- Email Address (required)
- Password (required)

**Buttons:**
- "Enter Mission Control" → Authenticate → `/dashboard`
- "Request Access" → `/request`
- "Contact Support" → `mailto:support@idynify.com`

**Acceptance Criteria:**
- ✅ Successful login redirects to dashboard
- ✅ Invalid credentials show error message
- ✅ Too many attempts shows rate limit error
- ✅ Firebase auth state persists across sessions
- ✅ Error messages are user-friendly

---

### Screen 4: Signup (`/signup?token=xyz`)
**Purpose:** Create account after admin approval

**Validation:**
- Token must exist in `requests` collection
- Request status must be 'approved'
- Token must not be already used

**Form Fields:**
- Password (required, min 8 characters)
- Confirm Password (required, must match)

**Pre-populated Display:**
- Full Name, Email, Company, Industry (from request)

**Buttons:**
- "Create Account" → Create Firebase user → Create Firestore doc → `/icp-questionnaire`

**Acceptance Criteria:**
- ✅ Invalid/expired tokens show error screen
- ✅ Used tokens redirect to login
- ✅ Password minimum length enforced
- ✅ Passwords must match
- ✅ Account creation updates request document
- ✅ User auto-redirected to questionnaire after signup

---

### Screen 5: Dashboard (`/dashboard`)
**Purpose:** Central hub showing ICP status and next actions

**Status States:**
1. **Not Started:** Show "Build My ICP Now" button
2. **In Progress:** Show "Continue ICP" with progress bar
3. **Completed:** Show "View My ICP" button

**Display Sections:**
- Account info card (tier, company, industry)
- ICP status card (with status indicator)
- Leads card (locked until ICP complete)
- 3-step roadmap (ICP → Leads → Outreach)

**Buttons:**
- "Build My ICP Now" → `/icp-questionnaire`
- "Continue ICP" → `/icp-questionnaire` (resumes at saved position)
- "View My ICP" → `/dashboard/icp`
- "Logout" → Sign out → `/login`

**Special Features:**
- Success banner appears when `?icp-submitted=true` in URL
- Progress percentage for in-progress ICPs
- Animated starfield background

**Acceptance Criteria:**
- ✅ Status reflects actual ICP completion state
- ✅ Progress bar accurate for in-progress state
- ✅ Success banner auto-dismisses after 10 seconds
- ✅ User can only access ICP view if completed
- ✅ Logout clears session and redirects

---

### Screen 6: ICP Questionnaire (`/icp-questionnaire`)
**Purpose:** Collect 79 structured responses for ICP generation

**Layout:**
- Progress bar (percentage complete)
- Section indicator (1-8)
- Question counter (per section and overall)
- Single question displayed at a time
- Quick section navigation at bottom

**Question Types:**
- Text input (e.g., company name)
- Number input (e.g., customer count)
- URL input (e.g., website)
- Textarea (e.g., product description)
- Select dropdown (e.g., company stage)
- Multiselect checkboxes (e.g., target industries)

**8 Sections:**
1. Company Information (10 questions)
2. Product/Service Information (10 questions)
3. Current Customer Base (10 questions)
4. Target Market Definition (10 questions)
5. Customer Pain Points & Needs (10 questions)
6. Buyer Personas (10 questions)
7. Sales & Marketing (10 questions)
8. Behavioral & Psychographic (9 questions)

**Navigation:**
- "Previous" button (disabled on Q1)
- "Next" button (moves to next question)
- "Complete & Generate ICP" button (only on last question)
- Jump to section buttons (1-8)

**Auto-Save:**
- Saves on every "Next" click
- Updates `icpData`, `currentSection`, `currentQuestion` in Firestore
- Saves completed question count

**Buttons:**
- "Next" → Save progress → Next question
- "Previous" → Previous question (no save)
- "Complete & Generate ICP" → Save → Call Claude API → Save generated ICP → `/dashboard?icp-submitted=true`
- "Logout" → Sign out → `/login`

**Acceptance Criteria:**
- ✅ All 79 questions accessible
- ✅ Progress saves automatically on Next
- ✅ User can resume from last position
- ✅ Required field validation working
- ✅ Multiselect allows multiple selections
- ✅ Section navigation works correctly
- ✅ Progress bar updates in real-time
- ✅ Generation screen shows while API processes
- ✅ Errors display if API fails
- ✅ Generated ICP saves to Firestore
- ✅ Redirects to dashboard on completion

---

### Screen 7: ICP View (`/dashboard/icp`)
**Purpose:** Display generated ICP with 8 structured sections

**Navigation:**
- 8 tab buttons (Executive Summary, Firmographics, etc.)
- Sticky header and tab navigation
- Back to Dashboard button

**Content Sections:**
1. **Executive Summary**
   - Ideal customer at-a-glance
   - Perfect fit indicators (green box)
   - Anti-profile (red box)
   - Key insight

2. **Firmographics**
   - Company size, stage, budget
   - Decision speed, industries
   - Decision makers, LinkedIn signals

3. **Psychographics**
   - Top 5 pain points (ranked)
   - Core values, goals/aspirations
   - Common phrases, emotional state

4. **Behavioral Indicators**
   - Hot buying triggers
   - Research behavior, best/avoid times

5. **ICP Scoring (0-100)**
   - Scoring ranges (85-100: Perfect, 70-84: Strong, etc.)
   - Weighted criteria (firmographics 30%, need 40%, timing 30%)

6. **Messaging Guidelines**
   - Value proposition
   - What resonates/avoid
   - Cold outreach templates
   - Objection handling

7. **Channel Strategy**
   - Primary channel (LinkedIn)
   - Secondary channels
   - Communities, events

8. **Action Plan**
   - DIY approach (time, cost)
   - Done-for-you with Idynify (includes lead delivery)

**Buttons:**
- "Back to Dashboard" → `/dashboard`
- Tab navigation buttons (switch sections)

**Acceptance Criteria:**
- ✅ Only accessible if ICP completed
- ✅ All 8 sections render from Firestore data
- ✅ Tab navigation works smoothly
- ✅ Sticky header remains visible on scroll
- ✅ Content displays in structured, readable format
- ✅ Error state if ICP not found
- ✅ Can return to dashboard

---

### Screen 8: Admin Dashboard (`/admin`)
**Purpose:** Approve/reject access requests

**Features:**
- View all pending requests
- Approve (generates signup token)
- Reject requests
- Search/filter functionality

**Acceptance Criteria:**
- ✅ Only accessible to admin users
- ✅ Displays all pending requests
- ✅ Approval generates unique token
- ✅ Token included in email to applicant
- ✅ Status updates in real-time

---

## 5. APIs & External Tools

### External APIs

#### 1. Anthropic Claude API
**Endpoint:** `https://api.anthropic.com/v1/messages`
**Model:** `claude-sonnet-4-20250514`
**Purpose:** Generate ICP brief from questionnaire responses
**Max Tokens:** 4000
**Timeout:** 180 seconds

**Request:**
```javascript
{
  model: "claude-sonnet-4-20250514",
  max_tokens: 4000,
  messages: [{
    role: "user",
    content: <ICP generation prompt>
  }]
}
```

**Response:**
```javascript
{
  content: [{
    text: "<JSON-formatted ICP brief>"
  }]
}
```

#### 2. Firebase Services

**Firebase Authentication**
- Email/password authentication
- Session management
- `onAuthStateChanged` listener

**Firestore Database**
- Real-time NoSQL database
- Collections: `users`, `requests`, `config`
- Real-time listeners for live updates

### Internal APIs (Netlify Functions)

#### Function: `generate-icp`
**Path:** `/.netlify/functions/generate-icp`
**Method:** POST
**Timeout:** 26 seconds (Netlify function limit)

**Purpose:** Proxy to Claude API to keep API key secure

**Request Body:**
```javascript
{
  apiKey: string,
  prompt: string
}
```

**Response:**
```javascript
{
  content: [{
    text: string (JSON ICP brief)
  }]
}
```

**Error Handling:**
- 400: Missing parameters
- 405: Invalid method
- 504: Timeout (>180s)
- 500: Server error

---

## 6. User Flows

### Flow 1: New User Signup → ICP Generation
1. User lands on homepage `/`
2. Clicks "Build Your ICP Now" → `/request`
3. Fills out access request form → Submits
4. Admin approves → Generates token → Emails user
5. User clicks email link → `/signup?token=xyz`
6. Creates password → Account created → `/icp-questionnaire`
7. Completes 79 questions (auto-saves progress)
8. Clicks "Complete & Generate ICP"
9. Barry AI generates ICP (30-60 seconds)
10. Redirects to `/dashboard?icp-submitted=true`
11. Clicks "View My ICP" → `/dashboard/icp`

### Flow 2: Returning User (ICP In Progress)
1. User visits `/login`
2. Enters credentials → `/dashboard`
3. Sees "In Progress" status with 45% complete
4. Clicks "Continue ICP" → `/icp-questionnaire`
5. Resumes at Question 36 (saved position)
6. Continues answering questions

### Flow 3: Returning User (ICP Completed)
1. User visits `/login`
2. Enters credentials → `/dashboard`
3. Sees "ICP Complete" status
4. Clicks "View My ICP" → `/dashboard/icp`
5. Browses 8 sections of generated ICP

---

## 7. Acceptance Criteria by Feature

### Feature: Access Request System
- ✅ Form validates all required fields
- ✅ Email format validation working
- ✅ Phone accepts international formats
- ✅ Request saves to Firestore with timestamp
- ✅ Success message displays after submission
- ✅ Duplicate submissions allowed (for now)

### Feature: User Authentication
- ✅ Signup only works with valid token
- ✅ Expired/used tokens show error
- ✅ Password min 8 characters enforced
- ✅ Login validates credentials
- ✅ Protected routes redirect to login if not authenticated
- ✅ Session persists across browser refresh
- ✅ Logout clears session completely

### Feature: ICP Questionnaire
- ✅ All 79 questions load correctly
- ✅ Progress saves on each Next click
- ✅ User can resume from saved position
- ✅ Required fields cannot be skipped
- ✅ Multiselect allows multiple selections
- ✅ Progress bar shows accurate percentage
- ✅ Section navigation works
- ✅ Previous button navigates back
- ✅ Can jump between sections

### Feature: AI ICP Generation
- ✅ API call triggers on final submission
- ✅ Loading screen displays during generation
- ✅ Timeout handled gracefully (180s max)
- ✅ JSON response parsed correctly
- ✅ Generated ICP saves to Firestore
- ✅ Error message displays if API fails
- ✅ User can retry if generation fails
- ✅ Redirect to dashboard on success

### Feature: User Dashboard
- ✅ Status reflects ICP completion state
- ✅ Progress bar accurate for in-progress
- ✅ Success banner displays after completion
- ✅ Banner auto-dismisses after 10s
- ✅ CTA buttons navigate correctly
- ✅ Account info displays correctly
- ✅ Logout redirects to login

### Feature: ICP View
- ✅ Only accessible if ICP completed
- ✅ All 8 sections render from data
- ✅ Tab navigation switches sections
- ✅ Sticky header visible on scroll
- ✅ Content readable and well-formatted
- ✅ Perfect-fit indicators display in green box
- ✅ Anti-profile displays in red box
- ✅ Action plan shows DIY vs done-for-you
- ✅ Back button returns to dashboard

---

## 8. Technical Constraints

### Performance
- Questionnaire auto-save must complete <500ms
- ICP generation must complete within 180s
- Dashboard load time <2s

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Security
- API keys stored in Firestore `config` collection
- Never exposed to client
- Netlify function acts as secure proxy
- Firebase Auth handles session security
- All routes protected via auth state

### Deployment
- Hosted on Netlify
- Serverless functions for API calls
- Environment variables for sensitive data
- Automatic deploys from git push

---

**Document Version:** 1.0
**Last Updated:** December 2025
**Status:** Ready for Development
