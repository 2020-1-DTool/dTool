/**
 * Aqui fica o estado global da tela de execuções, ou seja,
 * todas as informações que são compartilhadas entre os componentes
 * que participam da execução de atividades.
 */

const initialState = {
  selectedCard: {},
  selectedCardIndex: 0,
  data: [
    {
      patient: { id: "", name: "", sex: "" },
      activity: "",
      role: "",
      technology: "",
      time: "00:00:00",
      executionState: "unitialized",
    },
  ],
};

export default function execution(prevState = initialState, action: any) {
  let updatedData;
  switch (action.type) {
    case "ADD_CARD":
      return {
        ...prevState,
        data: action.cards,
        selectedCard: action.cards[0],
        selectedCardIndex: 0,
      };
    case "REMOVE_CARD":
      updatedData = prevState.data;
      updatedData.splice(action.index, 1);
      console.warn("AHAAM", updatedData);
      return {
        data: updatedData,
        selectedCard: updatedData[0],
        selectedCardIndex: 0,
      };
    case "SET_CARD_EXECUTION_STATE": {
      updatedData = { ...prevState };
      console.warn("AQUI ", updatedData.data[action.index]);
      updatedData.data[action.index].executionState = action.newExecState;
      console.warn("AQUI ", updatedData);
      return {
        ...prevState,
        data: updatedData.data,
        selectedCard: updatedData.data[action.index],
        selectedCardIndex: action.index,
      };
    }
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
