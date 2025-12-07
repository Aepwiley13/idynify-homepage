import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function generateICPBrief(formData, userInfo) {
  try {
    const configDoc = await getDoc(doc(db, 'config', 'apiKeys'));
    if (!configDoc.exists() || !configDoc.data().anthropic) {
      throw new Error('API key not configured. Please contact support.');
    }
    const apiKey = configDoc.data().anthropic;

    const prompt = buildICPPrompt(formData, userInfo);

    const response = await fetch('/.netlify/functions/generate-icp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        apiKey: apiKey,
        prompt: prompt
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Function Error:', errorData);
      throw new Error(`Generation error: ${errorData.error || 'Unknown error'}`);
    }

    const data = await response.json();
    const icpText = data.content[0].text;
    const generatedICP = parseICPResponse(icpText);

    return generatedICP;

  } catch (error) {
    console.error('Error generating ICP:', error);
    throw error;
  }
}

function buildICPPrompt(formData, userInfo) {
  const companyName = userInfo.company || 'a company';
  const industry = formData.primaryIndustry || 'their industry';
  const employees = formData.employeeCount || 'their size';
  const revenue = formData.annualRevenue || 'their revenue';
  const targetSize = (formData.targetCompanySize && formData.targetCompanySize[0]) || '100-500 employees';
  const targetBudget = formData.targetBudget || '20K-100K';
  const mainPain = formData.primaryPainPoint || 'Main pain point';
  const desiredOutcome = formData.desiredOutcomes || 'achieve their goals';

  return `You are Barry AI, an expert B2B sales strategist.

Create a concise ICP brief for ${companyName}.

Company: ${companyName}
Industry: ${industry}
Employees: ${employees}
Revenue: ${revenue}

Based on their responses, create an ICP with these 8 sections. Return as valid JSON:

{
  "executiveSummary": {
    "title": "Executive Summary",
    "idealCustomerGlance": "Description of perfect customer for ${companyName}",
    "perfectFitIndicators": ["indicator 1", "indicator 2", "indicator 3"],
    "antiProfile": ["red flag 1", "red flag 2"],
    "keyInsight": "Main insight about their ideal customer"
  },
  "firmographics": {
    "companySize": "${targetSize}",
    "stage": "Growth stage",
    "budget": "${targetBudget}",
    "decisionSpeed": "2-4 weeks",
    "primaryIndustries": [{"name": "${industry}", "fit": "High"}],
    "decisionMakers": [{"role": "CEO", "description": "Decision maker"}],
    "linkedinSignals": ["signal 1", "signal 2"]
  },
  "psychographics": {
    "topPainPoints": [
      {"rank": 1, "pain": "${mainPain}", "description": "Why it matters", "impact": "Critical"}
    ],
    "coreValues": ["value 1", "value 2"],
    "goalsAspirations": ["goal 1", "goal 2"],
    "commonPhrases": ["phrase 1"],
    "emotionalState": ["frustrated", "motivated"]
  },
  "behavioralIndicators": {
    "hotTriggers": [
      {"trigger": "Recent funding", "timing": "90 days", "why": "Growth capital", "action": "Reach out"}
    ],
    "researchBehavior": ["Google search", "Peer recommendations"],
    "bestTimes": ["Q1", "Q3"],
    "avoidTimes": ["December"]
  },
  "icpScoring": {
    "description": "Score 0-100, focus on 70+",
    "scoreRanges": [
      {"range": "85-100", "label": "Perfect Fit", "action": "Priority"},
      {"range": "70-84", "label": "Strong Fit", "action": "Pursue"},
      {"range": "50-69", "label": "Moderate", "action": "Nurture"},
      {"range": "0-49", "label": "Poor Fit", "action": "Pass"}
    ],
    "criteria": [
      {"category": "Firmographics", "weight": 30, "items": [{"item": "Right size", "points": 15}]},
      {"category": "Need", "weight": 40, "items": [{"item": "Has pain point", "points": 20}]},
      {"category": "Timing", "weight": 30, "items": [{"item": "Ready to buy", "points": 15}]}
    ]
  },
  "messaging": {
    "valueProposition": "Help them ${desiredOutcome}",
    "resonates": ["phrases that work"],
    "avoid": ["phrases to avoid"],
    "coldOutreachTemplates": [
      {"name": "Initial", "subject": "Quick question", "body": "Personalized message", "conversionRate": "15%"}
    ],
    "objectionHandling": [
      {"objection": "No budget", "response": "ROI focus"}
    ]
  },
  "channels": {
    "primary": {
      "name": "LinkedIn",
      "why": "B2B decision makers",
      "tactics": ["Sales Navigator", "InMail"]
    },
    "secondary": [
      {"name": "Email", "tactics": ["Cold outreach"]}
    ],
    "communities": ["Industry forums"],
    "events": ["Trade shows"]
  },
  "actionPlan": {
    "diyApproach": {
      "description": "Self-service approach",
      "timeCommitment": "10-15 hours/week",
      "investment": "300-500 per month"
    },
    "doneForyou": {
      "description": "Full service with Idynify",
      "whatTheyGet": ["90 qualified leads per month", "ICP-scored profiles", "Personalized outreach"],
      "investment": "297 per month"
    }
  }
}

Return ONLY valid JSON, no markdown. Be specific to the industry and needs.`;
}

function parseICPResponse(icpText) {
  try {
    let cleanText = icpText.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    }
    
    const parsed = JSON.parse(cleanText);
    return parsed;
  } catch (error) {
    console.error('Error parsing ICP response:', error);
    console.log('Raw response:', icpText);
    throw new Error('Failed to parse ICP response from Claude');
  }
}