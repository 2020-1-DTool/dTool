/* eslint-disable no-case-declarations */
/**
 * Aqui fica o estado global da tela de execuções, ou seja,
 * todas as informações que são compartilhadas entre os componentes
 * que participam da execução de atividades.
 */

import { CarouselType, ExecutionStatus } from "../../services/types";

const initialState: CarouselType = {
  selectedCard: undefined,
  selectedCardIndex: 0,
  data: [],
};

export default function execution(prevState = initialState, action: any) {
  let data;
  switch (action.type) {
    case "ADD_CARD":
      return {
        data: action.cards,
        selectedCard: action.cards[0],
        selectedCardIndex: 0,
      };
    case "UPDATE_ALL_TIMES":
      const dataTime = prevState.data.map((item) => {
        if (item.executionState === ExecutionStatus.Initialized) {
          console.log("time", (item?.time || 0) + 1);
          return { ...item, time: (item?.time || 0) + 1 };
        }
        return item;
      });

      console.log("DATA", dataTime);

      return {
        ...prevState,
        data: dataTime,
      };
    case "REMOVE_CARD":
      const nextCard = prevState.data.length > 0 && action.index === 0 ? 1 : 0;
      return {
        data: prevState.data.filter((item, index) => index !== action.index),
        selectedCard: prevState.data[nextCard],
        selectedCardIndex: 0,
      };
    case "SET_ACTIVE":
      const dataActive = prevState.data.map((item, index) => {
        if (index !== action.index) {
          return item;
        }
        console.log("isActive: atual - novo", item.isActive, action.isActive);
        return {
          ...item,
          isActive: action.isActive,
        };
      });

      return {
        data: dataActive,
        selectedCard: dataActive[action.index],
        selectedCardIndex: action.index,
      };
    case "SET_CARD_EXECUTION_STATE":
      data = prevState.data.map((item, index) => {
        if (index !== action.index) {
          return item;
        }
        return {
          ...item,
          executionState: action.newExecState,
        };
      });

      return {
        data,
        selectedCard: data[action.index],
        selectedCardIndex: action.index,
      };
    case "SET_SELECTED_CARD":
      return {
        ...prevState,
        selectedCard: action.card,
        selectedCardIndex: action.index,
      };
    default:
      break;
  }
  return prevState;
}
