const admin = require('firebase-admin');

// Utilise GOOGLE_APPLICATION_CREDENTIALS pour pointer vers la clé JSON
// Exemple (bash):
// export GOOGLE_APPLICATION_CREDENTIALS="/chemin/vers/serviceAccountKey.json"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

module.exports = admin;
