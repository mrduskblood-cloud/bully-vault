export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch(e) {}
    }

    if (!body || !body.messages) {
      return res.status(200).json({ 
        content: [{ type: 'text', text: 'Error: No messages received. Body: ' + JSON.stringify(req.body).slice(0, 100) }] 
      });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });

    const text = await response.text();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(text || '{"content":[{"type":"text","text":"Empty response"}]}');

  } catch (err) {
    res.status(200).json({ 
      content: [{ type: 'text', text: 'Server error: ' + err.message }] 
    });
  }
}
