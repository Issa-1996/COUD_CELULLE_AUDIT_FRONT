import { FicheDeControlModel } from "./FicheDeControl.model";
import { RapportModel } from "./Rapport.model";
import { UserModel } from "./User.model";

export interface CourierModel{
    length: number;
    id: string;
    numeroCourier: string;
    numeroCompte: string;
    object:string;
    nature: string;
    etat:string;
    numeroArriver:string;
    numeroDepart:string;
    dateArriver: string;
    expediteur: string;
    typeDeCourrier:string;
    dateDepart:string;
    destination:string;
    observation:string;
    statut:string;
    rapport: RapportModel;
    controleur: UserModel;
    assistante: UserModel;
    coordonateur: UserModel;
    ficheDeControle: FicheDeControlModel;
}