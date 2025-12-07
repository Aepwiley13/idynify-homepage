const Anthropic = require('@anthropic-ai/sdk');

exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { prospect, icpData, emailType, tone } = JSON.parse(event.body);

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });

    // Build the prompt based on email type and prospect data
    const prompt = buildEmailPrompt(prospect, icpData, emailType, tone);

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const generatedEmail = message.content[0].text;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        email: generatedEmail,
        prospectName: prospect.name
      })
    };

  } catch (error) {
    console.error('Error generating email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to generate email',
        message: error.message 
      })
    };
  }
};

function buildEmailPrompt(prospect, icpData, emailType, tone) {
  const toneDescriptions = {
    professional: 'professional and business-focused',
    casual: 'friendly and conversational',
    enthusiastic: 'energetic and positive'
  };

  const emailTypeInstructions = {
    cold_outreach: `This is a COLD OUTREACH email to someone who has never heard from us before. The goal is to:
    - Get their attention with a relevant pain point or opportunity
    - Build credibility quickly
    - Include a soft, low-pressure call to action
    - Keep it concise (under 150 words)`,
    
    follow_up: `This is a FOLLOW-UP email after initial outreach. The goal is to:
    - Reference the previous touchpoint naturally
    - Provide additional value or insight
    - Make it easy for them to respond
    - Keep it brief and to-the-point`,
    
    meeting_request: `This is a MEETING REQUEST email. The goal is to:
    - State the meeting purpose clearly
    - Explain the value they'll get from the meeting
    - Suggest specific times (make it easy to say yes)
    - Keep it concise and action-oriented`,
    
    value_add: `This is a VALUE-ADD email with no direct ask. The goal is to:
    - Share a relevant resource, insight, or article
    - Show you understand their challenges
    - Build relationship without being salesy
    - End with a soft open for conversation`
  };

  return `Generate a ${toneDescriptions[tone]} sales email for the following prospect:

PROSPECT INFORMATION:
- Name: ${prospect.name}
- Title: ${prospect.title}
- Company: ${prospect.company}
- Industry: ${prospect.industry || 'Unknown'}
- Location: ${prospect.location}
- Company Size: ${prospect.companySize || 'Unknown'}

YOUR COMPANY CONTEXT:
- Company: ${icpData.company}
- Your Industry: ${icpData.industry}
- Target Industry: ${icpData.targetIndustry}
- Key Pain Points You Solve: ${icpData.painPoints}
- Value Proposition: ${icpData.valueProposition}

EMAIL TYPE: ${emailType}
${emailTypeInstructions[emailType]}

TONE: ${toneDescriptions[tone]}

CRITICAL REQUIREMENTS:
1. Use a compelling subject line (include it as "Subject: ...")
2. Address ${prospect.name} by first name only
3. Reference their specific role and company naturally
4. NO generic templates - make it feel personal and researched
5. Focus on THEIR problems/opportunities, not your product
6. Include ONE specific insight about their industry or role
7. End with a clear but soft call-to-action
8. Keep the entire email under 200 words
9. Use short paragraphs (2-3 sentences max)
10. NO buzzwords like "leverage," "synergy," "solutions," etc.
11. Write like a human reaching out to another human

Format the output as:
Subject: [subject line]

[Email body]

Generate the email now:`;
}