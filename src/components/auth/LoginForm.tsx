import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
}

const LoginForm = ({ onSuccess, onSwitchToRegister, onSwitchToForgotPassword }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      toast({
        title: 'Connexion réussie',
        description: 'Bienvenue !',
      });
      onSuccess();
    } catch (error: unknown) {
      let errorMessage = 'Une erreur est survenue';
      
      if (error instanceof Error && 'code' in error) {
        const firebaseError = error as { code: string };
        if (firebaseError.code === 'auth/invalid-credential') {
          errorMessage = 'Email ou mot de passe incorrect';
        } else if (firebaseError.code === 'auth/user-not-found') {
          errorMessage = 'Aucun compte trouvé avec cet email';
        } else if (firebaseError.code === 'auth/wrong-password') {
          errorMessage = 'Mot de passe incorrect';
        } else if (firebaseError.code === 'auth/too-many-requests') {
          errorMessage = 'Trop de tentatives. Réessayez plus tard';
        }
      }

      toast({
        title: 'Erreur de connexion',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSwitchToForgotPassword}
          className="text-sm text-primary hover:underline"
          disabled={loading}
        >
          Mot de passe oublié ?
        </button>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connexion en cours...
          </>
        ) : (
          'Se connecter'
        )}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Pas encore de compte ?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-primary hover:underline"
          disabled={loading}
        >
          S'inscrire
        </button>
      </div>
    </form>
  );
};

export default LoginForm;