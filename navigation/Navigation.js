import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import ProcesosScreen from '../screens/ProcesosScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

const {width} = Dimensions.get('window');
const CustomDrawerNavigation = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableWithoutFeedback
      //   onPress={() => {
      //     props.navigation.navigate("Account");
      //   }}
      >
        <View
          style={{
            height: 80,
            backgroundColor: '#d2d2d2',
            opacity: 0.9,
            flexDirection: 'row',
            paddingTop: 18,
            paddingBottom: 18,
            paddingLeft: 24,
            paddingRight: 24,
          }}>
          <View style={{width: 50, /*height: 200,*/ backgroundColor: 'Green'}}>
            {/* <Image
                source={{ uri: constants.PROFILE_AVATAR }}
                style={styles.avatar}
              /> */}
          </View>
          <View
            style={{
              paddingLeft: 10,
              height: 50,
              backgroundColor: 'Green',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>John Doe</Text>
          </View>
          <View
            style={{
              paddingLeft: 10,
              paddingTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <IconAntDesign
              name={'right'}
              style={{fontSize: 15, color: 'black'}}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
      <View style={{alignItems: 'center', bottom: 20}}>
        {/* <TouchableWithoutFeedback onPress={() => props.navigation.navigate("Login")}>
          <View style={{ flexDirection: "row" }}>
            <IconMaterialCommunity
              name="logout"
              style={{ fontSize: 24,paddingRight:5 }}
            />
            <Text>Cerrar sesión</Text>
          </View>
          </TouchableWithoutFeedback> */}
      </View>
    </SafeAreaView>
  );
};
const Drawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
      },
    },
    Proceso: {
      screen: ProcesosScreen,
      navigationOptions: {
        title: 'Proceso',
      },
    },
    // Login: {
    //   screen: LoginScreen,
    //   navigationOptions: { headerShown: false },
    // },
    // Notificaciones: {
    //   screen: BlankScreen,
    //   navigationOptions: {
    //     title: 'Notificaciones',
    //   },
    // },
    /*HomeIndex: {
        screen: HomeScreen,
        navigationOptions:{
          drawerLockMode: 'locked-closed'
        }
      }*/
  },
  {
    drawerPosition: 'left',
    //initialRouteName: 'HomeIndex',
    contentComponent: CustomDrawerNavigation,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerWidth: (width / 3) * 2,
  },
);

const DrawerNavigation = createStackNavigator({
  Login: {screen: LoginScreen, navigationOptions: {headerShown: false}},
  Drawer: {screen: Drawer, navigationOptions: {headerShown: false}},
  //   Detalleshotel: {
  //     screen: DetallesHotelsScreen,
  //     navigationOptions: {headerShown: false},
  //   },
  //   Searchhotel: {
  //     screen: SearchScreen,
  //     navigationOptions: {headerShown: false},
  //   },
  //   Mapas: {
  //     screen: MapasScreen,
  //     navigationOptions: {headerShown: true},
  //   },
  //   Account: {
  //     screen: AccountScreen,
  //     navigationOptions: {headerShown: false},
  //   },
  //   Admin: {
  //     screen: AdminHotelsScreen,
  //     navigationOptions: {headerShown: false},
  //   },
  //   AdminDetalle: {
  //     screen: AdminDetallesHotelsScreen,
  //     navigationOptions: {headerShown: false},
  //   },
  //   Login: {
  //     screen: LoginSignUpScreen,
  //     navigationOptions: {headerShown: false},
  //   },
  //   HomeFailSave: {
  //     screen: HomeScreen,
  //     navigationOptions: {headerShown: false},
  //   },
});

export default createAppContainer(DrawerNavigation);
