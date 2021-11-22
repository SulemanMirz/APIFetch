import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Button, TouchableOpacity, Linking, ToastAndroid } from 'react-native';

export default class App extends React.Component {
  state = {
    data: {'activity':'Loading...'}
  }

  getJsonData = () => {
    fetch('https://www.boredapi.com/api/activity/',
    {method: 'GET'}).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
        data: responseJson
      })
    })
    .catch((error) => {
      console.error(error)
    })
  }

  componentDidMount = () => {
    this.getJsonData()
  }

  webLinkCheck = (link) => {
    if(link != ''){
      Linking.openURL(link)
    }
    else{
      ToastAndroid.show("No link found", ToastAndroid.SHORT);
      this.setState({
        data: 'no link found'
      })
      return 
    }
  }

  render(){
    return (
      <>
      <View style={styles.container} color='#288ba8'>

          <View style={styles.backGround}>
            <Text style={{fontSize: 40}} >What to do when you're bored!</Text>
          </View>

          <View >
            <Text style={{ margin: 10, fontSize: 16 }}>Suggestion:</Text>
            <Text style={{ margin: 10, fontSize: 22 }} selectable={true}>{this.state.data['activity']}</Text>
            <TouchableOpacity style={{ padding: 20, flexDirection: 'row' }}>
              <Text>Link: </Text>
              <Text style={{ color: 'blue' }} onPress={() => this.webLinkCheck(this.state.data['link'])}>{this.state.data['link']}</Text>
            </TouchableOpacity>
            <Text style={{ margin: 10, fontSize: 16 }}>{'People required: ' + this.state.data['participants']}</Text>
            <Text style={{ margin: 10, fontSize: 16 }}>{'How much it will cost you: ' + this.state.data['price']}</Text>
            <Text style={{ margin: 10, fontSize: 16 }}>{'Type: ' + this.state.data['type']}</Text>
            <StatusBar style="auto" />
          </View>

          <View style={{ position: 'absolute', bottom: 50, start: '10%', width: '80%' }}>
            <Button style={{position: 'center', borderRadius: 10}} onPress={this.getJsonData} title='Next' />
          </View>
        </View></>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    // margin: 20,
    flex: 1,
    backgroundColor: '#ffce30',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backGround: {
    backgroundColor: '#fff',
    marginTop: '10%',
    padding: 20, 
    // borderWidth: 3,
    // borderColor:'#000', 
    borderRadius: 50, 
    marginEnd: '5%',
    marginStart: '5%', 
    marginBottom: '10%'
  }
});
