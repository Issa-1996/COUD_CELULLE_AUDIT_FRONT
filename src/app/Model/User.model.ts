import { CourierModel } from "./Courier.model";
import { FicheDeControlModel } from "./FicheDeControl.model";
import { RapportModel } from "./Rapport.model";

export interface UserModel {
    id: number;
    prenom: string;
    nom: string;
    matricule: string;
    password: string;
    username: string;
    dateNaissance: string;
    email: string;
    roles: [];
    FicheDeControle: FicheDeControlModel;
    
}