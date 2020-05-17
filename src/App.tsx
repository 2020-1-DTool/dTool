import "react-native-gesture-handler";
import React from "react";
import { StatusBar, YellowBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButton, HeaderSearch } from "./components";
import {
  AddPatient,
  CarouselScreen,
  ChooseActivity,
  ChooseRole,
  ChooseTechnology,
  HospitalCode,
  HospitalInformation,
  StartScreen,
  SelectPatient,
  ListPatient,
} from "./screens";
import colors from "./utils/colors";
import sizes from "./utils/sizes";

YellowBox.ignoreWarnings(["AsyncStorage has been extracted"]);

const Stack = createStackNavigator();

const baseHeaderStyle = {
  headerStyle: {
    backgroundColor: colors.theme.primary,
  },
  headerTintColor: colors.text.navigation,
  headerTitleStyle: {
    fontWeight: "normal",
    fontSize: sizes.headline.h1,
  },
};

const App = () => (
  <>
    <StatusBar
      barStyle="light-content"
      backgroundColor={colors.theme.primary}
    />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{
            ...baseHeaderStyle,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HospitalCode"
          component={HospitalCode}
          options={{
            title: "Hospital",
            ...baseHeaderStyle,
          }}
        />
        <Stack.Screen
          name="AddPatient"
          component={AddPatient}
          options={{
            title: "Novo paciente",
            ...baseHeaderStyle,
          }}
        />
        <Stack.Screen
          name="ChooseActivity"
          component={ChooseActivity}
          options={{
            title: "Atividade",
            ...baseHeaderStyle,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HospitalInformation}
          options={{
            headerShown: false,
            ...baseHeaderStyle,
          }}
        />
        <Stack.Screen
          name="ChooseTechnology"
          component={ChooseTechnology}
          options={{
            title: "Tecnologia",
            headerTitle: () => (
              <HeaderSearch
                title="Tecnologia"
                style={baseHeaderStyle.headerTitleStyle}
              />
            ),
            ...baseHeaderStyle,
          }}
        />
        <Stack.Screen
          name="ChooseRole"
          component={ChooseRole}
          options={{
            headerTitle: () => (
              <HeaderSearch
                title="Função"
                style={baseHeaderStyle.headerTitleStyle}
              />
            ),
            ...baseHeaderStyle,
          }}
        />
        <Stack.Screen
          name="ListPatient"
          component={ListPatient}
          options={({ navigation }) => ({
            title: "Paciente",
            headerRight: () => (
              <HeaderButton
                iconName="ios-camera"
                onPress={() => navigation.navigate("SelectPatient")}
              />
            ),
            ...baseHeaderStyle,
          })}
        />
        <Stack.Screen
          name="SelectPatient"
          component={SelectPatient}
          options={({ navigation }) => ({
            title: "Paciente",
            headerRight: () => (
              <HeaderButton
                iconName="ios-list"
                onPress={() => navigation.navigate("ListPatient")}
              />
            ),
            ...baseHeaderStyle,
          })}
        />
        <Stack.Screen
          name="CarouselScreen"
          component={CarouselScreen}
          options={{
            headerTitle: () => (
              <HeaderSearch
                title="Carrosel"
                style={baseHeaderStyle.headerTitleStyle}
              />
            ),
            ...baseHeaderStyle,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
);

export default App;
