import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '@/src/components/textInput/CustomTextInput';
import { addAddressInfo, addPersonalInfo, addProfileInfo, AddressType, PersonalInfoType, ProfileType } from '@/src/redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/redux/store';

const FIELDS = [
  {
    heading: "Personal Details",
    section: "personalInfo",
    inputs: [
      { label: "Name", key: "name" },
      { label: "Gender", key: "gender" },
      { label: "Email", key: "email" },
      { label: "Phone Number", key: "phoneNumber" },
    ],
  },
  {
    heading: "Address Info",
    section: "address",
    inputs: [
      { label: "Address Line 1", key: "line1" },
      { label: "Address Line 2", key: "line2" },
      { label: "City", key: "city" },
      { label: "State", key: "state" },
      { label: "Country", key: "country" },
      { label: "Pincode", key: "pincode" },
    ],
  },
  {
    heading: "Profile Details",
    section: "profile",
    inputs: [
      { label: "Company", key: "company" },
      { label: "Experience", key: "experience" },
    ],
  },
];

const UserForm = () => {
  const [index, setIndex]=useState(0);
  const [personalDetails, setPersonalDetails]=useState<Partial<PersonalInfoType>>({});
  const [addressInfo, setAddressInfo]=useState<Partial<AddressType>>();
  const [profileDetails, setProfileDetails]=useState<Partial<ProfileType>>();
  const dispatch=useDispatch<AppDispatch>();
  const personal=useSelector((state:RootState)=>state.user.personalInfo);
  const address=useSelector((state:RootState)=>state.user.address);
  const profile=useSelector((state:RootState)=>state.user.profile);
  const user={...personal,...address,...profile};
  const handleNextPress=(idx:number)=>{
    if(index>1){
      return;
    }
    if(idx===0){
      dispatch(addPersonalInfo(personalDetails as PersonalInfoType));
    }
    else if(idx===1){
      dispatch(addAddressInfo(addressInfo as AddressType));
    }
    else if(idx===2){
      dispatch(addProfileInfo(profileDetails as ProfileType));
      console.log("user Registered: ",user);
      Alert.alert("User Registered Successfully");
    }
    setIndex((prev)=>prev+1);
  }  
  const handlePreviousPress=()=>{
    if(index<1){
      return;
    }
    setIndex((prev)=>prev-1);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.details}>USER DETAILS</Text>
      <ScrollView style={styles.formContainer}>
        {FIELDS.map((field, idx)=>{
          if(idx!==index){
            return null;
          }
          return(
          <View key={field.section} style={styles.fields}>
            <Text style={styles.heading}>{field.heading}</Text>
            {field.inputs.map((input)=>(
              <View key={input.key} style={styles.inputContainer}>
                <CustomTextInput 
                label={input.label}
                onChangeText={(text)=>{
                  if(field.section==='personalInfo'){
                    setPersonalDetails((prev)=>({...prev, [input.key]:text}));
                  }
                  else if(field.section==='address'){
                    setAddressInfo((prev)=>({...prev,[input.key]:text}));
                  }
                  else if(field.section==='profile'){
                    setProfileDetails((prev)=>({...prev,[input.key]:text}));
                  }
                }}
                placeholder={`Enter Your ${input.label}`}
                />
              </View>
            ))}
            <View style={styles.buttonGrp}>
              {idx>0 && (
              <Pressable style={styles.prevButton} onPress={handlePreviousPress}>
                <Text style={styles.prevText}>Previous</Text>
              </Pressable>            
              )}
              <Pressable style={styles.nextButton} onPress={()=>handleNextPress(idx)}>
                <Text style={styles.nextText}>{idx===2? 'Submit':'Next'}</Text>
              </Pressable>
            </View>
          </View>
        )})}
      </ScrollView>
    </View>
  )
}

export default UserForm

const styles=StyleSheet.create({
  container:{
    flex:1,
    padding:20
  },
  details:{
    alignSelf:'center',
    fontSize:24,
    fontWeight:'bold'
  },
  formContainer:{
    flex:1,
    margin:20,
    padding:20,
    borderWidth:1,
    borderColor:"blue",
    borderRadius:20,
  },
  fields:{
    flex:1,
    paddingBottom:30
  },
  inputContainer:{
    flex:1,
  },
  nextButton:{
    flex:1,
    padding:14,
    backgroundColor:"blue",
    alignItems:'center',
    borderRadius:12,
    marginVertical:10
  },
  nextText:{
    color:"white",
    fontWeight:"bold",
    fontSize:20
  },  
  prevButton:{
    flex:1,
    padding:14,
    backgroundColor:"darkorange",
    alignItems:'center',
    borderRadius:12,
    marginVertical:10
  },
  prevText:{
    color:"white",
    fontWeight:"bold",
    fontSize:20
  },
  buttonGrp:{
    flex:1,
    flexDirection:'row',
    gap:12
  },
  heading:{
    fontSize:18,
    fontWeight:'bold',
    color:"blue"
  }
})