export interface InitResponse {
  profile: Profile;
  player: Player;
  version: string;
  setting: Setting;
}

export interface Music {
  title: string;
  artist: string;
  cover: string;
  url: string;
}

export interface Profile {
  avatar: string;
  username: string;
  color: string;
  nickname: string;
  steamId: number;
  playerId: number;
  userId: number;
  adminId: number;
  admin: number;
  vip: number;
  firstSignedDate: string;
  lastSignedDate: string;
}

export interface Player {
  musics: Music[];
  theme: string;
  loop: string;
  order: string;
  volume: number;
}

export interface Setting {
  autoPlay: boolean;
  shuffle: boolean;
  private: boolean;
  anonymous: boolean;
  gameInfo: boolean;
}
