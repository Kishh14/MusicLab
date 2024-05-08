export interface User {
  _id: number;
  username: string;
  email: string;
  profile_img: string;
}

export type RoomType = {
  _id: string;
  name: string;
  owner: string;
  members: User[];
  isLocked: boolean;
};
