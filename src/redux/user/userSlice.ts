import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PersonalInfoType = {
  name: string,
  gender: string,
  email: string,
  phoneNumber: string
}
export type AddressType = {
  line1: string,
  line2?: string,
  city: string,
  state: string,
  country: string,
  pincode: number
}
export type ProfileType = {
  company: string,
  experience: number
}
export type UserType={
  personalInfo?:PersonalInfoType,
  address?:AddressType,
  profile?:ProfileType
}
export type InitialStateType = UserType|null;
const initialState: UserType = {
  personalInfo: {
    name: "",
    gender: "",
    email: "",
    phoneNumber: ""
  },
  address: {
    line1: "",
    city: "",
    state: "",
    country: "",
    pincode: 0
  },
  profile: {
    company: "",
    experience: 0
  }
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addPersonalInfo: (state, action: PayloadAction<PersonalInfoType>) => {
      state.personalInfo = action.payload;
    },
    addAddressInfo:(state, action:PayloadAction<AddressType>)=>{
      state.address=action.payload;
    },
    addProfileInfo:(state,action:PayloadAction<ProfileType>)=>{
      state.profile=action.payload;
    }
  }
})

export const {addPersonalInfo, addAddressInfo, addProfileInfo} = userSlice.actions;
export default userSlice.reducer;