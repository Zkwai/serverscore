import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { Loader2, User, Mail, Calendar, Shield, PencilLine, ClipboardList } from 'lucide-react';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  doc,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

const Dashboard = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviews, setReviews] = useState<Array<{ id: string; title: string; content: string; createdAt?: string }>>([]);
  const [orders, setOrders] = useState<Array<{ id: string; label: string; status: 'En attente' | 'En cours' | 'Terminée' }>>([]);
  const [orderLabel, setOrderLabel] = useState('');
  const [orderStatus, setOrderStatus] = useState<'En attente' | 'En cours' | 'Terminée'>('En attente');

  // Rediriger si pas connecté
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName.trim()) {
      toast({
        title: 'Erreur',
        description: 'Le nom ne peut pas être vide',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      await updateUserProfile(displayName);
      toast({
        title: 'Profil mis à jour',
        description: 'Vos informations ont été sauvegardées',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le profil',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
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

  const daysMember = useMemo(() => {
    return Math.floor(
      (Date.now() - new Date(currentUser.metadata.creationTime).getTime()) / (1000 * 60 * 60 * 24)
    );
  }, [currentUser.metadata.creationTime]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewTitle.trim() || !reviewContent.trim()) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir le titre et le contenu',
        variant: 'destructive',
      });
      return;
    }

    addDoc(collection(db, 'blogReviews'), {
      userId: currentUser.uid,
      title: reviewTitle.trim(),
      content: reviewContent.trim(),
      createdAt: serverTimestamp(),
    })
      .then(() => {
        setReviewTitle('');
        setReviewContent('');
        toast({
          title: 'Avis ajouté',
          description: 'Votre avis a été enregistré',
        });
      })
      .catch(() => {
        toast({
          title: 'Erreur',
          description: 'Impossible d\'enregistrer l\'avis',
          variant: 'destructive',
        });
      });
  };

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderLabel.trim()) {
      toast({
        title: 'Erreur',
        description: 'Le libellé de la commande est requis',
        variant: 'destructive',
      });
      return;
    }

    addDoc(collection(db, 'orders'), {
      userId: currentUser.uid,
      label: orderLabel.trim(),
      status: orderStatus,
      createdAt: serverTimestamp(),
    })
      .then(() => {
        setOrderLabel('');
        setOrderStatus('En attente');
        toast({
          title: 'Commande ajoutée',
          description: 'Votre commande a été enregistrée',
        });
      })
      .catch(() => {
        toast({
          title: 'Erreur',
          description: 'Impossible d\'enregistrer la commande',
          variant: 'destructive',
        });
      });
  };

  const handleUpdateOrderStatus = (id: string, status: 'En attente' | 'En cours' | 'Terminée') => {
    updateDoc(doc(db, 'orders', id), { status })
      .then(() => {
        toast({
          title: 'Commande mise à jour',
          description: 'Le statut a été modifié',
        });
      })
      .catch(() => {
        toast({
          title: 'Erreur',
          description: 'Impossible de modifier le statut',
          variant: 'destructive',
        });
      });
  };

  useEffect(() => {
    if (!currentUser) return;

    const reviewsQuery = query(
      collection(db, 'blogReviews'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const ordersQuery = query(
      collection(db, 'orders'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribeReviews = onSnapshot(reviewsQuery, (snapshot) => {
      setReviews(
        snapshot.docs.map((docSnap) => {
          const data = docSnap.data() as { title: string; content: string; createdAt?: { toDate: () => Date } };
          return {
            id: docSnap.id,
            title: data.title,
            content: data.content,
            createdAt: data.createdAt ? data.createdAt.toDate().toLocaleDateString('fr-FR') : undefined,
          };
        })
      );
    });

    const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
      setOrders(
        snapshot.docs.map((docSnap) => {
          const data = docSnap.data() as { label: string; status: 'En attente' | 'En cours' | 'Terminée' };
          return {
            id: docSnap.id,
            label: data.label,
            status: data.status,
          };
        })
      );
    });

    return () => {
      unsubscribeReviews();
      unsubscribeOrders();
    };
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Mon Profil</h1>
            <p className="text-muted-foreground">
              Gérez vos informations personnelles et vos préférences
            </p>
          </div>

          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle>Informations du compte</CardTitle>
              <CardDescription>
                Mettez à jour vos informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={currentUser.photoURL || ''} />
                  <AvatarFallback className="text-lg">
                    {getInitials(currentUser.displayName || currentUser.email || 'U')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{currentUser.displayName || 'Utilisateur'}</h3>
                  <p className="text-muted-foreground">{currentUser.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Membre depuis {new Date(currentUser.metadata.creationTime).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>

              <Separator />

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Nom d'affichage</Label>
                  <Input
                    id="displayName"
                    type="text"
                    placeholder="Votre nom"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={currentUser.email || ''}
                    disabled
                  />
                  <p className="text-sm text-muted-foreground">
                    L'email ne peut pas être modifié
                  </p>
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mise à jour...
                    </>
                  ) : (
                    'Mettre à jour le profil'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
              <CardDescription>
                Aperçu de votre activité sur ServerScore
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <User className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-sm text-muted-foreground">Projets</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Messages</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{daysMember}</p>
                    <p className="text-sm text-muted-foreground">Jours membre</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Avis Blog (démo locale) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PencilLine className="h-5 w-5 text-primary" />
                Avis dans le blog
              </CardTitle>
              <CardDescription>
                Rédigez et gérez vos avis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reviewTitle">Titre</Label>
                  <Input
                    id="reviewTitle"
                    type="text"
                    placeholder="Ex: Excellent service"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reviewContent">Contenu</Label>
                  <textarea
                    id="reviewContent"
                    className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Décrivez votre expérience..."
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                  />
                </div>
                <Button type="submit">Publier l’avis</Button>
              </form>

              <div className="space-y-3">
                {reviews.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucun avis pour le moment.</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="rounded-md border border-border/60 p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{review.title}</h4>
                        <span className="text-xs text-muted-foreground">{review.createdAt || '—'}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{review.content}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Commandes (démo locale) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                Commandes
              </CardTitle>
              <CardDescription>
                Suivez vos commandes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleAddOrder} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orderLabel">Libellé</Label>
                  <Input
                    id="orderLabel"
                    type="text"
                    placeholder="Ex: Pack avis premium"
                    value={orderLabel}
                    onChange={(e) => setOrderLabel(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderStatus">Statut</Label>
                  <select
                    id="orderStatus"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value as 'En attente' | 'En cours' | 'Terminée')}
                  >
                    <option value="En attente">En attente</option>
                    <option value="En cours">En cours</option>
                    <option value="Terminée">Terminée</option>
                  </select>
                </div>
                <Button type="submit">Ajouter une commande</Button>
              </form>

              {orders.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucune commande en cours.</p>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="flex flex-col gap-3 rounded-md border border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold">{order.label}</p>
                      <p className="text-xs text-muted-foreground">{order.id}</p>
                    </div>
                    <select
                      className="h-9 rounded-md border border-input bg-background px-2 text-xs font-medium text-primary"
                      value={order.status}
                      onChange={(e) =>
                        handleUpdateOrderStatus(order.id, e.target.value as 'En attente' | 'En cours' | 'Terminée')
                      }
                    >
                      <option value="En attente">En attente</option>
                      <option value="En cours">En cours</option>
                      <option value="Terminée">Terminée</option>
                    </select>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>
                Gérez la sécurité de votre compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Authentification à deux facteurs</p>
                    <p className="text-sm text-muted-foreground">Non activée</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Vérification email</p>
                    <p className="text-sm text-muted-foreground">
                      {currentUser.emailVerified ? 'Vérifié' : 'Non vérifié'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;