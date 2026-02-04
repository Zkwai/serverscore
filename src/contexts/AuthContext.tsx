import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth } from '@/config/firebase';
import { db } from '@/config/firebase';

export type UserRole = 'admin' | 'moderator' | 'certified' | 'user';

const ADMIN_EMAIL = 'lxcorppro@gmail.com';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  role: UserRole | null;
  isAdmin: boolean;
  isModerator: boolean;
  isCertified: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<UserRole | null>(null);

  // Inscription
  const signup = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
      const normalizedEmail = email.toLowerCase();
      const initialRole: UserRole = normalizedEmail === ADMIN_EMAIL ? 'admin' : 'user';
      await setDoc(
        doc(db, 'users', userCredential.user.uid),
        {
          email: normalizedEmail,
          displayName,
          role: initialRole,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );
    }
  };

  // Connexion
  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Déconnexion
  const logout = async () => {
    await signOut(auth);
  };

  // Réinitialisation du mot de passe
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  // Mise à jour du profil
  const updateUserProfile = async (displayName: string) => {
    if (currentUser) {
      await updateProfile(currentUser, { displayName });
    }
  };

  // Écouter les changements d'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      const resolveRole = async () => {
        try {
          const normalizedEmail = (user.email || '').toLowerCase();
          if (normalizedEmail === ADMIN_EMAIL) {
            setRole('admin');
            await setDoc(
              doc(db, 'users', user.uid),
              {
                email: normalizedEmail,
                displayName: user.displayName || '',
                role: 'admin',
                updatedAt: serverTimestamp(),
              },
              { merge: true }
            );
            return;
          }

          const snapshot = await getDoc(doc(db, 'users', user.uid));
          if (snapshot.exists()) {
            const data = snapshot.data() as { role?: UserRole };
            setRole(data.role || 'user');
          } else {
            await setDoc(
              doc(db, 'users', user.uid),
              {
                email: normalizedEmail,
                displayName: user.displayName || '',
                role: 'user',
                createdAt: serverTimestamp(),
              },
              { merge: true }
            );
            setRole('user');
          }
        } catch {
          setRole('user');
        }
      };

      resolveRole().finally(() => setLoading(false));
    });

    // Timeout de sécurité au cas où Firebase ne répond pas
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    role,
    isAdmin: role === 'admin',
    isModerator: role === 'moderator',
    isCertified: role === 'certified',
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement de ServerScore...</p>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};