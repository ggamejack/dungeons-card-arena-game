import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameCard } from "@/components/GameCard";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { allCards } from "@/data/cards";
import { useNavigate } from "react-router-dom";
import { Swords, Sparkles, Crown, Zap, Trophy } from "lucide-react";
import heroImage from "@/assets/game-layout-background.jpg";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  const navigate = useNavigate();
  
  // Show featured legendary cards
  const featuredCards = allCards.filter(card => card.rarity === "legendary").slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <DarkModeToggle />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 space-y-8 p-8">
          <div className="space-y-4">
            <Badge variant="outline" className="text-holy bg-holy/10 border-holy animate-glow">
              <Crown className="w-4 h-4 mr-2" />
              JOGO DE CARTAS ÉPICO
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-primary bg-clip-text text-transparent animate-magical-float">
              DUNGEONS<sup className="text-2xl md:text-3xl">®</sup>
            </h1>
            
            <p className="text-xl md:text-2xl text-holy/90 max-w-2xl mx-auto leading-relaxed">
              Entre em batalhas épicas com criaturas lendárias, magias poderosas e estratégias ancestrais. 
              Apenas os mais corajosos sobreviverão às masmorras!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => navigate("/arena")}
              className="animate-glow"
            >
              <Swords className="w-6 h-6 mr-2" />
              INICIAR BATALHA
            </Button>
            
            <Button 
              variant="magical" 
              size="xl"
              onClick={() => {
                document.getElementById('cards-section')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              <Sparkles className="w-6 h-6 mr-2" />
              VER CARTAS
            </Button>
          </div>
        </div>
      </section>

      {/* Game Features */}
      <section className="py-20 px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12 bg-gradient-primary bg-clip-text text-transparent">
            RECURSOS ÉPICOS
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 bg-card rounded-xl shadow-mystical">
              <div className="w-16 h-16 mx-auto bg-gradient-fire rounded-full flex items-center justify-center">
                <Swords className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">99 CARTAS ÚNICAS</h3>
              <p className="text-muted-foreground">
                Monstros lendários, magias poderosas e armadilhas mortais te aguardam!
              </p>
            </div>

            <div className="text-center space-y-4 p-6 bg-card rounded-xl shadow-mystical">
              <div className="w-16 h-16 mx-auto bg-gradient-ice rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">BATALHAS ESTRATÉGICAS</h3>
              <p className="text-muted-foreground">
                Use táticas inteligentes para derrotar seus oponentes nas arenas!
              </p>
            </div>

            <div className="text-center space-y-4 p-6 bg-card rounded-xl shadow-mystical">
              <div className="w-16 h-16 mx-auto bg-gradient-holy rounded-full flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">CARTAS LENDÁRIAS</h3>
              <p className="text-muted-foreground">
                Apenas 4 cartas lendárias existem - encontre-as e domine os reinos!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cards */}
      <section id="cards-section" className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12 bg-gradient-primary bg-clip-text text-transparent">
            CARTAS LENDÁRIAS
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {featuredCards.map((card, index) => (
              <GameCard 
                key={card.id} 
                card={card}
                className="animate-magical-float"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              />
            ))}
          </div>
          
          <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate("/arena")}
            >
              <Swords className="w-5 h-5 mr-2" />
              ENTRE NA ARENA AGORA!
            </Button>
            <Button 
              variant="magical" 
              size="lg"
              onClick={() => navigate("/marketplace")}
            >
              <Crown className="w-5 h-5 mr-2" />
              MARKETPLACE
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/achievements")}
              className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
            >
              <Trophy className="w-5 h-5 mr-2" />
              CONQUISTAS
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-8 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-black mb-4 bg-gradient-primary bg-clip-text text-transparent">
            DUNGEONS<sup>®</sup>
          </h3>
          <p className="text-muted-foreground">
            © 2024 Dungeons® - Todos os direitos reservados. Entre nas masmorras por sua própria conta e risco.
          </p>
        </div>
      </footer>

      <Navigation />
    </div>
  );
};

export default Index;
