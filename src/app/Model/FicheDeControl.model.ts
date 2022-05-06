import { UserModel } from "./User.model";

export interface FicheDeControlModel{
    id: number;
    nomControleur:string;
    avisControleur: string;
    motivation:string;
    recommandations:string;
    controleurs:UserModel;
    coordinateur: UserModel;
}