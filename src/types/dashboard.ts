export interface DashboardResponse {
  servers: Server[];
}

export interface Server {
  game: string;
  network: string;
  name: string;
  map: string;
  translation: string;
  currentPlayers: number;
  maxPlayers: number;
  host: string;
  port: number;
  mapId: string;
  currentStage?: number;
  totalStage?: number;
  extremeStage?: boolean;
  ctScore?: number;
  teScore?: number;
  serverId: number;
  modeId: number;
}
