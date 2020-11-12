import 'react-native-gesture-handler';
import {createStackNavigator} from 'react-navigation-stack';
import React, {Component} from 'react';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import TareasScreen from './screens/TareasScreen';
import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';
import LoginScreen from './screens/LoginScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import constants from './components/Constants';
import DetalleTareaScreen from './screens/DetalleTareaScreen';
import ValidationScreen from './screens/ValidationScreen';
import EditAccountScreen from './screens/EditAccountScreen';
import TareasCompletadasScreen from './screens/TareasCompletadasScreen';
import {
  Platform,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text} from 'react-native-elements';

const {width} = Dimensions.get('window');
var nombreTodo = '';
var apellidoTodo = '';
var idTodo = '';
var emailTodo = '';
var tipoTodo = '';

const CustomDrawerNavigation = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableWithoutFeedback
        onPress={() => {
          props.navigation.navigate('Perfil');
        }}>
        <View
          style={{
            height: 95,
            backgroundColor: constants.PRIMARY_BG_COLOR,
            opacity: 0.9,
            flexDirection: 'row',
            paddingTop: 30,
            paddingBottom: 18,
            paddingLeft: 24,
            paddingRight: 24,
          }}>
          <View style={{width: 50, /*height: 200,*/ backgroundColor: 'Green'}}>
            <Image
              source={{uri: constants.PROFILE_AVATAR}}
              style={styles.avatar}
            />
          </View>
          <View
            style={{
              paddingLeft: 10,
              height: 50,
              backgroundColor: 'Green',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{color: constants.SECONDARY_BG_COLOR}}
              h4
              h4Style={{fontSize: 18}}>
              {nombreTodo + ' ' + apellidoTodo}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
      <View style={{alignItems: 'center', bottom: 20}}>
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate('switchLogin')}>
          <View style={{flexDirection: 'row'}}>
            <IconMaterialCommunity
              name="logout"
              style={{fontSize: 24, paddingRight: 5}}
            />
            <Text>Cerrar sesión</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

class AppPerfilScreen extends React.Component {
  render() {
    return (
      <AccountScreen
        idTodo={idTodo}
        nombreTodo={nombreTodo}
        apellidoTodo={apellidoTodo}
        emailTodo={emailTodo}
        tipoTodo={tipoTodo}
        onPressGo={this.iniciarSesion.bind(this)}
        openDrawer={this.openDrawer.bind(this)}
        onPressEdit={this.goEditScreen.bind(this)}
      />
    );
  }
  iniciarSesion(id, nombre, apellido, email, tipo) {
    nombreTodo = nombre;
    apellidoTodo = apellido;
    idTodo = id;
    emailTodo = email;
    tipoTodo = tipo;
    this.props.navigation.navigate('switchValidationNavigator', {
      id: id,
      nombre: nombre,
      apellido: apellido,
      email: email,
      tipo: tipo,
    });
  }
  openDrawer() {
    this.props.navigation.openDrawer();
  }
  goEditScreen(id, nombre, apellido, email, tipo) {
    this.props.navigation.navigate('editarPerfilScreen', {
      id: id,
      nombre: nombre,
      apellido: apellido,
      email: email,
      tipo: tipo,
    });
  }
}

class appTareasScreen extends React.Component {
  render() {
    return (
      <TareasScreen
        idTodo={idTodo}
        nombreTodo={nombreTodo}
        apellidoTodo={apellidoTodo}
        emailTodo={emailTodo}
        tipoTodo={tipoTodo}
        onPressGo={this.iniciarSesion.bind(this)}
        openDrawer={this.openDrawer.bind(this)}
        onPressDetalle={this.goDetalleScreen.bind(this)}
      />
    );
  }
  iniciarSesion(id, nombre, apellido, email, tipo) {
    nombreTodo = nombre;
    apellidoTodo = apellido;
    idTodo = id;
    emailTodo = email;
    tipoTodo = tipo;
    this.props.navigation.navigate('switchValidationNavigator', {
      id: id,
      nombre: nombre,
      apellido: apellido,
      email: email,
      tipo: tipo,
    });
  }
  openDrawer() {
    this.props.navigation.openDrawer();
  }

