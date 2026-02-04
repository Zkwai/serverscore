import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

type AuthView = 'login' | 'register' | 'forgot-password';

const Professionel = () => {
  const [view, setView] = useState<AuthView>('login');
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/professionel/acces');
  };

  const getTitle = () => {
    switch (view) {
      case 'login':
        return 'Connexion professionnelle';
      case 'register':
        return 'Créer un compte professionnel';
      case 'forgot-password':
        return 'Réinitialiser le mot de passe';
    }
  };

  const getDescription = () => {
    switch (view) {
      case 'login':
        return 'Connectez-vous pour accéder à votre espace pro.';
      case 'register':
        return 'Créez votre compte pour commencer.';
      case 'forgot-password':
        return 'Recevez un lien de réinitialisation.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{getTitle()}</CardTitle>
          <CardDescription>{getDescription()}</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Professionel;
