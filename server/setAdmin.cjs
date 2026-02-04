const admin = require('./firebaseAdmin.cjs');

const email = process.argv[2] || process.env.ADMIN_EMAIL;

if (!email) {
  // eslint-disable-next-line no-console
  console.error('Usage: node server/setAdmin.cjs <email>\nOr set ADMIN_EMAIL');
  process.exit(1);
}

(async () => {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    // eslint-disable-next-line no-console
    console.log(`Admin claim set for ${user.email} (${user.uid})`);
    process.exit(0);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to set admin claim:', error.message || error);
    process.exit(1);
  }
})();
