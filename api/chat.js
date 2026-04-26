 export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: typeof body === 'string' ? body : JSON.stringify(body)
    });

    const text = await response.text();
    
    if (!text) {
      return res.status(500).json({ error: 'Empty response from Anthropic' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(response.status).send(text);
    
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
}
