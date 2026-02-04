import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'register';
}

type AuthView = 'login' | 'register' | 'forgot-password';

const AuthModal = ({ isOpen, onClose, defaultView = 'login' }: AuthModalProps) => {
  const [view, setView] = useState<AuthView>(defaultView);

  const handleSuccess = () => {
    onClose();
    // Réinitialiser la vue pour la prochaine ouverture
    setTimeout(() => setView('login'), 300);
  };

  const getTitle = () => {
    switch (view) {
      case 'login':
        return 'Connexion';
      case 'register':
        return 'Créer un compte';
      case 'forgot-password':
        return 'Réinitialiser le mot de passe';
    }
  };

  const getDescription = () => {
    switch (view) {
      case 'login':
        return 'Connectez-vous à votre compte ServerScore';
      case 'register':
        return 'Créez votre compte pour commencer';
      case 'forgot-password':
        return 'Récupérez l\'accès à votre compte';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {view === 'login' && (
            <LoginForm
              onSuccess={handleSuccess}
              onSwitchToRegister={() => setView('register')}
              onSwitchToForgotPassword={() => setView('forgot-password')}
            />
          )}

          {view === 'register' && (
            <RegisterForm
              onSuccess={handleSuccess}
              onSwitchToLogin={() => setView('login')}
            />
          )}

          {view === 'forgot-password' && (
            <ForgotPasswordForm onBack={() => setView('login')} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;