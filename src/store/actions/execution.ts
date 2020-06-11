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
 * Seta o estado de execução do card, a partir do índice informado
 * @param newExecState Novo estado de execução do card
 * @param index Índice do card a ser alterado
 */
export function setCardExecutionSate(
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
