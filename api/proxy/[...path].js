export default async function handler(req, res) {
  const { path = [] } = req.query;
  const targetPath = Array.isArray(path) ? path.join('/') : path;

  const backendOrigin = process.env.BACKEND_ORIGIN;
  const url = `${backendOrigin}/api/${targetPath}`;

  const headers = new Headers();
  // Forward allowed headers except host-related ones
  for (const [key, value] of Object.entries(req.headers)) {
    if (['host', 'connection', 'content-length'].includes(key.toLowerCase())) continue;
    headers.set(key, value);
  }

  const init = {
    method: req.method,
    headers,
    body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req.body,
  };

  try {
    const response = await fetch(url, init);
    const buffer = await response.arrayBuffer();

    // Pass through status and headers
    for (const [key, value] of response.headers) {
      // Avoid setting forbidden headers
      if (['content-length'].includes(key.toLowerCase())) continue;
      res.setHeader(key, value);
    }

    // Set CORS for same-origin access (since this function is under the app domain)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-USER-ID');

    res.status(response.status).send(Buffer.from(buffer));
  } catch (err) {
    res.status(502).json({ error: 'Proxy error', details: String(err) });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};