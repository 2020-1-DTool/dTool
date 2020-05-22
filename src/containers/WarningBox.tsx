import { Text, StyleSheet, View } from "react-native";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

const WarningBox: React.FC = () => {
  return (
    <View>
      <View>
        <Text style={styles.text}>
          Você possui registros de execução não salvos que serão enviados no fim
          da próxima execução.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.text.primary,
    fontSize: sizes.buttonText.label,
    paddingRight: 10,
  },
});

export default WarningBox;
