/**
 * Definições de tipos usados nas funções de serviço.
 */

import { Moment } from "moment";

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

export interface Technology {
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

export type Doc = {
  id: number;
  name: string;
  type?: string;
};

export type OngoingExecution = {
  startTime: string;
  elapsedTime: number;
  latestStartTime: Moment;
  idPatient: string;
  role: number;
  activity: number;
  currentState: ExecutionStatus;
};

export type FinishedExecution = {
  activity: number;
  role: number;
  date: string; // ISO8601
  duration: number;
};

export enum ExecutionStatus {
  Initialized,
  Paused,
  Finished,
  Uninitialized,
}

export type CardExecutionType = {
  idPatient: string;
  role: number;
  activity: number;
};
