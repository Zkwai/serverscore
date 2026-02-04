import admin from 'firebase-admin';

// Utilise la variable d’environnement GOOGLE_APPLICATION_CREDENTIALS
// pour pointer vers votre fichier JSON de compte de service.
// Exemple (bash):
// export GOOGLE_APPLICATION_CREDENTIALS="/chemin/vers/serviceAccountKey.json"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export default admin;
