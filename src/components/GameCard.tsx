import { Card } from "@/types/Card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Sword, Shield, Star, Zap, Flame, Snowflake, Mountain, Sun, Moon } from "lucide-react";

interface GameCardProps {
  card: Card;
  isHovered?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const elementIcons = {
  fire: Flame,
  ice: Snowflake,
  earth: Mountain,
  lightning: Zap,
  holy: Sun,
  shadow: Moon
};

const elementColors = {
  fire: "text-fire",
  ice: "text-ice", 
  earth: "text-earth",
  lightning: "text-lightning",
  holy: "text-holy",
  shadow: "text-shadow"
};

const rarityColors = {
  common: "border-green-500",
  uncommon: "border-accent",
  rare: "border-blue-500",
  epic: "border-purple-500",
  legendary: "border-yellow-400"
};

const rarityGlowEffects = {
  common: "shadow-[0_0_0_2px_rgb(34,197,94,0.5)] after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-green-500 after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100",
  uncommon: "shadow-[0_0_0_2px_rgb(168,85,247,0.3)]",
  rare: "shadow-[0_0_0_2px_rgb(59,130,246,0.5)] after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-blue-500 after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100",
  epic: "shadow-[0_0_0_2px_rgb(147,51,234,0.6)] after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-purple-500 after:opacity-60 after:transition-opacity after:duration-300 hover:after:opacity-100",
  legendary: "shadow-[0_0_0_2px_rgb(250,204,21,0.7)] after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-yellow-400 after:opacity-70 after:transition-opacity after:duration-300 hover:after:opacity-100 after:animate-pulse"
};

export function GameCard({ card, isHovered, onClick, className, style }: GameCardProps) {
  const ElementIcon = card.element ? elementIcons[card.element] : Star;
  const elementColor = card.element ? elementColors[card.element] : "text-muted-foreground";

  const cardTypeIcon = {
    monster: Sword,
    magic: Zap,
    trap: Shield
  };

  const TypeIcon = cardTypeIcon[card.type] || Sword;

  return (
    <div
      className={cn(
        "relative w-48 h-72 rounded-xl border-2 bg-card text-card-foreground transition-all duration-500 cursor-pointer overflow-hidden group",
        "shadow-lg hover:shadow-2xl",
        rarityColors[card.rarity],
        rarityGlowEffects[card.rarity],
        isHovered && "scale-110 z-20 border-accent",
        !isHovered && "hover:scale-105",
        card.rarity === "legendary" && "animate-magical-float",
        card.rarity === "epic" && "hover:animate-energy-pulse",
        className
      )}
      style={style}
      onClick={onClick}
    >
      {/* Magic Particles Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-2 left-2 w-1 h-1 bg-accent rounded-full animate-magical-float"></div>
        <div className="absolute top-8 right-4 w-1 h-1 bg-primary rounded-full animate-magical-float" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-8 left-6 w-1 h-1 bg-secondary rounded-full animate-magical-float" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Card Header */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent p-3 z-10">
        <div className="flex items-center justify-between">
          <Badge 
            variant="secondary" 
            className={cn(
              "text-xs font-bold transition-all duration-300",
              card.rarity === "legendary" && "bg-gradient-holy text-black animate-glow",
              card.rarity === "epic" && "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
              card.rarity === "rare" && "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
            )}
          >
            {card.rarity.toUpperCase()}
          </Badge>
          <div className="flex items-center gap-2">
            <TypeIcon className="w-3 h-3 text-accent" />
            <ElementIcon className={cn("w-4 h-4 animate-pulse", elementColor)} />
            <Badge variant="outline" className="text-xs font-bold bg-accent/20 text-accent border-accent/30">
              Nv.{card.level}
            </Badge>
          </div>
        </div>
      </div>

      {/* Card Image */}
      <div className="relative w-full h-40 overflow-hidden">
        {card.image ? (
          <img 
            src={card.image} 
            alt={card.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className={cn(
            "w-full h-full flex items-center justify-center relative",
            card.element === "fire" && "bg-gradient-fire",
            card.element === "ice" && "bg-gradient-ice", 
            card.element === "earth" && "bg-gradient-to-br from-green-600 to-brown-600",
            card.element === "lightning" && "bg-gradient-to-br from-yellow-400 to-purple-600",
            card.element === "holy" && "bg-gradient-holy",
            card.element === "shadow" && "bg-gradient-shadow",
            !card.element && "bg-gradient-primary"
          )}>
            <ElementIcon className={cn("w-16 h-16 text-white animate-pulse drop-shadow-lg", elementColor)} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        )}
        
        {/* Element Overlay */}
        <div className="absolute top-2 left-2">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            "bg-black/50 backdrop-blur-sm border border-white/20"
          )}>
            <ElementIcon className={cn("w-4 h-4 text-white", elementColor)} />
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="relative p-3 space-y-2 bg-gradient-to-b from-transparent to-card/95">
        <h3 className="font-bold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {card.name}
        </h3>
        
        <p className="text-xs text-muted-foreground line-clamp-2 group-hover:text-foreground transition-colors">
          {card.description}
        </p>

        {/* Stats */}
        {card.type === "monster" && (
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-1 p-1 rounded bg-destructive/10 border border-destructive/20">
              <Sword className="w-4 h-4 text-destructive animate-pulse" />
              <span className="text-sm font-bold text-destructive">{card.attack}</span>
            </div>
            <div className="flex items-center gap-1 p-1 rounded bg-primary/10 border border-primary/20">
              <Shield className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-bold text-primary">{card.defense}</span>
            </div>
          </div>
        )}

        {card.type === "magic" && (
          <div className="flex justify-center pt-2">
            <div className="flex items-center gap-1 p-1 px-2 rounded bg-accent/10 border border-accent/20">
              <Zap className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-xs font-bold text-accent">MAGIA</span>
            </div>
          </div>
        )}

        {card.type === "trap" && (
          <div className="flex justify-center pt-2">
            <div className="flex items-center gap-1 p-1 px-2 rounded bg-secondary/10 border border-secondary/20">
              <Shield className="w-4 h-4 text-secondary animate-pulse" />
              <span className="text-xs font-bold text-secondary">ARMADILHA</span>
            </div>
          </div>
        )}

        {/* Cost */}
        <div className="absolute bottom-2 right-2">
          <Badge 
            variant="outline" 
            className="text-xs font-bold bg-accent/20 text-accent border-accent/30 shadow-lg animate-glow"
          >
            {card.cost} ⚡
          </Badge>
        </div>
      </div>


      {/* Interactive Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
}