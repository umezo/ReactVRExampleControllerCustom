//@flow
/**
 * This example gathers input from gamepad devices. It displays a set of button
 * states for each connected controller, using the number of buttons and axes
 * from each controller to display their current positions.
 *
 * This demonstrates how to gather gamepad input, as well as determine which
 * gamepads are connected and listen to connect / disconnect events.
 */

import React from 'react';
import {AppRegistry, asset, Pano, View, Sphere} from 'react-vr';

class ControllerDemo extends React.Component {
  state: {
    wired: boolean,
    deg: number
  };
  intervalId: number;

  constructor() {
    super();

    this.state = {
      wired: false,
      deg: 0,
    };
  }

  render() {
    const rotate = this.state.deg;

    return (
      <View style={{layoutOrigin: [0.5, 0.5]}}>
        <Pano source={asset('chess-world.jpg')} />
        <Sphere
          radius={0.5}
          widthSegments={20}
          heightSegments={12}

          style={{
            color: '#aac',
            layoutOrigin: [0.5, 0.5],
            transform: [
              {translate: [0, 1, 0] },
              {rotateY: rotate},
            ],
          }}
          onEnter={this.onEnter.bind(this)}
          onExit={this.onExit.bind(this)}
          wireframe={this.state.wired}
        />
      </View>
    );
  }

  componentDidMount () {
    if(this.intervalId){
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval((function(){
      this.setState({deg: this.state.deg + 1});
    }).bind(this), 1000 / 30);
  }

  onEnter(e: any) {
    this.setState({wired: true});
  }

  onExit(e: any) {
    this.setState({wired: false});
  }
}

AppRegistry.registerComponent('ControllerDemo', () => ControllerDemo);
