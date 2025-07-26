export interface BansResponse {
  bans: Ban[];
  communications: Communication[];
  entWatches: EntWatch[];
}

export interface Ban {
  id: number;
  server: string;
  serverId: number;
  mode: string;
  modeId: number;
  adminName: string;
  adminId: number;
  adminColor: string;
  adminAvatar: string;
  type: number;
  typeString: string;
  created: string;
  length: number;
  reason: string;
  avatar: string;
  nickname: string;
  steamId: number;
  steamIdString: string;
  playerId: number;
  color: string;
}

export interface Communication {
  comm: number;
  id: number;
  server: string;
  serverId: number;
  mode: string;
  modeId: number;
  adminName: string;
  adminId: number;
  adminColor: string;
  adminAvatar: string;
  type: number;
  typeString: string;
  created: string;
  length: number;
  reason: string;
  avatar: string;
  nickname: string;
  steamId: number;
  steamIdString: string;
  playerId: number;
  color: string;
}

export interface EntWatch {
  map: string;
  remaining: number;
  id: number;
  server: string;
  serverId: number;
  mode: string;
  modeId: number;
  adminName: string;
  adminId: number;
  adminColor: string;
  adminAvatar: string;
  type: number;
  typeString: string;
  created: string;
  length: number;
  reason: string;
  avatar: string;
  nickname: string;
  steamId: number;
  steamIdString: string;
  playerId: number;
  color: string;
}
