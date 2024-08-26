import { ItemStatus } from "../enum/item-status.enum";

export interface IItem {
  id: string;
  userId: string;
  nftId: string;
  price: number;
  status: ItemStatus;
  createdAt: Date;
  updatedAt: Date;
}