  goDetalleScreen(item) {
    this.props.navigation.navigate('detalleTarea', {
      DetalleTarea: item,
    });
  }
}

class appDetalleTareaScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Tarea',
      headerStyle: {
        backgroundColor: '#6BA8FF',
        height: 70,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
    };
  };

  render() {
    return (
      <DetalleTareaScreen
        idTodo={idTodo}
        nombreTodo={nombreTodo}
        apellidoTodo={apellidoTodo}
        emailTodo={emailTodo}
        tipoTodo={tipoTodo}
        onPressGo={this.iniciarSesion.bind(this)}
        openDrawer={this.openDrawer.bind(this)}
      />
    );
  }
  iniciarSesion(id, nombre, apellido, email, tipo) {
    nombreTodo = nombre;
    apellidoTodo = apellido;
    idTodo = id;
    emailTodo = email;
    tipoTodo = tipo;

    this.props.navigation.navigate('switchValidationNavigator', {
      id: id,
      nombre: nombre,
      apellido: apellido,
      email: email,
      tipo: tipo,
    });
  }
  openDrawer() {
    this.props.navigation.openDrawer();
  }
}

class AppHomeScreen extends React.Component {
  render() {
    return (
      <HomeScreen
        idTodo={idTodo}
        nombreTodo={nombreTodo}
        apellidoTodo={apellidoTodo}
        emailTodo={emailTodo}
        tipoTodo={tipoTodo}
        onPressGo={this.iniciarSesion.bind(this)}
        openDrawer={this.openDrawer.bind(this)}
      />
    );
  }
  iniciarSesion(id, nombre, apellido, email, tipo) {
    nombreTodo = nombre;
    apellidoTodo = apellido;
    idTodo = id;
    emailTodo = email;
    tipoTodo = tipo;
    this.props.navigation.navigate('switchValidationNavigator', {
      id: id,
      nombre: nombre,
      apellido: apellido,
      email: email,
      tipo: tipo,
    });
  }
  openDrawer() {
    this.props.navigation.openDrawer();
  }
}

class AppEditPerfilScreen extends React.Component {
  // static navigationOptions = ({navigation}) => {
  //   return {
  //     title: 'Editar Perfil',
  //     headerStyle: {
  //       backgroundColor: constants.PRIMARY_BG_COLOR,
  //       height: 70,
  //       paddingTop: 25,
  //       paddingBottom: 10,
  //       borderBottomWidth: 0,
  //     },
  //     headerTintColor: 'white',
  //   };
  // };

  render() {
    return (
      <EditAccountScreen
        idTodo={idTodo}
        nombreTodo={nombreTodo}
        apellidoTodo={apellidoTodo}
        emailTodo={emailTodo}
        tipoTodo={tipoTodo}
        onPressGo={this.iniciarSesion.bind(this)}
        //openDrawer={this.openDrawer.bind(this)}
      />
    );
  }
  iniciarSesion(id, nombre, apellido, email, tipo) {
    nombreTodo = nombre;
    apellidoTodo = apellido;
    idTodo = id;
    emailTodo = email;
    tipoTodo = tipo;

    this.props.navigation.navigate('switchValidationNavigator', {
      id: id,
      nombre: nombre,
      apellido: apellido,
      email: email,
      tipo: tipo,
    });
  }
  // openDrawer() {
  //   this.props.navigation.openDrawer();
  // }
}

const PerfilStackNavigator = createStackNavigator(
  {
    PerfilScreen: {
      screen: AppPerfilScreen,
      navigationOptions: {headerShown: false},
    },
    editarPerfilScreen: {
      screen: AppEditPerfilScreen,
      navigationOptions: {headerShown: false},
    },
  },
  {
    initialRouteName: 'PerfilScreen',
  },
);

