import type { BaseModel } from "./base.model";

export interface PostModel extends BaseModel {
  title: string;
  description: string;
  department?: string;
  status: string;
}