/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import _ from 'lodash'
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class PhotoTagging extends Component {

  constructor(props){
  	super(props);
  	this.state = {
      isSearchText:false,
      tagList:[],
      userList:[],
    };
    this.top = ''
    this.left = ''
  }

  componentDidMount() {
    this.setState({userList:[
        {
          id:1,
          name:'Mariko Timothy'
        },
        {
          id:2,
          name:'Eldora Seaton '
        },
        {
          id:3,
          name:'Toshia Ellisor '
        },
        {
          id:4,
          name:'Carie Bethune'
        },
        {
         id:5,
          name:'Tomoko Jacobi'
        },
        {
          id:6,
          name:'Janett Reiling '
        },
        {
          id:7,
          name:'Tomoko Jacobi  '
        },
        {
          id:8,
          name:'Willene Recio'
        },
        {
          id:9,
          name:'Emilie Smolka'
        },
        {
          id:10,
          name:'Wallace Mallon'
        },
        {
          id:11,
          name:'Rosamond Levitan'
        },
        {
          id:12,
          name:'Arletha Frost'
        },
        {
          id:13,
          name:'Elza Cusson '
        },
        {
          id:14,
          name:'Sybil Menz'
        },
        {
          id:15,
          name:'Hannah Jeffrey '
        },
        {
          id:16,
          name:'Raylene Upchurch'
        },
        {
          id:17,
          name:'Jewel Rieger'
        },
        {
          id:18,
          name:'Bee Lauber'
        },
        {
          id:19,
          name:'Forrest Aliff '
        },
        {
          id:20,
          name:'Apryl Kelch '
        },
        {
          id:21,
          name:'Danilo Grass'
        },
        {
          id:22,
          name:'Karol Sickles'
        },
        {
          id:23,
          name:'Georgetta Davila'
        },
        {
          id:24,
          name:'Syreeta Mceuen'
        },
        {
          id:25,
          name:'Hillary Antos'
        },
        {
          id:26,
          name:'Lacresha Grosvenor'
        },
        {
          id:27,
          name:'Genevive Horn  '
        },
        {
          id:28,
          name:'Hyacinth Wiegand '
        },
        {
          id:29,
          name:'Idell Lesesne '
        },
        {
          id:30,
          name:'Elida Summy  '
        },

      ]
    }
   )
  }

  handlePress(evt){
    this.top = (evt.nativeEvent.locationY*100)/screenHeight;
    this.left = (evt.nativeEvent.locationX*100)/screenWidth;

    setTimeout(()=>{
      this.setState({
        isSearchText:true
      })
    },100)

  }

  tagUser(user){
    let newView = {
      locationX:this.left,
      locationY:this.top,
      name:user.name,
      id:user.id
    }
    this.setState({
        isSearchText:false,
        tagList: this.state.tagList.concat([newView])
      })
     console.log("===tagList==",this.state.tagList)
  }

  removeUser(user){
    let tempUser = this.state.tagList;
    let index =  _.findIndex(tempUser, function(o) { return o.id == user.id });
    tempUser.splice(index, 1);
    this.setState({tagList: tempUser });

  }

  dynamicStyle(data){

    let left = (screenWidth * data.locationX)/100;
    let top =  (screenHeight * data.locationY)/100;

    return {
      position:'absolute',
      top:top,
      left:left-22,
      justifyContent:'center'
    }
  }

  render() {
    return (
      <View style={styles.container} >
        {
          this.state.isSearchText && (
            <View style={styles.userSearch}>
              <View style={styles.searchContainer}>
                <Image source={require('../assets/images/search.png')}  style={styles.searchIconStyle}/>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Search for a User"
                />
                <Image source={require('../assets/images/close.png')} style={styles.closeIconStyle} />
              </View>
              <ScrollView>
              {
                this.state.userList.map(user=>(
                    <TouchableOpacity
                       key={user.id}
                       onPress={()=>{this.tagUser(user)}}
                    >
                      <View  style={styles.userList}>
                          <Text style={styles.userListText}>{user.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                )
              }
              </ScrollView>
            </View>
            )
        }

        <View style={styles.imageContainer}>
          <TouchableWithoutFeedback onPress={(evt) => this.handlePress(evt) } disabled={this.state.isSearchText}>
            <Image
              style={styles.imageStyle}
              source={require('../assets/images/photo.jpg')}
            />
          </TouchableWithoutFeedback>
        </View>
        {
          this.state.tagList.map(list=>
            (
              <View key={list.id} style={this.dynamicStyle(list)}>
                <View style={styles.tagTriangle}>
                </View>
                <View style={styles.tagUserView}>
                  <Text style={styles.tagListText}> {list.name} </Text>
                    <TouchableOpacity
                       key={list.id}
                       style={styles.removeTagUser}
                       onPress={()=>{this.removeUser(list)}}
                    >
                      <Image
                        style={styles.removeIcon}
                        source={require('../assets/images/remove.png')}
                      />
                    </TouchableOpacity>
                </View>
              </View>
            )
          )
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:18,
    flexDirection:'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imageContainer:{
    height: screenHeight/2,
    position:'absolute',

  },
  imageStyle:{
    width : screenWidth,
    height: screenHeight/2
  },
  tagTriangle:{
    height:0,
    width:0,
    left:15,
    borderLeftColor:'transparent',
    borderLeftWidth:7,
    borderRightColor:'transparent',
    borderRightWidth:7,
    borderBottomColor:'rgba(0,0,0,.30)',
    borderBottomWidth:7

  },
  tagUserView:{
    backgroundColor:'rgba(0,0,0,.30)',
    borderRadius:5,
    borderWidth: 1,
    borderColor:'rgba(0,0,0,.30)',
    paddingLeft:10,
    paddingRight:10,
    paddingTop:3,
    paddingBottom:3,
    flexDirection:'row'
  },
  tagListText:{
    color:'white',
    fontWeight:'800'
  },
  removeTagUser:{
    backgroundColor:'white',
    height:15,
    width:15,
    marginLeft:5,
    borderRadius:15
  },
  removeIcon:{
    height:8,
    width:8,
    marginTop:3,
    marginLeft:3.5
  },
  userSearch:{
    zIndex:99,
    backgroundColor:'rgba(225,225,225,0.85)'
  },
  userList:{
    padding:10,
    paddingLeft:20,
    borderWidth:1,
    borderColor: '#ccc',
  },
  userListText:{
    fontWeight:'600'
  },
  searchContainer:{
    flexDirection:'row',
    paddingLeft:10,
    backgroundColor:'white',
    borderColor: '#999',
    borderWidth: 1,
    width:screenWidth,
    justifyContent: 'space-between',
  },
  searchIconStyle: {
    width: 20,
    height: 20,
    marginTop: 10,
    marginLeft:10,

  },
  closeIconStyle:{
    width: 20,
    height: 20,
    marginTop: 10,
    marginRight:10,
  },
  textInputStyle:{
    height: 40,
    marginLeft:10,
    alignItems: 'flex-start',
    width:250
  },


});
