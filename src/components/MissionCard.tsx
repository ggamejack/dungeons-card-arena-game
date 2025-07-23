import { Mission } from "@/types/Achievement";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Swords, Lock } from "lucide-react";

interface MissionCardProps {
  mission: Mission;
  onStartMission?: (missionId: string) => void;
}

const difficultyColors = {
  easy: "bg-green-500",
  medium: "bg-yellow-500", 
  hard: "bg-red-500",
  legendary: "bg-purple-500"
};

const typeColors = {
  adventure: "bg-blue-500",
  pvp: "bg-red-500",
  collection: "bg-purple-500",
  daily: "bg-green-500"
};

export function MissionCard({ mission, onStartMission }: MissionCardProps) {
  const totalProgress = mission.requirements.reduce((sum, req) => req.current, 0);
  const totalRequired = mission.requirements.reduce((sum, req) => Number(req.target), 0);
  const progressPercentage = totalRequired > 0 ? (totalProgress / totalRequired) * 100 : 0;
  
  return (
    <Card className={`${mission.unlocked ? 'hover:scale-105' : 'opacity-60'} transition-all duration-200`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-sm flex items-center gap-2">
              {!mission.unlocked && <Lock className="w-4 h-4" />}
              {mission.name}
            </CardTitle>
            <div className="flex gap-2">
              <Badge className={`${typeColors[mission.type]} text-white`} variant="secondary">
                {mission.type.toUpperCase()}
              </Badge>
              <Badge className={`${difficultyColors[mission.difficulty]} text-white`} variant="secondary">
                {mission.difficulty.toUpperCase()}
              </Badge>
            </div>
          </div>
          
          {mission.opponent && (
            <Avatar className="w-12 h-12">
              <AvatarImage src={mission.opponent.avatar} />
              <AvatarFallback>{mission.opponent.name[0]}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground">{mission.description}</p>
        
        {mission.opponent && (
          <div className="p-2 bg-muted rounded-lg">
            <p className="text-xs font-medium">{mission.opponent.name}</p>
            <p className="text-xs text-muted-foreground">{mission.opponent.strategy}</p>
          </div>
        )}
        
        <div className="space-y-2">
          <h4 className="text-xs font-medium">Objetivos:</h4>
          {mission.requirements.map((req, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>{req.type === 'win' ? 'Vitórias' : req.type === 'damage' ? 'Dano causado' : req.type === 'summon' ? 'Criaturas invocadas' : 'Cartas coletadas'}</span>
                <span>{req.current}/{req.target}</span>
              </div>
              <Progress value={(req.current / Number(req.target)) * 100} className="h-1" />
            </div>
          ))}
        </div>
        
        <div className="space-y-1">
          <h4 className="text-xs font-medium">Recompensas:</h4>
          <div className="flex flex-wrap gap-1">
            {mission.rewards.map((reward, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {reward.type === 'coins' ? `${reward.value} moedas` :
                 reward.type === 'card' ? 'Carta especial' :
                 reward.type === 'pack' ? 'Pacote' : 'Conquista'}
              </Badge>
            ))}
          </div>
        </div>
        
        {mission.unlocked && !mission.completed && onStartMission && (
          <Button 
            size="sm" 
            className="w-full" 
            onClick={() => onStartMission(mission.id)}
            disabled={!mission.unlocked}
          >
            <Swords className="w-4 h-4 mr-2" />
            {mission.type === 'adventure' ? 'INICIAR AVENTURA' : 'INICIAR MISSÃO'}
          </Button>
        )}
        
        {mission.completed && (
          <Badge variant="outline" className="w-full justify-center bg-green-500/10 text-green-500 border-green-500">
            ✓ COMPLETADO
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}