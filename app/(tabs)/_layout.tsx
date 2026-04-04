import { Tabs } from "expo-router";
import { Ionicons} from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#00b88c"
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: "Home",
                    title: "Home page",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home-outline" color={color} size={size}/>
                    )
                }}
            />
            <Tabs.Screen
                name="tasks"
                options={{
                    tabBarLabel: "Tasks",
                    title: "Tasks page",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="checkbox" color={color} size={size}/>
                    )
                }}
            />
        </Tabs>
    )
}
