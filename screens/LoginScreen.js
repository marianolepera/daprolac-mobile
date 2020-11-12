import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Background from '../components/BackGround';
import axios from 'axios';

import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Logo from '../components/Logo';
import {theme} from '../components/Core';
import {withNavigation} from 'react-navigation';
import Loader from '../components/loader';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'abarrios@luz-azul.com.ar',
      clave: '123',
      isLoading: false,
    };
  }

  iniciarSesion() {
    this.setState({isLoading: true});
    const usuario = {
      email: this.state.email,
      clave: this.state.clave,
    };

    console.log(usuario);

    axios
      .post(`https://daprolac.herokuapp.com/api/v1/usuarios/login`, usuario)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({isLoading: false});
        this.props.onPressGo(
          res.data.payload.id,
          res.data.payload.nombre,
          res.data.payload.apellido,
          res.data.payload.email,
          res.data.payload.tipo,
        );
        if (res.data.payload.tipo == 0) {
          alert('Solo pueden ingresar los operarios');
          this.props.navigation.navigate('switchLogin');
        }
        if (res.data.payload.auth == false) {
          alert('no existe el usuario o la contraseña es incorrecta');
          this.props.navigation.navigate('switchLogin');
        }
      })
      .catch(error => {
        console.log(error.response);
        alert('no existe el usuario o la contraseña es incorrecta');
        this.setState({isLoading: false});
      });
  }

  render() {
    return (
      <Background>
        <Logo />
        <Header>Ingresa tus datos para iniciar sesion</Header>

        <TextInput
          label="Usuario"
          returnKeyType="next"
          error={false}
          errorText={''}
          onChangeText={email => this.setState({email})}
          value={this.state.email}
          autoCapitalize="none"
        />

        <TextInput
          label="Contraseña"
          returnKeyType="done"
          error={false}
          errorText={''}
          onChangeText={clave => this.setState({clave})}
          value={this.state.clave}
          secureTextEntry
          autoCapitalize="none"
        />

        <View style={styles.forgotPassword}>
          <TouchableOpacity>
            <Text style={styles.label}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        {this.state.isLoading && <Loader />}
        <Button
          mode="contained"
          onPress={() => {
            this.iniciarSesion();
          }}>
          Iniciar Sesion
        </Button>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default withNavigation(LoginScreen);
