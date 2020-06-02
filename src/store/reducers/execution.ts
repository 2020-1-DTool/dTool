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
  switch (action.type) {
    case "ADD_CARD":
      return {
        ...prevState,
        data: action.cards,
        selectedCard: action.cards[0],
        selectedCardIndex: 0,
      };
    case "SET_CARD_EXECUTION_STATE": {
      let updatedData = { ...prevState };
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
