/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



Icon.loadFont();
export default class App extends  React.Component {

  constructor(props){
    super(props);
    this.state = {
      gameState:[[0,0,0],[0,0,0],[0,0,0]],
      currentPlayer: 1
    }

  }

  componentDidMount = () => {
    this.inicializeGame();
  }

  inicializeGame = () => {
    this.setState({
      gameState:[[0,0,0],[0,0,0],[0,0,0]],
      currentPlayer: 1

    })
  }
  // returns 1 if player 1 won, -1 if player 2 won, or a 0 if no one has won
  getWinner = () => {
    let sum;
    let NUM_TILES= 3;
    let arr = this.state.gameState;

    // Check rows...
    for(let i=0; i < NUM_TILES; i++){
        sum = arr[i][0] + arr[i][1] + arr[i][2];
        if(sum === 3){ return 1}
        else if(sum === -3) { return -1};
    }
    // Check colums...
    for(let i=0; i < NUM_TILES; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if(sum === 3){ return 1}
      else if(sum === -3) { return -1};
    }
    // Check the diagonals...
    sum = arr[0][0] + arr[1][1] + arr[2][2];
      if(sum === 3){ return 1}
      else if(sum === -3) { return -1};

    sum = arr[2][0] + arr[1][1] + arr[0][2];
      if(sum === 3){ return 1}
      else if(sum === -3) { return -1};

    // there are no winners...
    return 0;  
    
  }

  onTilePress = (row,col) => {
    // Don't allow tiles to change / no permite que las fichas cambien
    let value = this.state.gameState[row][col];
    if(value !== 0) {return;}

    // Grab current player // Obtiene el jugador actual 
    let currentPlayer = this.state.currentPlayer;

    // Set the correct tile... 
    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({
      gameState:arr
    });

    // Switch to other player...
    let nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({
      currentPlayer: nextPlayer
    })

    // Check for winners... 
    let winner = this.getWinner();
    if(winner === 1){
      Alert.alert('El ganador es el jugador 1');
      this.inicializeGame();
    } else if (winner === -1){
      Alert.alert('El ganador es el jugador 2');
      this.inicializeGame();
    }

  }

  onNewGamePress = () => {
    this.inicializeGame();
  }


  renderIcon = (row,col) => {
    let value= this.state.gameState[row][col];
    switch(value){
      case 1: return <Icon name='duck' style={styles.tileX}/>;
      case -1: return <Icon name='fish' style={styles.tileO}/>;
      default: <View/>
    }


  }


  render() {
    return (
      <ImageBackground
            source={require("./assets/reactnative.jpg")}
            style={styles.container}>
      
        <View>  
        <View style={{flexDirection: 'row'}}>  
            <TouchableOpacity onPress={() => this.onTilePress(0,0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0,alignItems: 'center',justifyContent: 'center'}]}>
              {this.renderIcon(0,0)}
            </TouchableOpacity>  
            <TouchableOpacity onPress={() => this.onTilePress(0,1)} style={[styles.tile, { borderTopWidth: 0,alignItems: 'center',justifyContent: 'center'}]}>
              {this.renderIcon(0,1)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(0,2)} style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0, alignItems: 'center',justifyContent: 'center'}]}>
              {this.renderIcon(0,2)}
            </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>  
          <TouchableOpacity onPress={() => this.onTilePress(1,0)} style={[styles.tile, { borderLeftWidth: 0, alignItems: 'center',justifyContent: 'center'}]}>
            {this.renderIcon(1,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,1)} style={[styles.tile, { alignItems: 'center',justifyContent: 'center' }]}>
          {this.renderIcon(1,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,2)} style={[styles.tile, { borderRightWidth: 0, alignItems: 'center',justifyContent: 'center' }]}>
          {this.renderIcon(1,2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>  
          <TouchableOpacity onPress={() => this.onTilePress(2,0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0, alignItems: 'center',justifyContent: 'center'}]}>
             {this.renderIcon(2,0)}
          </TouchableOpacity>   
          <TouchableOpacity onPress={() => this.onTilePress(2,1)} style={[styles.tile, { borderBottomWidth: 0, alignItems: 'center',justifyContent: 'center'}]}>
            {this.renderIcon(2,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,2)} style={[styles.tile, { borderRightWidth:0, borderBottomWidth:0, alignItems: 'center',justifyContent: 'center' }]}>
            {this.renderIcon(2,2)}
          </TouchableOpacity>  
        </View>
        </View> 

        
        <TouchableOpacity style={styles.button} onPress={this.onNewGamePress}>
          <Text style={styles.text}> Reiniciar partida</Text>
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
  tile: {
    borderWidth: 3,
    width: 100,
    height: 100,
    borderColor: '#5BC0EB'

  },
  tileX: {
    color: '#F58F29',
    fontSize: 60,
  },
  tileO: {
    color: '#54F2F2',
    fontSize: 65,
    
  },
  reset:{
    marginTop: 80,
  },

  text: {
    fontSize: 20,
    textTransform: 'uppercase',
    color: 'black',
},
  button: {
    marginTop: 65,
    alignItems: 'center',
    backgroundColor: '#E8F1F2',
    padding: 15,

  },
});


