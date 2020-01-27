import { isRequired, validEmail, validPhone } from '../operations';

function validate_email(value){
    if (isRequired(value)) {
        return 'Email address is required';
    }
    if (validEmail(value)) {
        return 'Email address is invalid';
    }
    return null;
}

function validate_password(value){
    if (isRequired(value)) {
        return 'Password is required';
    }
    if (value.length < 8) {
        return 'Password must be 8 or more characters';
    }

    if(value.search(/\d/) === -1){
        return 'Password must contain at least one number';
    }
    if(value.search(/[A-Z]/) === -1){
        return 'Password must contain at least one Uppercase letter';
    }
    return null;
}

function validate_phoneNumber(value){
    if (isRequired(value)) {
        return 'Phone number is required';
    }
    if (validPhone(value)) {
        return 'Invalid phone number';
    }
    if (value.length < 8) {
        return 'Invalid phone number';
    }
    return null;
}

function validate_name(value){
    if (isRequired(value)) {
        return 'Name is required';
    }
    return null;
}

export function validateField(field, value){
    switch (field) {
        case 'name':
            return validate_name(value);
        case 'email':
            return validate_email(value);
        case 'phoneNumber':
            return validate_phoneNumber(value);
        case 'password':
            return validate_password(value);
        default:
            return null;
    }
}

export function validateLogin(phoneNumber) {
    let errors = {
        phoneNumber: null,
        isValidated: true
    };

    errors.phoneNumber = validate_phoneNumber(phoneNumber);
    errors.isValidated = errors.phoneNumber ? false : errors.isValidated;

    return errors;
}

export function validateRegister(values) {
    let errors = {
        name: null,
        phoneNumber: null,
        email: null,
        password: null,
        isValidated: true
    };

    errors.name = validate_name(values.fields.name);
    errors.isValidated = errors.name? false : errors.isValidated;

    errors.phoneNumber = validate_phoneNumber(values.fields.phoneNumber);
    errors.isValidated = errors.phoneNumber? false : errors.isValidated;

    errors.email = validate_email(values.fields.email);
    errors.isValidated = errors.email? false : errors.isValidated;

    errors.password = validate_password(values.fields.password);
    errors.isValidated = errors.password? false : errors.isValidated;

    return errors;
}

export function validateRegisterOTP(value) {
    let errors = {
        otp: null,
        isValidated: true
    };

    if (isRequired(value)) {
        errors.otp = 'Missing OTP';
        errors.isValidated = false;
    } else if(isNaN(value)){
        errors.otp = 'Invalid OTP';
        errors.isValidated = false;
    } else if(value.length !== 6){
        errors.otp = '6 digit OTP is required';
        errors.isValidated = false;
    }

    return errors;
}

export function validateOnboardRegister(values) {
      let errors = {
        name: null,
        isAgreed: null,
        isValidated: true
    };

    errors.name = validate_name(values.name);
    errors.isValidated = errors.name? false : true;

    if (isRequired(values.isAgreed)) {
        errors.isAgreed = 'Please read and accept T&C';
        errors.isValidated = false;
    }

    return errors;
}


export function validateOnboardBusiness(values) {
    let errors = {
        name: null,
        selectedCategories: false,
        isValidated: true
    };

    errors.name = validate_name(values.name);
    errors.isValidated = errors.name? false : true;

    if (isRequired(values.selectedCategories)) {
        errors.selectedCategories = 'Please choose atleast one cateogory';
        errors.isValidated = false;
    }

    return errors;
}

export function validateAddStores(values){
    let errors = {
        name: null
    };

    errors.name = validate_name(values.name);
    errors.isValidated = errors.name ? false : errors.isValidated;

    return errors;
}

export function validateCreateTag(values, errorsVal) {
    let errors = errorsVal;
    for(let i in errors){
        errors[i] = null
    }

    errors.isValidated = true;
    let keys = Object.keys(errors);
    for(let j in keys){
        if(keys[j] !== 'isValidated' && keys[j] !== 'active' && keys[j] !== 'visible'){
            if (isRequired(values.fields[keys[j]])) {
                errors[keys[j]] = 'This field is required';
                errors.isValidated = errors[keys[j]] ? false : true;
            }
        }
    }

    return errors;
}
