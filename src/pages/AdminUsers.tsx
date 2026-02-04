import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/config/firebase";

const ADMIN_EMAIL = "lxcorppro@gmail.com";
const ROLE_OPTIONS = ["admin", "moderator", "certified", "user"] as const;

type Role = (typeof ROLE_OPTIONS)[number];

type UserProfile = {
  id: string;
  email: string;
  displayName?: string;
  role: Role;
};

const AdminUsers = () => {
  const { currentUser, isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);

  const normalizedAdminEmail = ADMIN_EMAIL.toLowerCase();

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    if (!isAdmin) {
      return;
    }

    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const nextUsers = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() as {
          email?: string;
          displayName?: string;
          role?: Role;
        };

        return {
          id: docSnap.id,
          email: data.email || "",
          displayName: data.displayName || "",
          role: data.role || "user",
        };
      });

      setUsers(nextUsers);
    });

    return () => unsubscribe();
  }, [currentUser, isAdmin]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    if (!isAdmin) {
      navigate("/");
    }
  }, [currentUser, isAdmin, navigate]);

  const adminUserId = useMemo(() => {
    return users.find((user) => user.email.toLowerCase() === normalizedAdminEmail)?.id || null;
  }, [users, normalizedAdminEmail]);

  const handleRoleChange = async (user: UserProfile, role: Role) => {
    if (user.email.toLowerCase() === normalizedAdminEmail) {
      toast({
        title: "Rôle verrouillé",
        description: "Le compte admin principal doit rester administrateur.",
        variant: "destructive",
      });
      return;
    }

    setSavingId(user.id);
    try {
      await updateDoc(doc(db, "users", user.id), { role });
      toast({
        title: "Rôle mis à jour",
        description: `Le rôle de ${user.email} est maintenant ${role}.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le rôle.",
        variant: "destructive",
      });
    } finally {
      setSavingId(null);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-32">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-light text-architectural mb-6">
                Connexion requise
              </h1>
              <p className="text-muted-foreground mb-8">
                Connectez-vous avec le compte admin pour gérer les rôles.
              </p>
              <Link to="/" className="text-minimal text-foreground hover:text-muted-foreground">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-32">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-light text-architectural mb-6">
                Accès refusé
              </h1>
              <p className="text-muted-foreground mb-8">
                Cette page est réservée à l'administrateur.
              </p>
              <Link to="/" className="text-minimal text-foreground hover:text-muted-foreground">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-light text-architectural mb-6">
              Gestion des rôles
            </h1>
            <p className="text-muted-foreground">
              Admin unique : {ADMIN_EMAIL}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-4">
            {users.length === 0 && (
              <p className="text-muted-foreground">Aucun utilisateur trouvé.</p>
            )}

            {users.map((user) => {
              const locked = user.email.toLowerCase() === normalizedAdminEmail;
              const isSaving = savingId === user.id;

              return (
                <div
                  key={user.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-border rounded-lg p-4"
                >
                  <div>
                    <p className="text-foreground font-medium">
                      {user.displayName || "Utilisateur"}
                    </p>
                    <p className="text-muted-foreground text-sm">{user.email}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                      value={locked ? "admin" : user.role}
                      onChange={(event) => handleRoleChange(user, event.target.value as Role)}
                      disabled={locked || isSaving}
                    >
                      {ROLE_OPTIONS.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    {locked && (
                      <span className="text-xs text-muted-foreground">Verrouillé</span>
                    )}
                    {isSaving && (
                      <span className="text-xs text-muted-foreground">Mise à jour...</span>
                    )}
                  </div>
                </div>
              );
            })}

            {adminUserId && (
              <div className="pt-6 text-right">
                <Button type="button" variant="outline" asChild>
                  <Link to={`/blog`}>Voir le blog</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminUsers;
