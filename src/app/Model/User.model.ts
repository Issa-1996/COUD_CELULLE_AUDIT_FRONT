import { CourierModel } from "./Courier.model";
import { FicheDeControlModel } from "./FicheDeControl.model";
import { RapportModel } from "./Rapport.model";

export interface UserModel {
    id: number;
    prenom: string;
    nom: string;
    matricule: string;
    username: string;
    dateNaissance: string;
    profil: string;
    email: string;
    roles: [];
    ficheDeControl: FicheDeControlModel;
    courier: CourierModel;
    rapports: RapportModel;
}