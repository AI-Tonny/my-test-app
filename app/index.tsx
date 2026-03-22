import { View, StatusBar } from "react-native";
import LoginForm from "@/components/LoginForm";

export default function Index() {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
      <StatusBar barStyle="dark-content"/>

      <LoginForm />
    </View>
  );
}
