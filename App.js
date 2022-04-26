import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from "./navigation/Tabs";
import {NavigationContainer,DefaultTheme,DarkTheme} from "@react-navigation/native";
import {createContext, useState} from "react";
import {CameraContext} from "./context/CameraContext";
export default function App() {
  const [startCamera, setStartCamera] = useState(false);
  return (
      <CameraContext.Provider value={{
        setStartCamera,startCamera
      }}>
        <NavigationContainer >
          <Tabs/>
        </NavigationContainer>
      </CameraContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
