export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('No code provided');
  }

  const clientId = "Ov23lil43WU1kZ9OSaEy";
  const clientSecret = "4ewe093ew8";

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'user-agent': 'Vercel-Auth-Handler'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code
      })
    });

    const tokenData = await tokenResponse.json();
    const token = tokenData.access_token;

    if (!token) {
      return res.status(400).send(`GitHub Error: ${JSON.stringify(tokenData)}`);
    }

    const html = `
      <!doctype html>
      <html>
        <head><title>Authentication Successful</title></head>
        <body>
          <script>
            const receiveMessage = (message) => {
              window.opener.postMessage(
                'authorization:${tokenData.token_type || 'bearer'}:${token}',
                '*'
              );
              window.close();
            }
            window.onload = receiveMessage;
          </script>
        </body>
      </html>
    `;

    res.setHeader('content-type', 'text/html;charset=UTF-8');
    return res.send(html);
  } catch (error) {
    return res.status(500).send(`Callback Error: ${error.message}`);
  }
}
