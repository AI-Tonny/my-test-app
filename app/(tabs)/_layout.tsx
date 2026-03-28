import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#00ef14"
        }}>
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: "Profile",
                    title: "Profile Screen",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size}/>
                    )
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    tabBarLabel: "Settings",
                    title: "Settings Screen",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" color={color} size={size}/>
                    )
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: "Home",
                    title: "Home Screen",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={size}/>
                    )
                }}
            />
        </Tabs>
    )
}
