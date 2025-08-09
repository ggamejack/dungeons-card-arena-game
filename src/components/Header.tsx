import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';
import { 
  Crown, 
  User as UserIcon, 
  LogOut, 
  Settings, 
  Coins, 
  Trophy,
  Swords
} from "lucide-react";
import { DarkModeToggle } from "./DarkModeToggle";

interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  level: number;
  experience: number;
  coins: number;
  wins: number;
  losses: number;
  avatar_url: string | null;
}

export function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch profile when user logs in
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-primary/30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-muted animate-pulse rounded"></div>
            <div className="w-24 h-6 bg-muted animate-pulse rounded"></div>
          </div>
          <div className="w-8 h-8 bg-muted animate-pulse rounded-full"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-primary/30 shadow-mystical">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black bg-gradient-primary bg-clip-text text-transparent">
              JOKEMPO<sup className="text-xs">®</sup>
            </span>
          </div>
        </div>

        {/* Navigation & User */}
        <div className="flex items-center space-x-4">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/arena")}
              className="text-primary hover:bg-primary/10"
            >
              <Swords className="w-4 h-4 mr-2" />
              Arena
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/marketplace")}
              className="text-primary hover:bg-primary/10"
            >
              <Crown className="w-4 h-4 mr-2" />
              Marketplace
            </Button>
          </div>

          <DarkModeToggle />

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-primary/30">
                    <AvatarImage src={profile?.avatar_url || ""} alt={profile?.display_name || ""} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {getInitials(profile?.display_name || user.email)}
                    </AvatarFallback>
                  </Avatar>
                  {profile && (
                    <Badge 
                      variant="outline" 
                      className="absolute -top-1 -right-1 text-xs bg-accent text-accent-foreground border-accent"
                    >
                      {profile.level}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-sm">
                      {profile?.display_name || user.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                
                {profile && (
                  <>
                    <DropdownMenuSeparator />
                    <div className="px-2 py-1">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Coins className="w-3 h-3 mr-1" />
                          {profile.coins} moedas
                        </span>
                        <span className="flex items-center">
                          <Trophy className="w-3 h-3 mr-1" />
                          {profile.wins}V/{profile.losses}D
                        </span>
                      </div>
                    </div>
                  </>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/achievements")}>
                  <Trophy className="mr-2 h-4 w-4" />
                  <span>Conquistas</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/auth")}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <UserIcon className="w-4 h-4 mr-2" />
              Entrar
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}