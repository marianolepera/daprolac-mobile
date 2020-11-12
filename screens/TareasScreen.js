import React, {Component} from 'react';
import {
  Button,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  SectionList,
} from 'react-native';
import {Header, ListItem, Text} from 'react-native-elements';
import constants from '../components/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {Searchbar} from 'react-native-paper';
import format from 'date-fns/format';
import {parseISO} from 'date-fns';
import {Container, Content, Separator} from 'native-base';

console.disableYellowBox = true;

class TareasScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.idTodo,
      loading: true,
      dataOrdenes: [],
      memory: [],
      error: null,
      value: '',
      ordenes: [],
      refreshing: false,
      tareasCompletadas: [],
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    const url = 'https://daprolac.herokuapp.com/api/v1/ordenes/?eager=1';
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          //NO BORRAR
          dataOrdenes: this.findOrdenesById(responseJson.payload),
          // tareasCompletadas: this.findOrdenesTareasCompletadasById(
          //   responseJson.payload,
          // ),
          //dataOrdenes: responseJson.payload,
          memory: this.findOrdenesById(responseJson.payload),
          loading: false,
        });
        this.arrayholder = responseJson.payload;
      })
      .catch(error => {
        console.error(error.response);
      });
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    const url = 'https://daprolac.herokuapp.com/api/v1/ordenes/?eager=1';
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          refreshing: false,
          dataOrdenes: this.findOrdenesById(responseJson.payload),
          // tareasCompletadas: this.findOrdenesTareasCompletadasById(
          //   responseJson.payload,
          // ),
          memory: this.findOrdenesById(responseJson.payload),
          loading: false,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  //NO BORRAR
  findOrdenesById(ordenes) {
    var ordenesById = [];
    var tareaObjeto = {};

    ordenes.map(orden => {
      orden.tareas.map(tarea => {
        if (tarea.idUsuario == 621) {
          orden.proceso.tareas.map(t => {
            if (tarea.idTarea == t.id && tarea.fechaFin == null) {
              tareaObjeto = {
                id: t.id,
                nombre: t.nombre,
                idOrden: orden.id,
                proceso_tarea: t.proceso_tarea,
                observaciones: t.observaciones,
                fechaInicia: tarea.fechaInicia,
                fechaFin: tarea.fechaFin,
                fechaIniciaProp: tarea.fechaIniciaProp,
                datos: t.datos,
                datos_tareas: tarea.datos,
              };
              ordenesById.push(tareaObjeto);
            }
          });
        }
      });
    });
    ordenesById = ordenesById.sort(
      (a, b) => a.fechaIniciaProp > b.fechaIniciaProp,
    );

    return ordenesById;
  }

  // findOrdenesTareasCompletadasById(ordenes) {
  //   var ordenesTareasCompletadasById = [];
  //   var tareaObjeto = {};

  //   ordenes.map(orden => {
  //     orden.tareas.map(tarea => {
  //       if (tarea.idUsuario == 621) {
  //         orden.proceso.tareas.map(t => {
  //           if (tarea.idTarea == t.id && tarea.fechaFin != null) {
  //             tareaObjeto = {
  //               id: t.id,
  //               nombre: t.nombre,
  //               idOrden: orden.id,
  //               observaciones: t.observaciones,
  //               proceso_tarea: t.proceso_tarea,
  //               fechaInicia: tarea.fechaInicia,
  //               fechaFin: tarea.fechaFin,
  //               fechaIniciaProp: tarea.fechaIniciaProp,
  //               datos: t.datos,
  //               datos_tareas: tarea.datos,
  //             };
  //             ordenesTareasCompletadasById.push(tareaObjeto);
  //           }
  //         });
  //       }
  //     });
  //   });
  //   ordenesTareasCompletadasById = ordenesTareasCompletadasById.sort(
  //     (a, b) => a.fechaIniciaProp > b.fechaIniciaProp,
  //   );

  //   return ordenesTareasCompletadasById;
  // }

  renderTarea(item) {
    // item.datos.map(dato => {
    //   console.log(dato.nombre);
    // });

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('detalleTarea', {
            DetalleTarea: item,
            tarea: this.state.dataOrdenes,
            //tarea: tarea,
          });
        }}
        //onPress={() => this.props.onPressDetalle(item)}
      >
        {/* <Separator bordered style={{color: 'red'}}>
          <Text>{item.idOrden}</Text>
        </Separator> */}

        <ListItem
          style={{
            borderWidth: 1,
            borderRadius: 5,
            width: '95%',
            marginLeft: 10,
            marginTop: 10,
          }}
          bottomDivider>
          <Icon2 size={20} name="tasks" />

          <ListItem.Content>
            <ListItem.Title>
              {/* Id Tarea: {item.id} */}
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {item.nombre}
              </Text>
            </ListItem.Title>
            <ListItem.Subtitle>
              fecha:
              {format(parseISO(item.fechaIniciaProp), 'dd/MM/yyyy kk:mm:ss')}
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    );
  }

  // renderTareaCompletada(item) {
  //   // item.datos.map(dato => {
  //   //   console.log(dato.nombre);
  //   // });

  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         this.props.navigation.navigate('detalleTarea', {
  //           DetalleTarea: item,
  //           //tarea: tarea,
  //         });
  //       }}
  //       //onPress={() => this.props.onPressDetalle(item)}
  //     >
  //       {/* <Separator bordered style={{color: 'red'}}>
  //         <Text>{item.idOrden}</Text>
  //       </Separator> */}

  //       <ListItem
  //         style={{
  //           borderWidth: 1,
  //           borderRadius: 5,
  //           width: '95%',
  //           marginLeft: 10,
  //           marginTop: 10,
  //         }}
  //         bottomDivider>
  //         <Icon2 size={20} name="check" />

  //         <ListItem.Content>
  //           <ListItem.Title>
  //             {/* Id Tarea: {item.id} */}
  //             <Text style={{fontSize: 20, fontWeight: 'bold'}}>
  //               {item.nombre}
  //             </Text>
  //           </ListItem.Title>
  //           <ListItem.Subtitle>
  //             fecha:
  //             {format(parseISO(item.fechaIniciaProp), 'dd/MM/yyyy kk:mm:ss')}
  //             {/* {new Date(item.fechaIniciaProp).toLocaleString()} */}
  //           </ListItem.Subtitle>
  //         </ListItem.Content>
  //         <ListItem.Chevron />
  //       </ListItem>
  //     </TouchableOpacity>
  //   );
  // }

  searchTarea = value => {
    const filterDeDataOrdenes = this.state.memory.filter(dataOrdenes => {
      let dataOrdenesLowercase = dataOrdenes.nombre.toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return dataOrdenesLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({dataOrdenes: filterDeDataOrdenes});
    this.setState({value});
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{paddingTop: 100}}>
          <ActivityIndicator size="large" color={constants.PRIMARY_BG_COLOR} />
        </View>
      );
    }
    {
      return (
        <View style={{backgroundColor: 'white'}}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }>
            <Header
              backgroundColor={constants.PRIMARY_BG_COLOR}
              containerStyle={{paddingTop: 25, paddingBottom: 10, height: 80}}
              leftComponent={
                <Icon.Button
                  name="menu"
                  size={27}
                  color="white"
                  backgroundColor={constants.PRIMARY_BG_COLOR}
                  onPress={() => this.props.navigation.openDrawer()}
                  //onPress={() => this.props.openDrawer()}
                />
              }
              centerComponent={{
                text: 'Daprolac',
                style: {fontSize: 20, fontWeight: '700', color: 'white'},
              }}
              centerComponent={
                <Searchbar
                  placeholder="Buscar Tarea..."
                  style={{
                    backgroundColor: 'white',
                    width: 250,
                    height: 40,
                    borderRadius: 50,
                    paddingTop: 1,
                    size: 60,
                  }}
                  onChangeText={value => this.searchTarea(value)}
                  value={this.state.value}
                />
              }
            />
            <Text style={styles.headline} h4>
              Lista de tareas
            </Text>
            <FlatList
              data={this.state.dataOrdenes}
              numColumns={1}
              renderItem={({item}) => this.renderTarea(item)}
              keyExtractor={(item, index) => index.toString()}
            />
            {/* <Text style={styles.headline} h4>
              Lista de tareas Completadas
            </Text>
            <FlatList
              data={this.state.tareasCompletadas}
              numColumns={1}
              renderItem={({item}) => this.renderTareaCompletada(item)}
              keyExtractor={(item, index) => index.toString()}
            /> */}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  headline: {
    marginTop: 10,
    marginLeft: 20,
    color: constants.PRIMARY_BG_COLOR,
  },
  SectionHeaderStyle: {
    backgroundColor: '#CDDC89',
    fontSize: 20,
    padding: 5,
    color: '#fff',
  },
});

export default TareasScreen;
