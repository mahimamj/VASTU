// Netlify Function: Save form data to Google Sheets via Apps Script
// Requires environment variable: GOOGLE_APPS_SCRIPT_URL

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'Method Not Allowed' 
    };
  }

  try {
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || '';
    
    if (!GOOGLE_SCRIPT_URL) {
      // If no Google Script URL, just log the data (you can view in Netlify logs)
      const data = JSON.parse(event.body || '{}');
      console.log('Form submission:', JSON.stringify(data, null, 2));
    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Data logged (configure GOOGLE_APPS_SCRIPT_URL to save to Sheets)' 
      })
    };
    }

    // Forward to Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: event.body
    });

    const result = await response.json();

    return {
      statusCode: response.ok ? 200 : 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};

