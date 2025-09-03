import { INationality } from "./INationality";
import { INationalityCreation } from "./INationalityCreation";
import { INationalityUpdate } from "./INationalityUpdate";

export interface INationalityRepository {
  findMany(): Promise<INationality[]>;
  findUnique(id: string): Promise<INationality | null>;
  create(nationality: INationalityCreation): Promise<INationality>;
  update(id: string, nationality: INationalityUpdate): Promise<INationality>;
  delete(id: string): Promise<INationality>;
}
