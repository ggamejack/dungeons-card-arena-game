import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AchievementCard } from "@/components/AchievementCard";
import { MissionCard } from "@/components/MissionCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { achievements } from "@/data/achievements";
import { adventureMissions, dailyMissions } from "@/data/missions";
import { Crown, Target, Calendar, Map, ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";

const Achievements = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("achievements");

  // Estatísticas mockadas
  const stats = {
    totalAchievements: achievements.length,
    completedAchievements: achievements.filter(a => a.completed).length,
    totalMissions: [...adventureMissions, ...dailyMissions].length,
    completedMissions: [...adventureMissions, ...dailyMissions].filter(m => m.completed).length,
    totalCoins: 2500,
    playerLevel: 12
  };

  const handleStartMission = (missionId: string) => {
    // Navegar para a arena com a missão específica
    navigate(`/arena?mission=${missionId}`);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Header />
      {/* Header */}
      <div className="max-w-6xl mx-auto space-y-6 pt-16">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Menu
          </Button>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500">
              💰 {stats.totalCoins} moedas
            </Badge>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500">
              ⭐ Nível {stats.playerLevel}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Crown className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-2xl font-bold">{stats.completedAchievements}/{stats.totalAchievements}</p>
              <p className="text-sm text-muted-foreground">Conquistas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">{stats.completedMissions}/{stats.totalMissions}</p>
              <p className="text-sm text-muted-foreground">Missões</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Map className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold">{adventureMissions.filter(m => m.completed).length}/{adventureMissions.length}</p>
              <p className="text-sm text-muted-foreground">Aventuras</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <p className="text-2xl font-bold">{dailyMissions.filter(m => m.completed).length}/{dailyMissions.length}</p>
              <p className="text-sm text-muted-foreground">Diárias</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Conquistas
            </TabsTrigger>
            <TabsTrigger value="adventures" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              Aventuras
            </TabsTrigger>
            <TabsTrigger value="daily" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Diárias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  Suas Conquistas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="adventures" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-5 h-5" />
                  Missões de Aventura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {adventureMissions.map((mission) => (
                    <MissionCard 
                      key={mission.id} 
                      mission={mission} 
                      onStartMission={handleStartMission}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="daily" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Missões Diárias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dailyMissions.map((mission) => (
                    <MissionCard 
                      key={mission.id} 
                      mission={mission} 
                      onStartMission={handleStartMission}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Achievements;