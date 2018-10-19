import React from 'react';

import {ARScreen} from './src/screens/ARScreeen';
import { MapScreen } from './src/screens/MapScreen';

const MODES = {
  MAP: 'map',
  AR: 'ar',
};

export default class App extends React.Component {
    constructor( props ) {
      super(props)

      this.state = {
        actualMode: MODES.MAP,
      }
    }

  render() {
    if (this.state.actualMode === MODES.MAP) {
      return (
        <MapScreen
          onSwitch={() => this.setState({ actualMode: MODES.AR })}
        />
      );
    }

    return (
      <ARScreen
        onSwitch={() => this.setState({ actualMode: MODES.MAP })}
      />
    );
  }
}


