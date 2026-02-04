import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Star, Menu, X, User, Settings, LogOut } from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';

const Navigation = () => {
  console.log("Navigation component is rendering");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-6 h-6 fill-primary text-primary" />
              <span className="text-xl font-bold text-foreground">ServerScore</span>
            </div>
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              Nos Service
            </a>
            <a href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              À propos
            </a>
            <a href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              Blog
            </a>
            <a href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              Contact
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.photoURL || ''} alt={currentUser.displayName || ''} />
                      <AvatarFallback>
                        {getInitials(currentUser.displayName || currentUser.email || 'U')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {currentUser.displayName || 'Utilisateur'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {currentUser.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Mon profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Se connecter
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Écrire un avis
                </Button>
              </>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-b border-border">
            <div className="container mx-auto px-6 py-6 space-y-4">
              <a href="/services" className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                Nos Service
              </a>
              <a href="/about" className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                À propos
              </a>
              <a href="/blog" className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                Blog
              </a>
              <a href="/contact" className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                Contact
              </a>
              
              <div className="pt-4 border-t border-border space-y-3">
                <ThemeToggle />
                
                {currentUser ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-3 py-2 bg-muted rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser.photoURL || ''} />
                        <AvatarFallback className="text-xs">
                          {getInitials(currentUser.displayName || currentUser.email || 'U')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {currentUser.displayName || 'Utilisateur'}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          navigate('/dashboard');
                          setIsMenuOpen(false);
                        }}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Mon profil
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Se déconnecter
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      Se connecter
                    </Button>
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                      Écrire un avis
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Navigation;
