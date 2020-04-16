/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
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
      gameState:[[1,-1,0],[0,0,0],[0,0,0]]

    })
  }


  onTilePress = (row,col) => {
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

  }


  renderIcon = (row,col) => {
    let value= this.state.gameState[row][col];
    switch(value){
      case 1: return <Icon name='close' style={styles.tileX}/>;
      case -1: return <Icon name='circle-outline' style={styles.tileO}/>;
      default: <View/>
    }


  }


  render() {
    return (
      <View style={styles.container}>
          
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
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 5,
    width: 100,
    height: 100,

  },
  tileX: {
    color: 'red',
    fontSize: 60,
  },
  tileO: {
    color: 'green',
    fontSize: 60,
    
  }
});


