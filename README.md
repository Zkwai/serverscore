# 🚀 ServerScore - Plateforme d'Avis Vérifiés

**Une plateforme moderne pour les avis clients vérifiés avec authentification Firebase**

## 📋 Vue d'ensemble du projet

ServerScore est une application web complète construite avec React, TypeScript, et Firebase, offrant une expérience utilisateur moderne pour la gestion d'avis clients.

### 🌟 Fonctionnalités principales

- ✅ **Authentification Firebase** complète (Inscription/Connexion)
- ✅ **Dashboard utilisateur** protégé
- ✅ **Interface responsive** (mobile & desktop)
- ✅ **Thème sombre/clair** intégré
- ✅ **Analytics Firebase** configuré
- ✅ **Déploiement Firebase** prêt

## 🛠️ Technologies utilisées

- **Frontend**: React 18 + TypeScript + Vite
- **UI/UX**: Tailwind CSS + shadcn/ui
- **Authentification**: Firebase Auth
- **Base de données**: Firestore
- **Analytics**: Firebase Analytics
- **Hébergement**: Firebase Hosting
- **État**: React Context API

## 📁 Structure du projet

```
serverscore/
├── src/
│   ├── components/
│   │   ├── auth/                 # Composants d'authentification
│   │   │   ├── AuthModal.tsx     # Modal principal d'auth
│   │   │   ├── LoginForm.tsx     # Formulaire de connexion
│   │   │   ├── RegisterForm.tsx  # Formulaire d'inscription
│   │   │   └── ForgotPasswordForm.tsx # Réinitialisation MDP
│   │   ├── ui/                   # Composants shadcn/ui
│   │   ├── Navigation.tsx        # Navigation avec menu utilisateur
│   │   ├── Hero.tsx             # Section hero
│   │   ├── Services.tsx         # Section services
│   │   ├── About.tsx            # Section à propos
│   │   ├── Portfolio.tsx        # Section portfolio
│   │   └── Contact.tsx          # Section contact
│   ├── contexts/
│   │   └── AuthContext.tsx      # Context d'authentification
│   ├── config/
│   │   └── firebase.ts          # Configuration Firebase
│   ├── pages/
│   │   ├── Index.tsx            # Page d'accueil
│   │   ├── Dashboard.tsx        # Profil utilisateur
│   │   ├── Work.tsx             # Page travaux
│   │   ├── Services.tsx         # Page services
│   │   ├── About.tsx            # Page à propos
│   │   ├── Contact.tsx          # Page contact
│   │   ├── Blog.tsx             # Page blog
│   │   ├── BlogPost.tsx         # Article de blog
│   │   ├── Pitch.tsx            # Page pitch
│   │   └── NotFound.tsx         # Page 404
│   ├── hooks/
│   │   ├── use-toast.ts         # Hook pour les toasts
│   │   └── use-mobile.tsx       # Hook responsive
│   ├── lib/
│   │   └── utils.ts             # Utilitaires
│   ├── App.tsx                  # Application principale
│   └── main.tsx                 # Point d'entrée
├── public/                      # Assets statiques
├── .env                         # Variables d'environnement
├── firebase.json                # Configuration Firebase
├── .firebaserc                 # Configuration projet Firebase
└── package.json                # Dépendances
```

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- npm ou yarn
- Compte Firebase

### Installation

```bash
# Cloner le repository
git clone <YOUR_GIT_URL>
cd serverscore

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés Firebase

# Démarrer le serveur de développement
npm run dev
```

### Configuration Firebase

1. Créer un projet sur [Firebase Console](https://console.firebase.com)
2. Activer Authentication (Email/Password)
3. Créer une app web et récupérer les clés
4. Mettre à jour le fichier `.env`

## 🎯 Utilisation

### Authentification
- **Inscription**: Formulaire complet avec validation
- **Connexion**: Authentification sécurisée
- **Réinitialisation**: Mot de passe oublié
- **Déconnexion**: Sécurisée

### Dashboard utilisateur
- Profil personnalisé
- Statistiques d'activité
- Paramètres de sécurité
- Gestion du compte

### Interface
- **Navigation responsive** avec menu mobile
- **Thème dynamique** (sombre/clair)
- **Toasts** pour les notifications
- **Animations fluides**

## 🔧 Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualisation build
npm run lint         # Vérification du code
```

## 🚀 Déploiement

### Firebase Hosting

```bash
# Build de production
npm run build

# Déploiement
firebase deploy
```

### Lovable (Recommandé)

1. Aller sur [votre projet Lovable](https://lovable.dev/projects/09a14ae7-bd4a-415b-b22e-66bbeb1a9240)
2. Cliquer sur **Share → Publish**
3. Votre app est déployée automatiquement

## 📊 Fonctionnalités détaillées

### 🔐 Authentification
- **Sécurisée**: Firebase Auth avec gestion d'erreurs
- **UX optimisée**: Loading states et feedback utilisateur
- **Protection**: Routes protégées pour le dashboard
- **Persistance**: Session maintenue entre les visites

### 👤 Dashboard
- **Profil utilisateur** avec avatar
- **Statistiques** d'activité
- **Paramètres** personnalisables
- **Sécurité** avancée

### 🎨 Interface
- **Design moderne** avec Tailwind CSS
- **Composants réutilisables** shadcn/ui
- **Responsive** sur tous les appareils
- **Accessibilité** intégrée

### 📈 Analytics
- **Firebase Analytics** configuré
- **Suivi utilisateur** automatique
- **Événements personnalisés**
- **Rapports détaillés**

## 🔒 Sécurité

- **Authentification robuste** avec Firebase
- **Validation côté client** et serveur
- **Protection CSRF** intégrée
- **Gestion sécurisée** des mots de passe
- **Routes protégées** pour les données sensibles

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement

---

**Développé avec ❤️ par l'équipe ServerScore**

*Plateforme moderne pour des avis clients transparents et vérifiés*
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/09a14ae7-bd4a-415b-b22e-66bbeb1a9240) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
