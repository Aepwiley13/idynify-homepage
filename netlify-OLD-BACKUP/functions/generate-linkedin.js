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
    const { prospect, icpData, messageType, tone } = JSON.parse(event.body);

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });

    // Build the prompt based on message type and prospect data
    const prompt = buildLinkedInPrompt(prospect, icpData, messageType, tone);

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const generatedMessage = message.content[0].text;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: generatedMessage,
        prospectName: prospect.name,
        characterCount: generatedMessage.length
      })
    };

  } catch (error) {
    console.error('Error generating LinkedIn message:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to generate LinkedIn message',
        message: error.message 
      })
    };
  }
};

function buildLinkedInPrompt(prospect, icpData, messageType, tone) {
  const toneDescriptions = {
    professional: 'professional but warm',
    casual: 'friendly and conversational',
    enthusiastic: 'energetic and engaging'
  };

  const messageTypeInstructions = {
    connection_request: `This is a CONNECTION REQUEST note (300 characters max). The goal is to:
    - Give a compelling reason to connect
    - Reference something specific about them or their work
    - Be authentic and brief
    - NO sales pitch - just connection building
    - MUST BE UNDER 300 CHARACTERS TOTAL`,
    
    follow_up: `This is a FOLLOW-UP message after connecting. The goal is to:
    - Thank them for connecting
    - Reference something from their profile
    - Provide value or insight
    - Make conversation easy and natural
    - Keep it under 500 characters`,
    
    inmail: `This is a LINKEDIN INMAIL (longer form). The goal is to:
    - Hook them with a relevant insight in first line
    - Show you've researched their background
    - Make a clear, valuable proposition
    - Include a specific call-to-action
    - Keep it under 1000 characters`
  };

  return `Generate a ${toneDescriptions[tone]} LinkedIn message for the following prospect:

PROSPECT INFORMATION:
- Name: ${prospect.name}
- Title: ${prospect.title}
- Company: ${prospect.company}
- Industry: ${prospect.industry || 'Unknown'}
- Location: ${prospect.location}

YOUR COMPANY CONTEXT:
- Company: ${icpData.company}
- Your Industry: ${icpData.industry}
- Target Industry: ${icpData.targetIndustry}
- Value Proposition: ${icpData.valueProposition}

MESSAGE TYPE: ${messageType}
${messageTypeInstructions[messageType]}

TONE: ${toneDescriptions[tone]}

CRITICAL REQUIREMENTS:
1. Address ${prospect.name} by first name only
2. Reference their specific role or company naturally
3. NO generic "I came across your profile" openings
4. ${messageType === 'connection_request' ? 'ABSOLUTELY MUST BE UNDER 300 CHARACTERS' : 'Keep it concise'}
5. Make it feel personal, like you actually researched them
6. Focus on mutual benefit or value you can provide
7. Use short, punchy sentences
8. NO corporate jargon or buzzwords
9. Write conversationally - like a real person
10. ${messageType === 'connection_request' ? 'NO call-to-action beyond connecting' : 'End with a light, easy call-to-action'}

${messageType === 'connection_request' ? 'REMINDER: This MUST be under 300 characters. LinkedIn will reject anything longer.' : ''}

Generate the LinkedIn message now (JUST the message text, no labels or formatting):`;
}