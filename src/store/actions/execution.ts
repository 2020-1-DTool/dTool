import { Card as CardType, ExecutionStatus } from "../../services/types";

/**
 * Sobrescreve os cards do state, pelo novo array com um card novo
 * @param cards Array de cards, com o novo card adicionado
 */
export function addCard(cards: CardType[]) {
  return {
    type: "ADD_CARD",
    cards,
  };
}

/**
 * Seta o tempo percorrido no cronômetro visual
 * @param time Tempo atualizado do cronômetro
 * @param index Índice do card a ser alterado
 */
export function setCardTime(time: number, index: number) {
  return {
    type: "UPDATE_TIME",
    time,
    index,
  };
}

/**
 * Remove card do carrosel, a partir do índice informado
 * @param index Índice do card a ser removido
 */
export function removeCard(index: number) {
  return {
    type: "REMOVE_CARD",
    index,
  };
}

/**
 * Seta o estado do cronômetro do card
 * @param isActive Se `true`, o cronômetro deve contar, caso contrário não está em contagem (pausado ou não inicializado)
 * @param index Índice do card que o estado será alterado
 */
export function setActive(isActive: boolean, index: number) {
  return {
    type: "SET_ACTIVE",
    isActive,
    index,
  };
}

/**
 * Seta o estado de execução do card, a partir do índice informado
 * @param newExecState Novo estado de execução do card
 * @param index Índice do card a ser alterado
 */
export function setCardExecutionState(
  newExecState: ExecutionStatus,
  index: number
) {
  return {
    type: "SET_CARD_EXECUTION_STATE",
    newExecState,
    index,
  };
}

/**
 * Define o card selecionado
 * @param card Objeto de card com suas respectivas informações
 * @param index Índice do card selecionado
 */
export function toggleCard(card: CardType, index: number) {
  return {
    type: "SET_SELECTED_CARD",
    card,
    index,
  };
}
