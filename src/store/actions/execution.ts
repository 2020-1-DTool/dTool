import { Card as CardType } from "../../services/types";

/**
 * Subrescreve os cards do state, pelo novo array com um card novo
 * @param cards Array de cards, com o novo card adicionado
 */
export function addCard(cards: CardType[]) {
  return {
    type: "ADD_CARD",
    cards,
  };
}

export function setCardExecutionSate(newExecState: string, index: number) {
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
