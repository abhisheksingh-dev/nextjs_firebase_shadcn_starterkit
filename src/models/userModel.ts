import { Timestamp } from "firebase/firestore/lite";

export interface UserModel {
  uuid: string;
  displayName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
}

export class UserModelUtils {
  static generateEmpty() {
    return {
      uuid: "",
      displayName: "",
      createdAt: Timestamp.now(),
      updatedAt: null,
    } as UserModel;
  }

  static fromJson(data: Record<string, any>) {
    return {
      uuid: data.uuid || "",
      displayName: data.displayName || "",
      createdAt: data.createdAt || Timestamp.now(),
      updatedAt: data.updatedAt || null,
    } as UserModel;
  }

  static toJson(model: UserModel, uuid?: string) {
    return {
      uuid: uuid ?? model.uuid,
      displayName: model.displayName,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }
}
