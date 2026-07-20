import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { styles } from './customTextInputStyles'

export type CustomTextInputProps={
  label?:string,
  placeholder?:string,
  value?:string,
  onChangeText:(text:string)=>void;
}
const CustomTextInput = ({label,placeholder,value, onChangeText}:CustomTextInputProps) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  )
}

export default CustomTextInput