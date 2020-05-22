import React, { ReactElement } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Patient } from "../services/types";
import sizes from "../utils/sizes";
import colors from "../utils/colors";
import ErrorText from "./ErrorText";

export interface Props {
  data?: Array<any>;
  patientList?: Patient[];
  technologyList?: string[];
  onPress?: (index: number) => void;
  onPressTrashIcon?: (item: number) => void;
  icon?: ReactElement;
}

const BasicList: React.FC<Props> = ({
  data,
  icon,
  onPress,
  onPressTrashIcon,
  patientList,
  technologyList,
}) => {
  return (
    <View style={styles.contanier}>
      {data?.length || patientList?.length || technologyList?.length ? (
        <FlatList
          data={data || patientList || technologyList}
          renderItem={({ item, index }) =>
            patientList || technologyList ? (
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => onPress!(index)}
                >
                  <Text style={[styles.item, styles.patientName]}>
                    {item?.name || item}
                  </Text>
                  <Text style={[styles.item, styles.patientSubtitle]}>
                    {item?.id} {item?.id && "|"} {item?.sex}
                  </Text>
                </TouchableOpacity>
                {icon && (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => onPressTrashIcon!(index)}
                    style={styles.iconButton}
                  >
                    {icon}
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View style={styles.itemContainer}>
                <TouchableOpacity onPress={() => onPress!(index)}>
                  <Text style={styles.item}>{item}</Text>
                </TouchableOpacity>
              </View>
            )
          }
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <ErrorText text="Não há itens salvos." />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contanier: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 200,
  },
  iconButton: {
    position: "absolute",
    right: 10,
  },
  item: {
    color: colors.text.primary,
    flexDirection: "row",
    fontSize: sizes.buttonText.main,
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 16,
  },
  itemContainer: {
    alignItems: "center",
    borderBottomColor: colors.basic.separator,
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  patientName: {
    fontWeight: "bold",
  },
  patientSubtitle: {
    color: colors.text.tertiary,
    fontSize: sizes.buttonText.label,
  },
});

export default BasicList;
