import { User } from "./user";
import { Camion } from "./camion";

export interface MeResponse {
    user: Omit<User, 'password'>
    camion: Camion | null
}