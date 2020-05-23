/**
 * Definições de tipos usados nas funções de serviço.
 */

/** Tipos de código de acesso. */
export type Permission =
  | "time-tracking"
  | "administration-hospital"
  | "administration-app";

export interface Activity {
  id: number;
  name: string;
  shortName: string;
}

interface Role {
  id: number;
  name: string;
  activities: Activity[];
}

interface Technology {
  id: number;
  name: string;
  activities: Activity[];
}

export interface LocalData {
  institution?: { name: string };
  roles?: Role[];
  technologies?: Technology[];

  institutions?: { id: number; name: string }[];
}

export interface Preferences {
  technology?: number;
  role?: number;
}

export interface Session {
  technology?: number;
  role?: number;
}

export interface Auth {
  code: string;
  token: string;
  permission: string;
}

export type Patient = {
  id: string;
  name: string;
  sex: string;
};

export type Card = {
  patient: string;
  activity: string;
  role?: string;
  time: string;
};
