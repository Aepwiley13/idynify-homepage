const { getFirestore } = require('firebase-admin/firestore');
const { initializeApp, cert } = require('firebase-admin/app');

// Initialize Firebase Admin (only once)
let adminInitialized = false;
if (!adminInitialized) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  });
  adminInitialized = true;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not 
allowed' }) };
  }

  try {
    const { apiKey, prompt, userId, requestId } = JSON.parse(event.body);

    if (!apiKey || !prompt || !userId || !requestId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters' })
      };
    }

    const db = getFirestore();
    
    // Mark as processing
    await db.collection('icpRequests').doc(requestId).set({
      status: 'processing',
      userId: userId,
      startedAt: new Date().toISOString()
    });

    // Call Claude API
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch('https://api.anthropic.com/v1/messages', 
{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      await db.collection('icpRequests').doc(requestId).update({
        status: 'error',
        error: data.error?.message || 'Claude API error',
        completedAt: new Date().toISOString()
      });
      return { statusCode: 200, body: JSON.stringify({ status: 'error' }) 
};
    }

    // Save result
    await db.collection('icpRequests').doc(requestId).update({
      status: 'completed',
      result: data,
      completedAt: new Date().toISOString()
    });

    return { statusCode: 200, body: JSON.stringify({ status: 'completed' 
}) };

  } catch (error) {
    console.error('Background function error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message 
}) };
  }
};

