exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const fetch = (await import('node-fetch')).default;
    
    const { apiKey, prompt } = JSON.parse(event.body);

    if (!apiKey || !prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing apiKey or prompt' })
      };
    }

    console.log('Starting Claude API call...');
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 180000);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 8000,
          messages: [{
            role: 'user',
            content: prompt
          }]
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      const data = await response.json();

      if (!response.ok) {
        console.error('Claude API Error:', data);
        return {
          statusCode: response.status,
          body: JSON.stringify({ error: data.error?.message || 'Claude API error' })
        };
      }

      console.log('Claude API call successful');
      
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };

    } catch (fetchError) {
      clearTimeout(timeout);
      throw fetchError;
    }

  } catch (error) {
    console.error('Function error:', error);
    
    if (error.name === 'AbortError') {
      return {
        statusCode: 504,
        body: JSON.stringify({ error: 'Request timeout - Claude API took too long' })
      };
    }
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};