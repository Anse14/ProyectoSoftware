import { RolEnum } from "@graphql";

export interface User {
  id: string,
  idToken: string,
  email: string,
  codigo: string,
  nombre: string,
  rol: RolEnum
}