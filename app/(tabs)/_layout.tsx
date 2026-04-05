import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "black"
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home-outline" color={color} size={size}/>
                    )
                }}
            />
            <Tabs.Screen
                name="news"
                options={{
                    tabBarLabel: "News",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="newspaper-outline" color={color} size={size}/>
                    )
                }}
            />
        </Tabs>
    )
}