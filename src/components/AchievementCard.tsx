import { Achievement } from "@/types/Achievement";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AchievementCardProps {
  achievement: Achievement;
}

const rarityColors = {
  bronze: "bg-gradient-to-r from-amber-600 to-amber-700",
  silver: "bg-gradient-to-r from-gray-400 to-gray-500", 
  gold: "bg-gradient-to-r from-yellow-400 to-yellow-500",
  legendary: "bg-gradient-to-r from-purple-500 to-pink-500"
};

const rarityBorders = {
  bronze: "border-amber-600/50",
  silver: "border-gray-400/50",
  gold: "border-yellow-400/50", 
  legendary: "border-purple-500/50"
};

export function AchievementCard({ achievement }: AchievementCardProps) {
  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
  
  return (
    <Card className={`${rarityBorders[achievement.rarity]} ${achievement.completed ? 'ring-2 ring-green-500' : ''} transition-all hover:scale-105`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{achievement.icon}</span>
            <CardTitle className="text-sm">{achievement.name}</CardTitle>
          </div>
          <Badge className={`${rarityColors[achievement.rarity]} text-white`}>
            {achievement.rarity.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground">{achievement.description}</p>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progresso</span>
            <span>{achievement.progress}/{achievement.maxProgress}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        {achievement.reward && (
          <div className="text-xs">
            <span className="text-muted-foreground">Recompensa: </span>
            <span className="text-primary font-medium">
              {achievement.reward.type === 'coins' ? `${achievement.reward.value} moedas` :
               achievement.reward.type === 'card' ? 'Carta especial' :
               `Título: ${achievement.reward.value}`}
            </span>
          </div>
        )}
        
        {achievement.completed && (
          <Badge variant="outline" className="w-full justify-center bg-green-500/10 text-green-500 border-green-500">
            ✓ COMPLETADO
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}