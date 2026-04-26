export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Return debug info so we can see what's happening
  res.status(200).json({
    content: [{
      type: 'text',
      text: 'Debug: method=' + req.method + ' bodyType=' + typeof req.body + ' bodyKeys=' + Object.keys(req.body || {}).join(',') + ' hasKey=' + !!process.env.ANTHROPIC_API_KEY
    }]
  });
}
