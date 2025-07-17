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
  common: "border-muted",
  uncommon: "border-accent",
  rare: "border-primary",
  epic: "border-secondary",
  legendary: "border-accent bg-gradient-holy"
};

export function GameCard({ card, isHovered, onClick, className, style }: GameCardProps) {
  const ElementIcon = card.element ? elementIcons[card.element] : Star;
  const elementColor = card.element ? elementColors[card.element] : "text-muted-foreground";

  return (
    <div
      className={cn(
        "relative w-48 h-72 rounded-xl border-2 bg-card text-card-foreground shadow-lg transition-all duration-300 cursor-pointer overflow-hidden",
        rarityColors[card.rarity],
        isHovered && "scale-110 shadow-mystical animate-glow z-20",
        !isHovered && "hover:scale-105 hover:shadow-mystical",
        className
      )}
      style={style}
      onClick={onClick}
    >
      {/* Card Header */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-3 z-10">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs font-bold">
            {card.rarity.toUpperCase()}
          </Badge>
          <div className="flex items-center gap-1">
            <ElementIcon className={cn("w-4 h-4", elementColor)} />
            <span className="text-xs font-bold text-accent">{card.level}</span>
          </div>
        </div>
      </div>

      {/* Card Image */}
      <div className="relative w-full h-40 overflow-hidden">
        {card.image ? (
          <img 
            src={card.image} 
            alt={card.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
            <ElementIcon className={cn("w-16 h-16", elementColor)} />
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-3 space-y-2">
        <h3 className="font-bold text-sm leading-tight truncate">
          {card.name}
        </h3>
        
        <p className="text-xs text-muted-foreground line-clamp-2">
          {card.description}
        </p>

        {/* Stats */}
        {card.type === "monster" && (
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-1">
              <Sword className="w-4 h-4 text-destructive" />
              <span className="text-sm font-bold">{card.attack}</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold">{card.defense}</span>
            </div>
          </div>
        )}

        {/* Cost */}
        <div className="absolute bottom-2 right-2">
          <Badge variant="outline" className="text-xs font-bold">
            {card.cost} ⚡
          </Badge>
        </div>
      </div>

      {/* Legendary Glow Effect */}
      {card.rarity === "legendary" && (
        <div className="absolute inset-0 pointer-events-none animate-energy-pulse opacity-30">
          <div className="w-full h-full bg-gradient-holy rounded-xl"></div>
        </div>
      )}
    </div>
  );
}