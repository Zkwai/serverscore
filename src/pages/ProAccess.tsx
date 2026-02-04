import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const ProAccess = () => {
  const { currentUser, isAdmin } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Bienvenue dans votre espace pro</CardTitle>
          <CardDescription>
            Accédez à votre tableau de bord pour gérer votre activité.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border border-border/60 bg-muted/40 p-4 text-sm text-muted-foreground">
            {currentUser ? (
              <p>
                Connecté en tant que <span className="font-medium text-foreground">{currentUser.email}</span>.
              </p>
            ) : (
              <p>Connectez-vous pour accéder au tableau de bord.</p>
            )}
          </div>

          <Button asChild className="w-full">
            <Link to="/dashboard">Accéder au dashboard</Link>
          </Button>

          {isAdmin && (
            <Button asChild variant="secondary" className="w-full">
              <Link to="/admin/users">Gérer les rôles</Link>
            </Button>
          )}

          <Button asChild variant="outline" className="w-full">
            <Link to="/">Retour à l’accueil</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProAccess;
