import React, {Component} from 'react';
import {View} from 'react-native';

import {withNavigation} from 'react-navigation';

class ValidationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      nombre: '',
      apellido: '',
      email: '',
      tipo: '',
    };
  }

  componentDidMount = async () => {
    this.props.goDrawer();
  };

  render() {
    return <View></View>;
  }
}

export default withNavigation(ValidationScreen);
