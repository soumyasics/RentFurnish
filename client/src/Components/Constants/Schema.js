import * as yup from "yup"

const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
// min 5 char, 1 uppercase, 1 lowercase, 1number, 1 symbol
const pincodeErrorMessage = "Pincode must be a 6 digit number";
const regnoErrorMessage = "Registernumber must be a 6 digit number";


export const shopRegSchema  = yup.object().shape({
    shopname: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    email:yup.string().email("Please enter a valid email").required("Required"),
    password:  yup.string().min(5).max(16).matches(passwordRule, "1 uppercase, 1 number, 1 symbol").required("Required"),
    confirmpassword: yup.string().oneOf([yup.ref("password"), null], "Password mismatch").required("Required"),
    buildingname: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    city: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    street: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    state: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    pincode:  yup.number().min(100000,pincodeErrorMessage).max(999999,"Pincode must be a 6 digit number").required("Required"),
    regno:  yup.number().min(100000,regnoErrorMessage).max(999999,"register number must be a 6 digit number").required("Required"),
    phone:  yup.number().min(1000000000,"Contact must be a 10 digit number").max(9999999999,"Contact must be a 10 digit number").required("Required"),
    district: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    image: yup.object().required("Required"),     
})
