import React,{Component} from 'react';
import {
  ImageBackground,
  SafeAreaView,StyleSheet,Dimensions,FlatList,TextInput,AsyncStorage,Alert} from 'react-native';
  import { Container, Header, Content, Item, Input, Button,Text, View,Thumbnail, Card,Form,Label,CardItem, ActionSheet} from 'native-base';
  import * as Font from 'expo-font';
  import ValidationComponent from 'react-native-form-validator';
  import { Ionicons } from '@expo/vector-icons';
  'use strict';
 // import {Actions} from 'react-native-router-flux';
  const { width: screenWidth } = Dimensions.get('window');
  var STORAGE_KEY = 'id_token';
 
export default class Signuppage extends ValidationComponent {
    constructor(props){
        super(props);
      this.state = {email:"",pass:'',username:'',num:'',usn:''};
    }  

    state = {
      loading: true,
    }
onSignupPress=async()=>{


  var checkedforvalidation=this.validate({
    email: {email: true,required:true},
    pass:{minlength:8,required: true,},
   username: {minlength:3, maxlength:15, required: true},
    num: {numbers: true,required: true},
    usn:{required: true,minlength:10,maxlength:10}
  });
  if(checkedforvalidation) {
    /*
    fetch("http://192.168.225.238:3001/users", {
      method: "POST", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.usn, 
        password: this.state.pass, 
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this._onValueChange(STORAGE_KEY, responseData.id_token),
      Alert.alert(
        "Signup Success!",
        "Click the button to get a Chuck Norris quote!"
      )
    })
    .done();*/
    console.log(this.state.usn,this.state.pass,this.state.num,this.state.email,this.state.username);
    fetch("http://192.168.43.19:3001/signup",{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "usn":this.state.usn,
        "pass":this.state.pass,
        "email":this.state.email,
        "num":this.state.num,
        "username":this.state.username
      })
    })
    .then(res=>res.json())
    .then(async (data)=>{
      console.log(data)
      try {
      await  AsyncStorage.setItem('token',data.token)
      } catch (error) {
        console.log('AsyncStorage error: ',error.message);
      }
    })
  }
  }
  /*
  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ',error.message);
    }
  }*/
      async componentDidMount() {
        await Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        })
        this.setState({ loading: false })
      }
    /*  onloginpress=()=>{
        Actions.Authentication();
      }*/
    render(){
    if (this.state.loading){
        return (
            <Container></Container>
          );
    }
        return(
            <Container style={styles.screen}>
              <Content>
      <Card style={styles.card}>
       <CardItem style={{backgroundColor:'#0E043B'}}></CardItem>
        <Thumbnail  source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fs.cdpn.io%2F69263%2Fprofile%2Fprofile-512.jpg%3F2&f=1&nofb=1' }} style={styles.logo} circular/>
        <Form  ref="form"  >
            
              <Item floatingLabel>
                    <Label style={styles.fieldtitle} >Username</Label>
                    <Input style={styles.fieldinput} onChangeText={(username) => this.setState({username})} value={this.state.username}  />
                    {this.isFieldInError('username') && this.getErrorsInField('username').map(errorMessage => <Text>{errorMessage}</Text>) }
                  </Item>
                
                  <Item floatingLabel>
                    <Label style={styles.fieldtitle} >Email Address</Label>
                    <Input style={styles.fieldinput} onChangeText={(email) => this.setState({email})} value={this.state.email}  />
                    {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text>{errorMessage}</Text>) }
                  </Item>
                  
                  <Item floatingLabel>
                    <Label style={styles.fieldtitle} >University Seat Number</Label>
                    <Input style={styles.fieldinput} onChangeText={(usn) => this.setState({usn})} value={this.state.usn}  />
                    {this.isFieldInError('usn') && this.getErrorsInField('usn').map(errorMessage => <Text>{errorMessage}</Text>) }
                  </Item>
               
                  <Item floatingLabel>
                    <Label style={styles.fieldtitle} >Phone Number</Label>
                    <Input style={styles.fieldinput} onChangeText={(num) => this.setState({num})} value={this.state.num}  />
                    {this.isFieldInError('num') && this.getErrorsInField('num').map(errorMessage => <Text>{errorMessage}</Text>) }
               </Item>
                  <Item  floatingLabel>
                    <Label style={styles.fieldtitle}>Password</Label>
                    <Input style={styles.fieldinput}onChangeText={(pass) => this.setState({pass})} value={this.state.pass}  />
                    {this.isFieldInError('pass') && this.getErrorsInField('pass').map(errorMessage => <Text>{errorMessage}</Text>) }
                  </Item>
                  <Text style={styles.fieldinput}>
            {this.getErrorMessages()}
          </Text>
                  <Item stackedLabel style={styles.submission}>
                    <Button style={styles.submit}  onPress={this.onSignupPress} ><Text style={styles.submittext}>sign up</Text></Button>
                  </Item>
                  <Item stackedLabel style={styles.submission}>
                    <Button style={styles.submit} /*onPress={this.onloginpress}  */><Text style={styles.submittext}>SIGN IN</Text></Button>
                  </Item>
              </Form>
              </Card>
              </Content>
            </Container>
        );
}
}
 
const styles = StyleSheet.create({
  screen: {
  flex:1,
  justifyContent:'center',
  backgroundColor:'#0E043B',
  textAlign:'center',
  },
  logo:{
      width:200,
      height:200,
      alignSelf:"center",
  },
  card:{
    marginTop:10,
    backgroundColor:'#0E043B'
  },
  fieldtitle:{
    color:'white',
  },
  fieldinput:{
    color:'white'
  },
  submission:{
    marginTop:15,
    borderColor:null,
  },
  submit:{
backgroundColor:'#5F7',
borderRadius:26,
width:170,
justifyContent:'center'
  },
  submittext:{
color:'black',
textTransform:'capitalize',
  }
});

