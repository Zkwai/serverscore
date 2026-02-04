const express = require('express');
const admin = require('./firebaseAdmin.cjs');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// Vérifie un ID token Firebase envoyé dans Authorization: Bearer <token>
app.post('/auth/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ error: 'Missing Bearer token' });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    return res.json({ uid: decoded.uid, email: decoded.email || null });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

// Attribuer le rôle admin à un utilisateur (email) via un secret serveur
// Utiliser l’en-tête: X-Admin-Secret: <votre_secret>
// Définir la variable d’environnement ADMIN_SECRET
app.post('/admin/set-admin', async (req, res) => {
  try {
    const adminSecret = process.env.ADMIN_SECRET;
    const headerSecret = req.headers['x-admin-secret'];

    if (!adminSecret || headerSecret !== adminSecret) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { email, admin: isAdmin = true } = req.body || {};
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: !!isAdmin });

    return res.json({ uid: user.uid, email: user.email, admin: !!isAdmin });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to set admin' });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${port}`);
});
