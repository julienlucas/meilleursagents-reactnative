import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName, Image, Text } from 'react-native';

import { RootStackParamList, RootDrawerParamList } from './index.interface';
import Messages from '../front/userinterface/screens/Messages';
import Message from '../front/userinterface/screens/Message';
import LinkingConfiguration from './LinkingConfiguration';

import { useTypedSelector, store } from '../front/store/store';

import styled from 'styled-components/native';
import { theme } from '../front/services/theme';
import IconMailOpen from '../assets/icons/icon-mail-open.svg';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function Root() {
  const state = useTypedSelector((state) => state);
  const { unreadCount } = state;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.purple },
        headerTintColor: 'white',
        drawerActiveBackgroundColor: theme.purple,
        drawerActiveTintColor: 'white',
        headerRight: () => (
          <SButtonUnreadCounter style={{ flexDirection:'row', flexWrap:'wrap', backgroundColor: unreadCount === 0 ? theme.darkGrey : 'white' }}>
            <IconMailOpen width={20} />
            <Text style={{ paddingLeft: 8, marginTop: 12 }}>{unreadCount}</Text>
          </SButtonUnreadCounter>
        ),
      }}
    >
      <Drawer.Screen name="Agence Lille" component={Messages} initialParams={{ realtorId: 101 }} />
      <Drawer.Screen name="Agence Marseille" component={Messages} initialParams={{ realtorId: 102 }} />
      <Drawer.Screen name="Agence Paris" component={Messages} initialParams={{ realtorId: 103 }} />
    </Drawer.Navigator>
  );
};

function RootNavigator() {
  const state = useTypedSelector((state) => state);

  return (
    <Stack.Navigator initialRouteName={'Root'}>
      <Stack.Screen
        name="Root"
        component={Root}
        options={{
          title: '',
          headerShown: true,
          headerTitle: () => (
            <Image source={require('../assets/images/logo-aviv.png')} style={{ resizeMode: 'contain', width: 160, height: 30 }} />
          ),
        }}
      />
      <Stack.Screen
        name="Message"
        component={Message}
        options={{
          title: state?.selectedMessage?.subject || 'Message',
          headerTintColor: theme.purple
        }}
      />
    </Stack.Navigator>
  );
};

const SButtonUnreadCounter = styled.View`
  right: 15px;
  width: auto;
  min-width: 60px;
  height: 31px;
  color: white;
  background-color: ${() => (store.getState().unreadCount === 0 ? theme.darkGrey : theme.purple)};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  font-size: 16px;
  transition: 0.1s;
`;