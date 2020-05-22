import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

const WarningBox: React.FC = () => {
  const handleBack = () => {
    console.log("Tentando enviar agora...");
  };

  return (
    <View style={styles.warning}>
      <Text style={styles.text}>
        Você possui registros de execução não salvos que serão enviados no fim
        da próxima execução.
      </Text>
      <TouchableOpacity style={styles.warningButton} onPress={handleBack}>
        <Text style={styles.warningButton}>Tentar enviar agora</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.text.primary,
    fontSize: sizes.buttonText.note,
  },
  warning: {
    color: colors.theme.accent,
  },
  warningButton: {
    color: colors.theme.failure,
    fontSize: sizes.buttonText.label,
  },
});

export default WarningBox;
