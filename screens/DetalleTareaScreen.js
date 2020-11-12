import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, RefreshControl} from 'react-native';

import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native-elements';
import constants from '../components/Constants';
import Button from '../components/Button';
import {ScrollView} from 'react-native-gesture-handler';
import TextInput from '../components/TextInput';
import moment from 'moment';
import axios from 'axios';
import Loader from '../components/loader';
import AwesomeAlert from 'react-native-awesome-alerts';

class DetalleTareaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fechaInicia: moment().format('YYYY-MM-DD, h:mm:ss a'),
      fechaFin: moment().format('YYYY-MM-DD, h:mm:ss a'),
      disabled: false,
      tareaDisabled: false,
      valor: '',
      isLoading: false,
      valorAgregado: false,
      orden: this.props.navigation.getParam('DetalleTarea'),
      ordenTareaAnterior: this.props.navigation.getParam('tarea'),
      editVisibles: {},
      showAlert: false,
    };
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  showEditDiv = id => {
    this.setState(prevState => ({
      editVisibles: {
        ...prevState.editVisibles,
        [id]: !prevState.editVisibles[id],
      },
    }));
  };

  iniciarTarea(idOrden, idTarea, idUsuario) {
    var ordenNueva = this.state.orden;
    ordenNueva.fechaInicia = this.state.fechaInicia;
    const orden = {
      tareas: [
        {
          idTarea: idTarea,
          idUsuario: idUsuario,
          fechaInicia: this.state.fechaInicia,
        },
      ],
    };

    axios
      .put(
        'https://daprolac.herokuapp.com/api/v1/ordenes/' + idOrden + '?eager=1',
        orden,
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({orden: ordenNueva});
        this.setState({isLoading: false});
        alert('se inicio la tarea');
        // <AwesomeAlert
        //   show={this.state.showAlert}
        //   showProgress={false}
        //   title="AwesomeAlert"
        //   message="se inicio la tarea!"
        //   closeOnTouchOutside={true}
        //   closeOnHardwareBackPress={false}
        //   showCancelButton={false}
        //   showConfirmButton={true}
        //   confirmText="ok"
        //   confirmButtonColor="#DD6B55"
        //   onConfirmPressed={() => {
        //     this.hideAlert();
        //   }}
        // />;
        //this.props.navigation.push('detalleTarea');
      })
      .catch(error => {
        console.log(error.response);
        this.setState({isLoading: false});
        alert('hubo un error');
      });

    console.log(orden);
  }

  completarValor(index, idTarea, idOrden, idUsuario, idDato) {
    var ordenNueva = this.state.orden;
    ordenNueva.datos_tareas[index].valor = this.state.valor;
    const orden = {
      tareas: [
        {
          idTarea: idTarea,
          idUsuario: idUsuario,
          datos: [
            {
              idDato: idDato,
              valor: this.state.valor,
            },
          ],
        },
      ],
    };
    axios
      .put(
        'https://daprolac.herokuapp.com/api/v1/ordenes/' + idOrden + '?eager=1',
        orden,
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({orden: ordenNueva});
        this.setState({isLoading: false});
        alert('se completo el valor');
      })
      .catch(error => {
        console.log(error.response);
        this.setState({isLoading: false});
        alert('hubo un error');
      });
    console.log(orden);
  }

  chequearEstado(fechaInicia) {
    // this.state.ordenTareaAnterior.map(ota => {
    //   if (ota.proceso_tarea.idTareaAntecesora == this.state.orden.id) {
    //     if (this.state.orden.fechaFin == null) {
    //       console.log(
    //         'no puede iniciar esta tarea, sin finalizar la antecesora',
    //       );
    //       return (this.state.disabled = true);
    //     }
    //   }
    // });
    if (fechaInicia != null) {
      console.log('desactive el boton');
      return (this.state.disabled = true);
    } else {
      console.log('no desactive el boton');
      return (this.state.disabled = false);
    }
  }

  bloquearInput(fechaInicia) {
    if (fechaInicia == null) {
      console.log('desactive el input');
      return (this.state.disabled = true);
    } else {
      console.log('active el input');
      return (this.state.disabled = false);
    }
  }

  chequearTareas(fechaInicia, orden) {
    var arrayDedatosincompletos = [];
    if (fechaInicia == null) {
      console.log('desactive el boton finalizar');
      return (this.state.tareaDisabled = true);
    }
    orden.datos_tareas.map(dt => {
      orden.datos.map(dato => {
        if (
          dt.idDato == dato.id &&
          dt.valor == null &&
          dato.tarea_dato.obligatorio == true
        ) {
          console.log(dato.nombre + ' quedo sin asignar valor');
          arrayDedatosincompletos.push(dato.nombre);
        }
      });
    });

    if (arrayDedatosincompletos.length > 0) {
      return (this.state.tareaDisabled = true);
    }
  }

  finalizarTarea(idOrden, idTarea, idUsuario) {
    var ordenNueva = this.state.orden;
    ordenNueva.fechaFin = this.state.fechaFin;
    const orden = {
      tareas: [
        {
          idTarea: idTarea,
          idUsuario: idUsuario,
          fechaFin: this.state.fechaFin,
        },
      ],
    };

    axios
      .put(
        'https://daprolac.herokuapp.com/api/v1/ordenes/' + idOrden + '?eager=1',
        orden,
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({orden: ordenNueva});
        this.setState({isLoading: false});
        alert('se finalizo la tarea');
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log(error.response);
        this.setState({isLoading: false});
        alert('hubo un error');
      });

    console.log(orden);
  }

  render() {
    //const orden = this.props.navigation.getParam('DetalleTarea');
    // const tarea = this.props.navigation.getParam('tarea');
    const idUsuario = 621;

    return (
      <View>
        <ScrollView>
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
              text: 'Tarea',
              style: {fontSize: 20, fontWeight: '700', color: 'white'},
            }}
          />

          <Text style={styles.headline} h3>
            {this.state.orden.nombre}
          </Text>
          <Text style={styles.headline}>{this.state.orden.observaciones}</Text>

          <Text style={styles.headline}> id tarea: {this.state.orden.id}</Text>
          {/* <Text h4> id this.state.orden: {tarea.idthis.state.orden}</Text> */}
          {this.state.isLoading && <Loader />}
          {this.state.orden.fechaFin == null ? (
            <View>
              <Button
                style={{
                  alignSelf: 'center',
                  width: '60%',
                }}
                mode="contained"
                disabled={this.chequearEstado(this.state.orden.fechaInicia)}
                onPress={() =>
                  this.iniciarTarea(
                    this.state.orden.idOrden,
                    this.state.orden.id,
                    idUsuario,
                  )
                }>
                iniciar tarea
              </Button>
              {this.state.orden.fechaInicia != null ? (
                <Text
                  style={{
                    color: constants.PRIMARY_BG_COLOR,
                    textAlign: 'center',
                  }}>
                  Comenzo La tarea!
                </Text>
              ) : null}
            </View>
          ) : null}

          <View>
            {this.state.orden.datos_tareas.map((dt, index) => (
              <View
                style={{
                  borderWidth: 1,
                  marginTop: 10,
                  marginLeft: 10,
                  marginRight: 10,
                }}
                key={index}>
                {this.state.orden.datos.map((dato, i) => (
                  <View key={i}>
                    {dt.idDato == dato.id ? (
                      <View>
                        <Text style={styles.datoText} h4>
                          {dato.nombre}
                        </Text>
                        {/* <Text style={styles.datoText} h4>
                          {dato.id}
                        </Text> */}
                        <Text style={styles.datoText} h4>
                          {dato.unidadMedida}
                        </Text>
                        {/* <Text style={styles.datoText} h4>
                          {dato.tipo}
                        </Text> */}
                        {dato.tipo == 'numero' ? (
                          <View>
                            <Text style={styles.datoText} h4>
                              min. {dato.minimo}
                            </Text>
                            <Text style={styles.datoText} h4>
                              max. {dato.maximo}
                            </Text>
                          </View>
                        ) : null}
                        {dato.tipo == 'opcion' ? (
                          <View>
                            {dato.opciones.map((opcion, i) => (
                              <View key={i}>
                                <Text style={styles.datoText} h4>
                                  {opcion.valor}
                                </Text>
                              </View>
                            ))}
                          </View>
                        ) : null}

                        {dato.tarea_dato.obligatorio == true ? (
                          <View>
                            <Text style={styles.datoText} h4>
                              El dato es obligatorio
                            </Text>
                          </View>
                        ) : (
                          <View>
                            <Text style={styles.datoText} h4>
                              El dato no es obligatorio
                            </Text>
                          </View>
                        )}
                        {/* {dato.tipo == 'numero' ? (
                          <TextInput
                            style={{
                              width: '60%',
                              textAlign: 'center',
                              justifyContent: 'center',
                              marginLeft: '20%',
                            }}
                            label="Ingrese valor"
                            returnKeyType="next"
                            error={false}
                            errorText={''}
                            disabled={this.bloquearInput(
                              this.state.orden.fechaInicia,
                            )}
                            onChangeText={valor => this.setState({valor})}
                            value={this.state.valor}
                            autoCapitalize="none"
                            keyboardType="numeric"
                          />
                        ) : (
                          <TextInput
                            style={{
                              width: '60%',
                              textAlign: 'center',
                              justifyContent: 'center',
                              marginLeft: '20%',
                            }}
                            label="Ingrese valor"
                            returnKeyType="next"
                            error={false}
                            errorText={''}
                            disabled={this.bloquearInput(
                              this.state.orden.fechaInicia,
                            )}
                            onChangeText={valor => this.setState({valor})}
                            value={this.state.valor}
                            autoCapitalize="none"
                          />
                        )} */}

                        <Text style={{textAlign: 'center'}} h4>
                          {dt.valor}
                        </Text>
                        {this.state.orden.fechaFin == null ? (
                          <View>
                            {this.state.editVisibles[dt.idDato] ? (
                              <View>
                                {dato.tipo == 'numero' ? (
                                  <TextInput
                                    style={{
                                      width: '60%',
                                      textAlign: 'center',
                                      justifyContent: 'center',
                                      marginLeft: '20%',
                                    }}
                                    label="Ingrese valor"
                                    returnKeyType="next"
                                    error={false}
                                    errorText={''}
                                    disabled={this.bloquearInput(
                                      this.state.orden.fechaInicia,
                                    )}
                                    onChangeText={valor =>
                                      this.setState({valor})
                                    }
                                    value={this.state.valor}
                                    autoCapitalize="none"
                                    keyboardType="numeric"
                                  />
                                ) : (
                                  <TextInput
                                    style={{
                                      width: '60%',
                                      textAlign: 'center',
                                      justifyContent: 'center',
                                      marginLeft: '20%',
                                    }}
                                    label="Ingrese valor"
                                    returnKeyType="next"
                                    error={false}
                                    errorText={''}
                                    disabled={this.bloquearInput(
                                      this.state.orden.fechaInicia,
                                    )}
                                    onChangeText={valor =>
                                      this.setState({valor})
                                    }
                                    value={this.state.valor}
                                    autoCapitalize="none"
                                  />
                                )}

                                <View style={{flex: 1, flexDirection: 'row'}}>
                                  <Button
                                    style={{
                                      width: '45%',
                                      marginLeft: 15,
                                      alignSelf: 'center',
                                    }}
                                    mode="contained"
                                    onPress={() =>
                                      this.completarValor(
                                        index,
                                        // orden,

                                        this.state.orden.id,
                                        this.state.orden.idOrden,
                                        idUsuario,
                                        dato.id,
                                      )
                                    }>
                                    Ingresar
                                  </Button>
                                  <Button
                                    style={{
                                      width: '45%',
                                      marginLeft: 4,
                                      alignSelf: 'center',
                                    }}
                                    mode="contained"
                                    onPress={() => this.showEditDiv(dt.idDato)}>
                                    Cancelar
                                  </Button>
                                </View>
                              </View>
                            ) : (
                              <Button
                                style={{
                                  alignSelf: 'center',
                                  width: '50%',
                                }}
                                mode="contained"
                                onPress={() => this.showEditDiv(dt.idDato)}>
                                Ingresar Valor
                              </Button>
                            )}
                          </View>
                        ) : null}
                      </View>
                    ) : null}
                  </View>
                ))}
              </View>
            ))}

            {this.state.orden.datos_tareas.map(dt => (
              <View>
                {this.state.orden.datos.map(dato => (
                  <View>
                    {dt.idDato == dato.id &&
                    dt.valor == null &&
                    dato.tarea_dato.obligatorio == true &&
                    this.state.orden.fechaInicia != null ? (
                      <View>
                        <Text
                          style={{
                            fontSize: 20,
                            color: constants.PRIMARY_BG_COLOR,
                          }}>
                          {' '}
                          El Dato {dato.nombre} quedo sin asignar
                        </Text>
                      </View>
                    ) : null}
                  </View>
                ))}
              </View>
            ))}

            {this.state.orden.fechaFin == null ? (
              <Button
                style={{
                  alignSelf: 'center',
                  width: '60%',
                }}
                mode="contained"
                disabled={this.chequearTareas(
                  this.state.orden.fechaInicia,
                  this.state.orden,
                )}
                onPress={() =>
                  this.finalizarTarea(
                    this.state.orden.idOrden,
                    this.state.orden.id,
                    idUsuario,
                  )
                }>
                finalizar tarea
              </Button>
            ) : null}
          </View>
          <Text></Text>
        </ScrollView>
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
  datoText: {
    textAlign: 'center',
  },
});

export default DetalleTareaScreen;
