import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Button,
  ImageBackground,
  Platform
} from 'react-native';

import { scanCard } from '../redux/actions/actions.js'

// CSS stuff
import transform from 'css-to-react-native'
import FlipCard from 'react-native-flip-card'

//aws auth
import { Auth } from 'aws-amplify'

// redux
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = (state) => {
  // console.log("STATE", state)
  return {
    myCard: state.myCard,
    authInfo: state.authInfo,
  }
}

class SaveContactScreen extends Component {
  constructor(props){
    super(props);
    // console.log("YYYYY", props)
    const { navigation } =  props
    const userInfo = navigation.getParam('cardData')
  
    this.state = {
      saveCard: userInfo,
      flip: false
    }

  }


  componentDidMount = () => {
  
  //  console.log("SAVE SCREEN", this.state)
  }

  transformCss = (obj) => {

    let arr = [];

    for (var key in obj) {
      let innerArr = [];
      innerArr.push(`${key}`);
      innerArr.push(`${obj[key]}`);

      arr.push(innerArr);
    }

    return arr
  }
  

  handleSave = (myId, newUserId) => {
    alert("Establish Save/Post method")
    // console.log("SAVE THE CARD", myId, newUserId)
    this.props.dispatch(scanCard(myId, newUserId))

    this.props.navigation.navigate('Contacts')
  }

  transformation = (obj) => {
   return transform(this.transformCss(obj))
  }

  render() {
    const userInfo = this.props.navigation.getParam('cardData')

    // console.log("CAN I SEE THIS", userInfo)
    // console.log("WHATS THE PROPS", this.props)
    const myId = this.props.authInfo.user.sub
    const newUserId = userInfo.user_id

    // const { myCard } = this.props;
    const { data } = userInfo;
    const { css } = userInfo.style  
    console.log("CSSSSSS", css)
    

    let string = `${css.front.backgroundImage}`
    let backString = `${css.back.backgroundImage}`
    let frontImage = string.split("'")[1]
    let backImage = backString.split("'")[1]
    // console.log("WHAT", frontImage)

    let fontString = `${css.front.fontFamily}`
    let fontCheck = fontString.split(",")[1]

    let backFontString = `${css.back.fontFamily}`
    let backCheck = backFontString.split(",")[1]

    let backTransformed = transform(this.transformCss(css.back))
    let frontTransformed = transform(this.transformCss(css.front))
    let infoTransformed = transform(this.transformCss(css.info))
    let companyTransformed = transform(this.transformCss(css.company))
    let nameTransformed = transform(this.transformCss(css.name))

    return (
      <View style={styles.wrapper}>
        <Text style={styles.text1}>SCANNED USER INFO</Text>
        <Text style={styles.text2}>{data.name}</Text>

        <FlipCard
            flip={this.state.flip}
            style={styles.cardWrapper}
           >
  {/* Front of the Card */}

            <View>
            <ImageBackground source={{uri: frontImage}} 
              style={{
                backgroundRepeat: frontTransformed.backgroundRepeat,
                resizeMode: frontTransformed.backgroundSize,
                backgroundColor: frontTransformed.backgroundColor || null,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                
              }} >
              
              <View >
                <Text style={{
                  fontSize: nameTransformed.fontSize,
                  fontWeight: nameTransformed.fontWeight,
                  height: nameTransformed.height,
                  width: nameTransformed.width,
                  fontFamily: (Platform.OS=== 'ios') ? nameTransformed.fontFamily : 'Roboto',
                  color: frontTransformed.color || nameTransformed.color,
                  left: nameTransformed.left,
                  letterSpacing: nameTransformed.letterSpacing,
                  paddingBottom: nameTransformed.paddingBottom,
                  paddingRight: nameTransformed.paddingRight,
                  paddingLeft: nameTransformed.paddingLeft,
                  paddingTop: nameTransformed.paddingTop,
                  position: nameTransformed.position,
                  top: nameTransformed.top,
                  textAlign: nameTransformed.textAlign || frontTransformed.textAlign,
                  textTransform: nameTransformed.textTransform
                  }}> 
                    {data.name}
                </Text>
                <Text style={{
                  backgroundColor: infoTransformed.backgroundColor,
                  color: css.front.color,
                  fontSize: infoTransformed.fontSize,
                  fontFamily: (Platform.OS=== 'ios') ? infoTransformed.fontFamily : 'Roboto',
                  height: infoTransformed.height,
                  width: infoTransformed.width,
                  paddingBottom: infoTransformed.paddingBottom,
                  paddingTop: infoTransformed.paddingTop,
                  paddingLeft: infoTransformed.paddingLeft,
                  paddingRight: infoTransformed.paddingRight,
                  left: infoTransformed.left,
                  position: infoTransformed.position,
                  textAlign: infoTransformed.textAlign,
                  top: infoTransformed.top
              }}>
                  {data.title} {"\n"}
                  {data.address} {"\n"}
                  {data.phone} {"\n"}
                  {data.email}
                </Text>
              </View>
            </ImageBackground>
          </View>

{/* the back of the card */}
          <View>
            <ImageBackground source={{ uri: backImage }}
              style={{
                backgroundRepeat: backTransformed.backgroundRepeat,
                resizeMode: backTransformed.backgroundSize, 
                position: backTransformed.backgroundPosition,
                paddingBottom: backTransformed.paddingBottom,
                paddingTop: backTransformed.paddingTop,
                paddingLeft: backTransformed.paddingLeft,
                paddingRight: backTransformed.paddingRight,
                width: '100%',
                height: '100%',
              }} >
              <Text style={{
                color: companyTransformed.color,
                backgroundColor: companyTransformed.backgroundColor,
                fontSize: companyTransformed.fontSize,
                fontFamily: (Platform.OS=== 'ios') ? companyTransformed.fontFamily : 'Roboto',
                fontWeight: companyTransformed.fontWeight,
                left: companyTransformed.left,
                letterSpacing: companyTransformed.letterSpacing,
                position: companyTransformed.position,
                textAlign: backTransformed.textAlign || companyTransformed.textAlign,
                textTransform: companyTransformed.textTransform,
                top: companyTransformed.top,
                right: companyTransformed.right,
                paddingBottom: companyTransformed.paddingBottom,
                paddingTop: companyTransformed.paddingTop,
                paddingLeft: companyTransformed.paddingLeft,
                paddingRight: companyTransformed.paddingRight,
                height: companyTransformed.height,
              }}>{data.company_name}</Text>
            </ImageBackground>
            </View>
            
          </FlipCard>

        <Button
          title={"SAVE"}
          onPress={() => this.handleSave(myId, newUserId)}
        />
        <Button
          title="Try Again"
          onPress={ () => this.props.navigation.navigate('Scan')}
        />
      </View>

    )
  }
}


export default connect(mapStateToProps)(SaveContactScreen)



//~~~~ STYLESHEET ~~~~//
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#273746",
    alignItems: 'center',
  },
  text1: {
    color: 'white',
    marginTop: 50,
    textAlign: 'center',
    fontSize: 35,
  },
  text2: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
  },
  cardWrapper: {
    flex: 0,
    marginTop: 30,
    width: 350,
    height: 200,
    borderRadius: 50,
  },
})
