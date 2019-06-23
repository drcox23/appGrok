import React from 'react';
import {
  View,
  Text,
} from 'react-native';

export const Card = (props) => {
  const { data, styles } = props;

  return (
    <View key={props.user_id} style={props.cardContainer}>
      <View style={props.front} >
        <View style={props.info} >
          <Text style={props.name}>{data.name}</Text>
          <Text style={props.title}>{data.title}</Text>
          <Text style={props.address}>{data.address}</Text>
          <Text style={props.phone}>{data.phone}</Text>
          <Text style={props.email}>{data.email}</Text>
        </View>
      </View>
    </View>
  )
}







export const AllCards = (props) => {
  console.log('all cards props', props);

  return props.cards.map(card =>
    <div key={card.user_id} className={props.cardContainer}>
      <div className={props.back} style={card.css.back}>
        <div className={props.company} style={card.css.company}>{card.data.company_name}</div>
      </div>
      <div className={props.front} style={card.css.front}>
        <div className={props.info} style={card.css.info}>
          <div className={props.name}>{card.data.name}</div>
          <div className={props.title}>{card.data.title}</div>
          <div className={props.address}>{card.data.address}</div>
          <div className={props.phone}>{card.data.phone}</div>
          <div className={props.email}>{card.data.email}</div>
        </div>
      </div>
    </div>
  )
}