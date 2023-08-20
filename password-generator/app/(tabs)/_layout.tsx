import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs initialRouteName='generator/index'>
      <Tabs.Screen
        name="generator/index"
        options={{
          title: 'Generator',
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="storage/index"
        options={{
          title: 'Storage',
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