PerfilStackNavigator.navigationOptions = ({navigation}) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }

  return {
    drawerLockMode,
  };
};

const TareaStackNavigator = createStackNavigator(
  {
    TareasScreen: {
      screen: TareasScreen,
      navigationOptions: {headerShown: false},
    },
    detalleTarea: {
      screen: DetalleTareaScreen,
      navigationOptions: {headerShown: false},
    },
  },
  {
    initialRouteName: 'TareasScreen',
  },
);

TareaStackNavigator.navigationOptions = ({navigation}) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }

  return {
    drawerLockMode,
  };
};

const TareaCompletadaStackNavigator = createStackNavigator(
  {
    TareasCompletadasScreen: {
      screen: TareasCompletadasScreen,
      navigationOptions: {headerShown: false},
    },
    detalleTarea: {
      screen: DetalleTareaScreen,
      navigationOptions: {headerShown: false},
    },
  },
  {
    initialRouteName: 'TareasCompletadasScreen',
  },
);

TareaCompletadaStackNavigator.navigationOptions = ({navigation}) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }

  return {
    drawerLockMode,
  };
};

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppHomeScreen,
      navigationOptions: {
        title: 'Inicio',
        drawerIcon: () => <Icon name="home" size={23} />,
      },
    },
    TareaPendiente: {
      screen: TareaStackNavigator,
      navigationOptions: {
        title: 'Tareas Pendientes',
        drawerIcon: () => <Icon name="tasks" size={23} />,
      },
    },
    TareaCompletada: {
      screen: TareaCompletadaStackNavigator,
      navigationOptions: {
        title: 'Tareas Completadas',
        drawerIcon: () => <Icon name="check" size={23} />,
      },
    },
    Perfil: {
      screen: PerfilStackNavigator,
      navigationOptions: {
        title: 'Perfil',
        drawerIcon: () => <Icon2 name="person" size={23} />,
      },
    },
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

// const DrawerNavigation = createStackNavigator({
//   Login: {screen: LoginScreen, navigationOptions: {headerShown: false}},
//   Drawer: {
//     screen: Drawer,
//     navigationOptions: {headerShown: false},
//   },
//   // DetalleTarea: {
//   //   screen: DetalleTareaScreen,
//   //   navigationOptions: {headerShown: false},
//   // },
// });

class AppValidationScreen extends React.Component {
  render() {
    return <ValidationScreen goDrawer={this.goDrawer.bind(this)} />;
  }
  goDrawer() {
    this.props.navigation.navigate('drawer');
  }
}

class AppLoginScreen extends React.Component {
  render() {
    return <LoginScreen onPressGo={this.iniciarSesion.bind(this)} />;
  }
  iniciarSesion(id, nombre, apellido, email, tipo) {
    nombreTodo = nombre;
    apellidoTodo = apellido;
    idTodo = id;
    emailTodo = email;
    tipoTodo = tipo;
    this.props.navigation.navigate('switchValidationNavigator', {
      id: id,
      nombre: nombre,
      apellido: apellido,
      email: email,
      tipo: tipo,
    });
  }
}

// const switchValidatorNavigator = createSwitchNavigator({
//   switchValidation: {screen: AppValidationScreen},
//   drawer: {screen: DrawerNavigator},
// });

// const appSwitchNavigator = createSwitchNavigator({
//   switchLogin: {screen: AppLoginScreen},
//   switchValidationNavigator: {screen: switchValidatorNavigator},
// });

const appSwitchNavigator = createSwitchNavigator({
  switchLogin: {screen: AppLoginScreen},
  drawer: {screen: DrawerNavigator},
  switchValidationNavigator: {screen: AppValidationScreen},
});

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 60,
    width: 50,
    height: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.45)',
  },
});

export default createAppContainer(appSwitchNavigator);
