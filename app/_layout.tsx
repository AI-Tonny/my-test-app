import { Stack } from "expo-router";
import { store } from "../store/store";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";

export default function RootLayout() {
    return (
        <Provider store={store}>
            <Stack screenOptions={{ headerShown: false }} />
            <StatusBar barStyle="dark-content" />
        </Provider>
    );
}