import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Platform
} from 'react-native';
import { SearchBar } from 'react-native-elements'

import FlipCard from 'react-native-flip-card'

import { connect } from 'react-redux';
import { getAllCards, getMyCard } from '../redux/actions/actions.js';

import transform from 'css-to-react-native';


const mapStateToProps = (state) => {
  // console.log("STATE: ", state);
  return {
    allCards: state.allCards,
    myCard: state.myCard,
    authInfo: state.authInfo
  }
}

class ContactScreen extends Component {
  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: '#273746',
      }
    }
  };

  constructor(props) {
    super(props)
    this.props.dispatch(getMyCard(props.authInfo.user.sub))
    this.props.dispatch(getAllCards(props.authInfo.user.sub))

    this.state = {
      flip: false
    }

  }

  componentDidUpdate = (prevProps) => {
    // console.log("CAN I SEE PREV PROPS", prevProps.myCard.users.length)
    // console.log("CURRENT PROPS", this.props.myCard)
    if (this.props.myCard.users.length !== prevProps.myCard.users.length) {
      console.log("NEW PROPS!!!")
      this.props.dispatch(getAllCards(this.props.authInfo.user.sub))
    }
  }

  allContacts = () => {
    this.props.data
  }

  transformCss = (obj) => {

    let arr = [];

    for (var key in obj) {
      let innerArr = [];
      innerArr.push(`${key}`);
      innerArr.push(`${obj[key]}`);

      arr.push(innerArr);
    }

    return arr;

  }

  render() {
    // console.log("MYCARD PROPS", this.props.myCard)
    let contactData = this.props.allCards
    console.log('CONTACT DATA: ', contactData);


    // let transformed = transform(this.transformCss(this.props.allCards.css.info))

    // console.log("~~~~PROP DATA~~~~");
    // console.log(data);
    // console.log("CSS:", css);

    return (
      <ScrollView style={styles.background}>
        <SearchBar
          darkTheme
          onKeyUp={this._handleKeyUp}
          // onClearText={}
          placeholder='Type Here...' />
        <View style={styles.wrapper}>
          <Text style={styles.heading}>Your Connections</Text>
          {
            contactData.map(info => {
              console.log("can i do this", info)
              const { data } = info
              const { css } = info.style;

              let backTransformed = transform(this.transformCss(css.back))
              let frontTransformed = transform(this.transformCss(css.front))
              let infoTransformed = transform(this.transformCss(css.info))
              let companyTransformed = transform(this.transformCss(css.company))
              let nameTransformed = transform(this.transformCss(css.name))

              // console.log("NAME", nameTransformed)
              // console.log("INFO", infoTransformed)
              // console.log("BACK", backTransformed)
              // console.log("FRONT", frontTransformed)
              // console.log("COMPANY", companyTransformed)

              let string = `${css.front.backgroundImage}`
              let backString = `${css.back.backgroundImage}`
              let frontImage = string.split("'")[1]
              let backImage = backString.split("'")[1]
              // console.log("WHAT", backImage)


              return (
                <View key={info.user_id} style={styles.contacts}>

                  <FlipCard
                    flip={this.state.flip}
                    style={styles.flipcard}
                  >
                    {/* Front of the Card */}

                    <View>
                      <ImageBackground source={{ uri: frontImage }}
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
                            fontWeight: (Platform.OS=== 'ios') ? nameTransformed.fontFamily : 'Roboto',
                            height: nameTransformed.height,
                            width: nameTransformed.width,
                            fontFamily: nameTransformed.fontFamily,
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
                          fontFamily: companyTransformed.fontFamily,
                          fontWeight: (Platform.OS=== 'ios') ? companyTransformed.fontFamily : 'Roboto',
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
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    )
  }
}

export default connect(mapStateToProps)(ContactScreen)

//~~~~ STYLESHEET ~~~~//
const styles = StyleSheet.create({
  background: {
    backgroundColor: "#273746",

  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  heading: {
    marginTop: 15,
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 15,
    color: 'white',
  },
  contacts: {
    flex: 0,
    width: 350,
    height: 200,
    alignItems: 'center',
    marginTop: 15,

  },
  flipcard: {
    width: 350,
    // height: '100%'
  }

})