import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import constants from '../components/Constants';
import {Header, Text} from 'react-native-elements';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import {withNavigation} from 'react-navigation';
import Loader from '../components/loader';
import axios from 'axios';

class EditAccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.getParam('id'),
      nombre: this.props.navigation.getParam('nombre'),
      apellido: this.props.navigation.getParam('apellido'),
      email: this.props.navigation.getParam('email'),
      clave: '',
      isLoading: false,
    };
  }

  actualizarUsuario(idUsuario) {
    const usuario = {
      email: this.state.email,
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      clave: this.state.clave,
    };
    console.log(usuario);

    axios
      .put(
        'https://daprolac.herokuapp.com/api/v1/usuarios/' +
          idUsuario +
          '?eager=1',
        usuario,
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({isLoading: false});
        alert('Se edito el usuario');
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log(error.response);
        this.setState({isLoading: false});
        alert('hubo un error');
      });
  }

  render() {
    return (
      <View>
        <Header
          backgroundColor={constants.PRIMARY_BG_COLOR}
          containerStyle={{paddingTop: 25, paddingBottom: 10, height: 80}}
          leftComponent={
            <Icon.Button
              name="md-arrow-back"
              size={27}
              color="white"
              backgroundColor={constants.PRIMARY_BG_COLOR}
              onPress={() => this.props.navigation.goBack()}
            />
          }
          centerComponent={{
            text: 'Editar Perfil',
            style: {fontSize: 20, fontWeight: '700', color: 'white'},
          }}
        />
        <View style={{marginLeft: 20}}>
          <Text style={styles.headline} h4>
            Datos Personales
          </Text>
          <TextInput
            style={{width: '90%'}}
            label="Nombre"
            returnKeyType="next"
            error={false}
            errorText={''}
            onChangeText={nombre => this.setState({nombre})}
            value={this.state.nombre}
            autoCapitalize="none"
          />
          <TextInput
            style={{width: '90%'}}
            label="Apellido"
            returnKeyType="next"
            error={false}
            errorText={''}
            value={this.state.apellido}
            onChangeText={apellido => this.setState({apellido})}
            autoCapitalize="none"
          />
          <TextInput
            style={{width: '90%'}}
            label="Email"
            returnKeyType="next"
            error={false}
            errorText={''}
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            autoCapitalize="none"
          />

          <TextInput
            style={{width: '90%'}}
            label="Contraseña"
            returnKeyType="done"
            error={false}
            errorText={''}
            onChangeText={clave => this.setState({clave})}
            value={this.state.clave}
            secureTextEntry
            autoCapitalize="none"
          />
          <View style={{flexDirection: 'row'}}>
            <Button
              style={{width: '45%', marginRight: 10}}
              mode="contained"
              onPress={() => this.actualizarUsuario(this.state.id)}>
              Aceptar
            </Button>
            <Button
              style={{width: '43%'}}
              mode="contained"
              onPress={() => this.props.navigation.goBack()}>
              Cancelar
            </Button>
            {this.state.isLoading && <Loader />}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headline: {
    marginTop: 10,
    color: constants.PRIMARY_BG_COLOR,
  },
});

export default withNavigation(EditAccountScreen);
