/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

Icon.loadFont();
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1,
    };
  }

  componentDidMount = () => {
    this.inicializeGame();
  };

  inicializeGame = () => {
    this.setState({
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1,
    });
  };

  checkDraw = () => {
    const num_tiles = 3;
    let arr = this.state.gameState;

    for (let i = 0; i < num_tiles; i++) {
      if (arr[0][i] === 0) {
        return 0;
      } else if (arr[1][i] === 0) {
        return 0;
      } else if (arr[2][i] === 0) {
        return 0;
      }
    }
    return 1;
  };

  // returns 1 if player 1 won, -1 if player 2 won, or a 0 if no one has won
  getWinner = () => {
    let sum;
    let NUM_TILES = 3;
    let arr = this.state.gameState;

    // Check rows...
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }
    // Check colums...
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }
    // Check the diagonals...
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }

    // there are no winners...
    return 0;
  };

  onTilePress = (row, col) => {
    // Don't allow tiles to change / no permite que las fichas cambien
    let value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }

    // Grab current player // Obtiene el jugador actual
    let currentPlayer = this.state.currentPlayer;

    // Set the correct tile...
    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({
      gameState: arr,
    });

    // Switch to other player...
    let nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({
      currentPlayer: nextPlayer,
    });

    // Check for winners...
    let winner = this.getWinner();
    if (winner === 1) {
      Alert.alert('Ganó NEMO!!');
      this.inicializeGame();
    } else if (winner === -1) {
      Alert.alert('Ganó El TIBURON!!');
      this.inicializeGame();
    }
    // Check Draw
    let draw = this.checkDraw();
    if (draw === 1) {
      Alert.alert('Empate!');
      this.inicializeGame();
    }
  };

  playAgain = () => {
    this.inicializeGame();
  };

  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Image source={require('./assets/nemo.png')} />
      case -1:
        return <Image source={require('./assets/orca.png')} />
      default:
        <View />;
    }
  };

  renderGamerCurrent = () => {
    let currentPlayer = this.state.currentPlayer;
    switch (currentPlayer) {
      case 1:
        return (
          <View style={styles.player}>
            {/* <Text style={styles.playerDuck}> Jugador 1 </Text> */}
            <Image source={require('./assets/nemo.png')} style={styles.playerNemo}  />
          </View>
        );
      case -1:
        return (
          <View style={styles.player}>
            {/* <Text style={styles.playerFish}> Jugador 2 </Text> */}
            <Image source={require('./assets/orca.png')} style={styles.playerOrca}/>
          </View>
        );
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('./assets/fondo.png')}
        style={styles.container}>

        <View style={styles.containerLogo}>
        <Image style={styles.logo}source={require('./assets/img2.png')} />
        </View>  
        
        <View style={styles.containerGameCurrent}>
          <Text style={styles.gamerCurrent}>Es el turno de</Text>
          {this.renderGamerCurrent()}
        </View>
        <View style={{padding: 15, borderRadius: 20, backgroundColor: '#FFFFFF' }}>
        <View style={{ padding: 15,backgroundColor: '#FFFFFF', boxShadow:'rgba(0, 0, 0, 0.25)', borderRadius: 20, borderStyle: 'dashed', borderColor:'#7997B5', borderWidth: 2}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 0)}
              style={[
                styles.tile,
                {
                  borderLeftWidth: 0,
                  borderTopWidth: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              {this.renderIcon(0, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 1)}
              style={[
                styles.tile,
                {
                  borderTopWidth: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              {this.renderIcon(0, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 2)}
              style={[
                styles.tile,
                {
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              {this.renderIcon(0, 2)}
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 0)}
              style={[
                styles.tile,
                {
                  borderLeftWidth: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              {this.renderIcon(1, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 1)}
              style={[
                styles.tile,
                {alignItems: 'center', justifyContent: 'center'},
              ]}>
              {this.renderIcon(1, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 2)}
              style={[
                styles.tile,
                {
                  borderRightWidth: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              {this.renderIcon(1, 2)}
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 0)}
              style={[
                styles.tile,
                {
                  borderLeftWidth: 0,
                  borderBottomWidth: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              {this.renderIcon(2, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 1)}
              style={[
                styles.tile,
                {
                  borderBottomWidth: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              {this.renderIcon(2, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 2)}
              style={[
                styles.tile,
                {
                  borderRightWidth: 0,
                  borderBottomWidth: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              {this.renderIcon(2, 2)}
            </TouchableOpacity>
          </View>
        </View>
        </View>

        <TouchableOpacity onPress={this.playAgain}>
          <Image style={styles.button} source={require('./assets/boton_start.png')} />
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogo:{
    display: 'flex',
    justifyContent: 'flex-start',
    width: '80%',
    marginBottom: 60,
  },
  logo:{
    width: 200,
    height: 60,
  },
 
  tile: {
    borderWidth: 1,
    width: 85,
    height: 75,
    borderColor: '#7997B5',
  },

  text: {
    fontSize: 20,
    textTransform: 'uppercase',
    color: 'black',
  },
  button: {
    marginTop: 85,
    alignItems: 'center',
    width: 150,
    height: 50
    
  },
  containerGameCurrent: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 85,
    alignItems: 'center',
    
  },
  gamerCurrent: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Vibur',
    color: '#198EA4',
  },
  player: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  },

  playerNemo: {
    width: 93,
    height:58,
  
  },
  playerOrca: {
    width: 105,
    height:60,
   
  },
 
});
