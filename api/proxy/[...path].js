export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-USER-ID');
    return res.status(200).end();
  }

  // Fix: Robust path + query preservation without relying on req.query
  // Example incoming: "/api/proxy/groups/123?sort=desc&limit=10"
  // We want upstream: "<BACKEND_ORIGIN>/api/groups/123?sort=desc&limit=10"
  let targetPath = '';
  let queryString = '';

  const proxyMarker = '/proxy/';
  const urlStr = typeof req.url === 'string' ? req.url : '';
  // Use WHATWG URL to robustly parse path + query
  const parsed = new URL(urlStr, 'http://local');
  const fullPathname = parsed.pathname || '';
  const idx = fullPathname.indexOf(proxyMarker);
  if (idx >= 0) {
    const afterPath = fullPathname.substring(idx + proxyMarker.length); // path part only
    targetPath = afterPath.startsWith('/') ? afterPath.substring(1) : afterPath;
    // Preserve original query but drop framework-added artifacts like "path"
    const qs = new URLSearchParams(parsed.search);
    qs.delete('path');
    queryString = qs.toString();
  }

  // Fix: Ensure URL logic is safe and log it
  // Even if env var is correct, stripping trailing slash is safer.
  const backendOrigin = process.env.BACKEND_ORIGIN.replace(/\/$/, '');
  const url = `${backendOrigin}/api/${targetPath}${queryString ? `?${queryString}` : ''}`;

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

  // Match local dev proxy behavior: drop Origin/Referer to avoid strict CORS checks
  delete headers['origin'];
  delete headers['referer'];

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