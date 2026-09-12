export default function handler(req, res) {
  const clientId = "Ov23lioUhah1ZHbeMXIY";
  const redirectUri = "https://bulk-auth-handler-7mw584uxe-tas25.vercel.app/api/callback";

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;

  res.writeHead(302, { Location: githubAuthUrl });
  res.end();
}
