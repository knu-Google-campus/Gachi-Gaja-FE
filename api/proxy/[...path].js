export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-USER-ID');
    return res.status(200).end();
  }

  const { path = [] } = req.query;
  const targetPath = Array.isArray(path) ? path.join('/') : path;

  // Fix: Ensure URL logic is safe and log it
  // Even if env var is correct, stripping trailing slash is safer.
  const backendOrigin = process.env.BACKEND_ORIGIN.replace(/\/$/, '');
  const url = `${backendOrigin}/api/${targetPath}`;

  console.log(`[Proxy] Requesting: ${url}`);
  console.log(`[Proxy] Method: ${req.method}`);

  // Build headers object for upstream fetch
  const headers = {};
  for (const [key, value] of Object.entries(req.headers)) {
    const k = key.toLowerCase();
    // Drop hop-by-hop headers
    if (['host', 'connection', 'content-length'].includes(k)) continue;
    headers[key] = value;
  }

  // Fix 2: MATCH LOCAL VITE BEHAVIOR
  // The local vite.config.js explicitly removes the Origin header: `proxyReq.removeHeader('origin')`
  // This allows the request to be treated as server-to-server, bypassing strict CORS checks.
  // We do the same here by deleting it.
  delete headers['origin'];
  delete headers['referer'];
  // Fix: Do NOT overwrite Origin with backendOrigin.
  // The browser sends a correct Origin (e.g. https://...vercel.app) which is whitelisted.
  // Overwriting it with backendOrigin (system IP) causes CORS failure.

  const hasBody = !(req.method === 'GET' || req.method === 'HEAD');
  let body;
  if (hasBody) {
    body = await streamToBuffer(req);
  }

  try {
    const response = await fetch(url, {
      method: req.method,
      headers,
      body: hasBody ? body : undefined,
    });

    // Pass through response headers
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'content-length') return;
      res.setHeader(key, value);
    });

    // Add permissive CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-USER-ID');

    const arrayBuf = await response.arrayBuffer();
    res.status(response.status).send(Buffer.from(arrayBuf));
  } catch (err) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-USER-ID');
    res.status(502).json({ error: 'Proxy error', details: String(err) });
  }
}

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};