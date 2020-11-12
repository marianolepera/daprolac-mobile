import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import constants from '../components/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const {width} = Dimensions.get('window');
import {Header, Text} from 'react-native-elements';
import Button from '../components/Button';
import {withNavigation} from 'react-navigation';

class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.idTodo,
      email: this.props.emailTodo,
      nombre: this.props.nombreTodo,
      apellido: this.props.apellidoTodo,
      tipo: this.props.tipoTodo,
    };
  }

  render() {
    //const usuario = this.props.navigation.getParam('switchValidationNavigator');
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={constants.PRIMARY_BG_COLOR}
          containerStyle={{paddingTop: 25, paddingBottom: 10, height: 80}}
          leftComponent={
            <Icon.Button
              name="menu"
              size={27}
              color="white"
              backgroundColor={constants.PRIMARY_BG_COLOR}
              onPress={() => this.props.openDrawer()}
            />
          }
          centerComponent={{
            text: 'Perfil',
            style: {fontSize: 20, fontWeight: '700', color: 'white'},
          }}
        />
        <ScrollView>
          <ImageBackground
            source={{uri: constants.DEFAULT_BACKGROUND_IMG}}
            style={styles.backgroundImage}>
            <View style={styles.header}>
              <Image
                source={{uri: constants.PROFILE_AVATAR}}
                style={styles.avatar}></Image>
              <Text style={styles.name}>
                {this.state.nombre} {this.state.apellido}
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.field}>
            <Text style={styles.label}>E-mail</Text>
            <Icon.Button
              name="mail"
              backgroundColor="transparent"
              color="#676767"
              marginTop={-4}>
              <Text style={styles.value}>{this.state.email}</Text>
            </Icon.Button>
            <View>
              <Button
                style={{width: '60%', textAlign: 'center'}}
                mode="contained"
                // onPress={() => {
                //   this.props.navigation.navigate('editarPerfilScreen', {
                //     EditarPerfil: usuario,
                //   });
                // }}
                onPress={() =>
                  this.props.onPressEdit(
                    this.state.id,
                    this.state.nombre,
                    this.state.apellido,
                    this.state.email,
                  )
                }>
                Editar Perfil
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.SECONDARY_BG_COLOR,
  },
  headline: {
    marginTop: 10,
    color: constants.PRIMARY_BG_COLOR,
  },
  backgroundImage: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 300,
  },
  header: {
    backgroundColor: 'rgba(12, 12, 25, 0.75)',
    height: 300,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(12, 12, 25, 0.55)',
  },
  name: {
    fontSize: 30,
    marginBottom: 0,
    color: '#fff',
    fontWeight: '800',
  },
  avatar: {
    borderRadius: 60,
    width: 120,
    height: 120,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.45)',
  },
  field: {
    paddingTop: 15,
    paddingLeft: 20,
  },
  label: {
    fontSize: 20,
    color: constants.PRIMARY_BG_COLOR,
    fontWeight: '700',
    //fontFamily: 'Avenir'
  },
  value: {
    fontSize: 25,
    color: constants.PRIMARY_BG_COLOR,
    //fontFamily: 'Avenir'
  },
});

export default withNavigation(AccountScreen);
