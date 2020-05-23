import moment, { Moment } from "moment";
import {
  addFinishedExecution,
  addOngoingExecution,
  getOngoingExecutions,
  setOngoingExecution,
  removeOngoingExecution,
} from "./localStorage";
import { ExecutionStatus, OngoingExecution, FinishedExecution } from "./types";

/**
 * Coordena o a manipulação de execuções.
 *
 * O objetivo é centralizar as funções relacionadas à execuções, de forma a
 * não poluir as Screens que em que serão utilizadas e que mudanças necessárias
 * sejam automaticamente propagadas a todas as telas que necessitem trabalhar com
 * execuções.
 *
 */

/** Função responsável por criar uma nova execução */
export const createExecution = async (cardInfo: any) => {
  let startTime: Moment = moment();
  let strStartTime: string = startTime.format("YYYY-MM-DDTHH:mm:ss[Z]ZZ");
  console.log(
    "timerFunction.createExecution: Criando execução - Horário atual: ",
    strStartTime
  );

  let newExecution: OngoingExecution = {
    startTime: strStartTime,
    elapsedTime: 0,
    latestStartTime: startTime,
    idPatient: cardInfo.idPatient,
    role: cardInfo.role,
    activity: cardInfo.activity,
    currentState: ExecutionStatus.Uninitialized,
  };
  await addOngoingExecution(newExecution);
  // Chamar add ao storage
};

/** Função responsável por iniciar contagem de tempo de uma execução
 * Retorna true se foi possível iniciar, podendo determinar a criação de setInterval()
 * para fazer update de todas as execuções
 */

export const initializeExecution = async (id: number) => {
  // Usar get do storage por indice

  let isInitialized: boolean;
  let execution = await getSingleOngoingExecution(id);
  if (execution === null) {
    return false;
  }
  if (
    execution.currentState === ExecutionStatus.Paused ||
    execution.currentState === ExecutionStatus.Uninitialized
  ) {
    let startTime: Moment = moment();
    let strTime: string = startTime.format("YYYY-MM-DDTHH:mm:ss[Z]ZZ");
    console.log(
      "timerFunction.initializeExecution: Inicializando execução - Horário atual: ",
      strTime
    );
    if (execution.currentState === ExecutionStatus.Uninitialized) {
      execution.startTime = strTime;
    }

    execution.latestStartTime = startTime;
    execution.currentState = ExecutionStatus.Initialized;

    // Usar set de storage
    await setOngoingExecution(execution, id);
    isInitialized = true;
  } else {
    console.warn("Execução já iniciada");
    isInitialized = false;
  }
  return isInitialized;
};
/** Função responsável por pausar uma execução */
export const pauseExecution = async (id: number) => {
  // Usar get do storage por indice

  let execution = await getSingleOngoingExecution(id);
  if (execution === null) {
    return false;
  }
  if (execution.currentState === ExecutionStatus.Initialized) {
    execution = addElapsedTime(execution);
    await setOngoingExecution(execution, id);
    return true;
  }

  console.warn("Execution not running");
  return false;
};

/** Função responsável por cancelar uma execução */
export const cancelExecution = async (id: number) => {
  // Usar remove
  await removeOngoingExecution(id);
};

/** Função responsável por finalisar uma execução, removendo-a da lista de
 * execuções correntes e passando para a lista de execuções a serem enviadas ao BD
 */
export const finishExecution = async (id: number) => {
  let execution = await getSingleOngoingExecution(id);
  if (execution === null) {
    return false;
  }

  console.log("timerFunction.finishExecution: Finalizando execução");
  if (
    execution.currentState === ExecutionStatus.Paused ||
    execution.currentState === ExecutionStatus.Initialized
  ) {
    if (execution.currentState === ExecutionStatus.Initialized) {
      execution = addElapsedTime(execution);
    }
    execution.currentState = ExecutionStatus.Finished;
    await removeOngoingExecution(id);
    let newFinishedExecution: FinishedExecution = {
      activity: execution.activity,
      role: execution.role,
      date: execution.startTime,
      duration: execution.elapsedTime,
      currentState: execution.currentState,
    };

    return addFinishedExecution(newFinishedExecution);
  }
  console.error("Execução nunca foi iniciada.");
  await removeOngoingExecution(id);
  return false;
};

/** Função responsável por atualizar contagem de toda a lista de execuções correntes.
 * Retorna false se não há execuções para serem atualizadas e true se há
 */
export const updateAll = async () => {
  let strArray = await getOngoingExecutions();
  if (!strArray || strArray.length === 0) {
    console.warn("Não há execuções.");
    return false;
  }

  let arExecutions: OngoingExecution[] = JSON.parse(strArray);
  let execution: OngoingExecution;
  let isOneRunning = false;
  for (let i = 0; i < arExecutions.length; i++) {
    execution = arExecutions[i];
    if (execution.currentState === ExecutionStatus.Initialized) {
      execution = addElapsedTime(execution);
      isOneRunning = true;
      setOngoingExecution(execution, i);
    }
  }
  return isOneRunning;
};

/** Recebe tempo em segundos e devolve string formatada corretamente.
 */
export const timeToString = (time: number) => {
  let strTime = moment.unix(time).utc().format("HH:mm:ss");
  console.log(strTime);
  return strTime;
};

const addElapsedTime = (execution: OngoingExecution) => {
  let pauseTime: Moment = moment();
  console.log(
    "timerFunction.addElapsedTime: Horário atual: ",
    pauseTime.format("YYYY-MM-DDTHH:mm:ss[Z]ZZ")
  );
  console.log(
    "timerFunction.addElapsedTime: Contagem até este momento: ",
    execution.elapsedTime
  );

  let diffTime: number = Math.round(
    moment.duration(pauseTime.diff(execution.latestStartTime)).asSeconds()
  );
  console.log(
    "timerFunction.addElapsedTime: Contagem a ser adicionada: ",
    diffTime
  );
  let newElapsedTime: number = execution.elapsedTime + diffTime;
  console.log(
    "timerFunction.addElapsedTime: Pausando execução - Contagem atual: ",
    newElapsedTime
  );
  execution.elapsedTime = newElapsedTime;
  execution.currentState = ExecutionStatus.Paused;
  return execution;
};

const getSingleOngoingExecution = async (id: number) => {
  let lstExecution = await getOngoingExecutions();
  if (!lstExecution || lstExecution.length === 0) {
    console.warn("Não há execuções.");
    return null;
  }

  if (JSON.parse(lstExecution).length > id) {
    let execution: OngoingExecution = JSON.parse(lstExecution)[id];
    return execution;
  }

  console.error("Invalid index position");
  return null;
};
