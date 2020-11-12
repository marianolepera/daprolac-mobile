import React, {Component} from 'react';
import {Button, View, StyleSheet} from 'react-native';

import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native-elements';
import constants from '../components/Constants';

class HomeScreen extends Component {
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
    return (
      <View>
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
            text: 'Daprolac',
            style: {fontSize: 20, fontWeight: '700', color: 'white'},
          }}
        />
        <View>
          <Text style={styles.headline} h4>
            Bienvenido {this.state.nombre}!
          </Text>
          <Text style={styles.submensaje}>
            Consulta si tienes tareas por realizar!
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headline: {
    textAlign: 'center',
    marginTop: 10,
    color: constants.PRIMARY_BG_COLOR,
  },
  submensaje: {
    textAlign: 'center',
    marginTop: 10,
    color: constants.PRIMARY_BG_COLOR,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
