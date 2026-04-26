export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    
    // Show us exactly what came back
    res.status(200).json({
      content: [{
        type: 'text',
        text: 'Status:' + response.status + ' Length:' + text.length + ' Preview:' + text.slice(0, 300)
      }]
    });

  } catch (err) {
    res.status(200).json({
      content: [{ type: 'text', text: 'Fetch error: ' + err.message }]
    });
  }
}
