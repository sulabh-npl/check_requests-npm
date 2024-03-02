let operation_lang = require('./lang').operation_lang;
let timezones = require('./constants').timezones;

// contains functions that are used to validate the input fields

// Functions are in ascending order of name


// accepted() function is used to check if the input is accepted or not
function accepted(data, failed_message='The :attribute must be accepted') {
    // Purpose: This function checks if the input is accepted or not
    // 
    // Arguments:
    // - data: The input data
    // - failed_message: The error message if the input is not accepted
    // 
    // Returns:
    // - boolean: True if the input is accepted, False otherwise
    // - string: The error message if the input is not accepted, an empty string otherwise

    // If the input is not true/yes/True/YES/Y/1, return False

    try{
        if (['true', 'yes', '1', 'y', 't', 'on'].includes(data.toLowerCase())) {
            return [true, ''];
        }

        return [false, failed_message];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function accepted_if(data, rule_values=[], request_body={}) {
    // Purpose: This function checks if the input is accepted if the other field condition is met

    // Arguments:
    // - data: The input data
    // - rule_values: other field, operation, expected value

    // Returns:
    // - boolean: True if the input is accepted, False otherwise
    // - string: The error message if the input is not accepted, an empty string otherwise

    // The other field must be present in the request
    // The operation must be one of the following: ==, !=, <, >, <=, >=
    // The expected value must be present

    // If only one parameter is present, the input must be accepted if the other field is present
    // If two parameters are present, the input must be accepted if the other field has the expected value
    // If three parameters are present, the input must be accepted if the other field has the expected value based on the operation

    try{

        let other_field = rule_values[0];
        let operation = rule_values[1];
        let expected_value = rule_values[2];

        if (!operation && !expected_value) {
            if (request_body[other_field]) {
                return accepted(data, 'The :attribute must be accepted if the '+other_field+' is present');
            }else {
                return [true, ''];
            }
        }else if (operation && !expected_value) {
            expected_value = operation;
            operation = '==';
        }

        if(!['==', '!=', '<', '>', '<=', '>='].includes(operation)) {
            return [false, 'The operation must be one of the following: ==, !=, <, >, <=, >='];
        }

        if(check_if(request_body[other_field], operation, expected_value)) {
            return accepted(data, 'The :attribute must be accepted if the '+other_field+' is '+operation_lang[operation]+' '+expected_value);
        }else{
            return [true, ''];
        }
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function after(data, rule_values=[]) {
    // Purpose: This function checks if the input is after the expected date

    // Arguments:
    // - data: The input data
    // - rule_values: The expected date

    // Returns:
    // - boolean: True if the input is after the expected date, False otherwise
    // - string: The error message if the input is not after the expected date, an empty string otherwise

    try{
        if(rule_values.length === 0) {
            return [false, 'The expected date is not provided'];
        }
        let expected_date = rule_values[0];

        if (new Date(data) > new Date(expected_date)) {
            return [true, ''];
        }

        return [false, 'The :attribute must be after '+expected_date];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function after_or_equal(data, rule_values=[]) {
    // Purpose: This function checks if the input is after or equal to the expected date

    // Arguments:
    // - data: The input data
    // - rule_values: The expected date

    // Returns:
    // - boolean: True if the input is after or equal to the expected date, False otherwise
    // - string: The error message if the input is not after or equal to the expected date, an empty string otherwise

    try{
        if(rule_values.length === 0) {
            return [false, 'The expected date is not provided'];
        }
        let expected_date = rule_values[0];

        if (new Date(data) >= new Date(expected_date)) {
            return [true, ''];
        }

        return [false, 'The :attribute must be after or equal to '+expected_date];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function alpha(data) {
    // Purpose: This function checks if the input contains only alphabets

    // Arguments:
    // - data: The input data

    // Returns:
    // - boolean: True if the input contains only alphabets, False otherwise
    // - string: The error message if the input does not contain only alphabets, an empty string otherwise

    try{
        if (/^[a-zA-Z]+$/.test(data)) {
            return [true, ''];
        }

        return [false, 'The :attribute must contain only alphabets'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function alpha_dash(data) {
    // Purpose: This function checks if the input contains only alphabets, dashes and underscores

    // Arguments:
    // - data: The input data

    // Returns:
    // - boolean: True if the input contains only alphabets, dashes and underscores, False otherwise
    // - string: The error message if the input does not contain only alphabets, dashes and underscores, an empty string otherwise

    try{
        if (/^[a-zA-Z-_]+$/.test(data)) {
            return [true, ''];
        }

        return [false, 'The :attribute must contain only alphabets, dashes and underscores'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}


function alpha_num(data) {
    // Purpose: This function checks if the input contains only alphabets and numbers

    // Arguments:
    // - data: The input data

    // Returns:
    // - boolean: True if the input contains only alphabets and numbers, False otherwise
    // - string: The error message if the input does not contain only alphabets and numbers, an empty string otherwise

    try{
        if (/^[a-zA-Z0-9]+$/.test(data)) {
            return [true, ''];
        }

        return [false, 'The :attribute must contain only alphabets and numbers'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function alpha_num_dash(data) {
    // Purpose: This function checks if the input contains only alphabets, numbers, dashes and underscores

    // Arguments:
    // - data: The input data

    // Returns:
    // - boolean: True if the input contains only alphabets, numbers, dashes and underscores, False otherwise
    // - string: The error message if the input does not contain only alphabets, numbers, dashes and underscores, an empty string otherwise

    try{
        if (/^[a-zA-Z0-9-_]+$/.test(data)) {
            return [true, ''];
        }

        return [false, 'The :attribute must contain only alphabets, numbers, dashes and underscores'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function array(data) {
    // Purpose: This function checks if the input is an array

    // Arguments:
    // - data: The input data

    // Returns:
    // - boolean: True if the input is an array, False otherwise
    // - string: The error message if the input is not an array, an empty string otherwise

    try{
        let parsed_data = JSON.parse(data);
        if (Array.isArray(parsed_data)) {
            return [true, ''];
        }

        return [false, 'The :attribute must be an array'];
    }catch(e){
        return [false, 'The :attribute must be an array'];
    }
}

function before(data, rule_values=[]) {
    // Purpose: This function checks if the input is before the expected date

    // Arguments:
    // - data: The input data
    // - rule_values: The expected date

    // Returns:
    // - boolean: True if the input is before the expected date, False otherwise
    // - string: The error message if the input is not before the expected date, an empty string otherwise

    try{
        if(rule_values.length === 0) {
            return [false, 'The expected date is not provided'];
        }
        let expected_date = rule_values[0];

        if (new Date(data) < new Date(expected_date)) {
            return [true, ''];
        }

        return [false, 'The :attribute must be before '+expected_date];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function before_or_equal(data, rule_values=[]) {
    // Purpose: This function checks if the input is before or equal to the expected date

    // Arguments:
    // - data: The input data
    // - rule_values: The expected date

    // Returns:
    // - boolean: True if the input is before or equal to the expected date, False otherwise
    // - string: The error message if the input is not before or equal to the expected date, an empty string otherwise

    try{
        if(rule_values.length === 0) {
            return [false, 'The expected date is not provided'];
        }
        let expected_date = rule_values[0];

        if (new Date(data) <= new Date(expected_date)) {
            return [true, ''];
        }

        return [false, 'The :attribute must be before or equal to '+expected_date];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function between(data, rule_values=[]) {
    // Purpose: This function checks if the input is between the expected range

    // Arguments:
    // - data: The input data
    // - rule_values: The minimum and maximum value

    // Returns:
    // - boolean: True if the input is between the expected range, False otherwise
    // - string: The error message if the input is not between the expected range, an empty string otherwise

    try{
        if(numeric(data)[0] === false) {
            return [false, 'The :attribute must be a number'];
        }
        if(rule_values.length < 2) {
            return [false, 'The minimum and maximum value are not provided'];
        }
        let min_value = rule_values[0];
        let max_value = rule_values[1];

        data = parseFloat(data);
        min_value = parseFloat(min_value);
        max_value = parseFloat(max_value);

        if (data >= min_value && data <= max_value) {
            return [true, ''];
        }

        return [false, 'The :attribute must be between '+min_value+' and '+max_value];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function between_date(data, rule_values=[]) {
    // Purpose: This function checks if the input is between the expected date range

    // Arguments:
    // - data: The input data
    // - rule_values: The minimum and maximum date

    // Returns:
    // - boolean: True if the input is between the expected date range, False otherwise
    // - string: The error message if the input is not between the expected date range, an empty string otherwise

    try{
        if(rule_values.length !== 2) {
            return [false, 'The minimum and maximum date are not provided'];
        }
        let min_date = rule_values[0];
        let max_date = rule_values[1];

        if (new Date(data) >= new Date(min_date) && new Date(data) <= new Date(max_date)) {
            return [true, ''];
        }

        return [false, 'The :attribute must be between '+min_date+' and '+max_date];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function between_exclusive(data, rule_values=[]) {
    // Purpose: This function checks if the input is between the expected range (exclusive)

    // Arguments:
    // - data: The input data
    // - rule_values: The minimum and maximum value

    // Returns:
    // - boolean: True if the input is between the expected range (exclusive), False otherwise
    // - string: The error message if the input is not between the expected range (exclusive), an empty string otherwise

    try{
        if(rule_values.length !== 2) {
            return [false, 'The minimum and maximum value are not provided'];
        }
        let min_value = rule_values[0];
        let max_value = rule_values[1];

        if (data > min_value && data < max_value) {
            return [true, ''];
        }

        return [false, 'The :attribute must be between '+min_value+' and '+max_value+' (exclusive)'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function between_date_exclusive(data, rule_values=[]) {
    // Purpose: This function checks if the input is between the expected date range (exclusive)

    // Arguments:
    // - data: The input data
    // - rule_values: The minimum and maximum date

    // Returns:
    // - boolean: True if the input is between the expected date range (exclusive), False otherwise
    // - string: The error message if the input is not between the expected date range (exclusive), an empty string otherwise

    try{
        if(rule_values.length !== 2) {
            return [false, 'The minimum and maximum date are not provided'];
        }
        let min_date = rule_values[0];
        let max_date = rule_values[1];

        if (new Date(data) > new Date(min_date) && new Date(data) < new Date(max_date)) {
            return [true, ''];
        }

        return [false, 'The :attribute must be between '+min_date+' and '+max_date+' (exclusive)'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function boolean(data) {
    // Purpose: This function checks if the input is a boolean

    // Arguments:
    // - data: The input data

    // Returns:
    // - boolean: True if the input is a boolean, False otherwise
    // - string: The error message if the input is not a boolean, an empty string otherwise

    try{
        if (['true', 'yes', '1', 'y', 't', 'on', 'false', 'no', '0', 'n', 'f', 'off'].includes(data.toLowerCase()) && typeof data === 'string') {
            return [true, ''];
        }

        return [false, 'The :attribute must be a boolean'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function confirmed(data, rule_values=[], request_body={}, field_name) {
    // Purpose: This function checks if the input is confirmed

    // Arguments:
    // - data: The input data
    // - rule_values: The field name to confirm

    // Returns:
    // - boolean: True if the input is confirmed, False otherwise
    // - string: The error message if the input is not confirmed, an empty string otherwise

    try{
        if (rule_values.length === 0) {
            let confirm_field = field_name+'_confirmation';
            if(!request_body[confirm_field]) {
                return [false, 'The '+confirm_field+' is not present in the request'];
            }
            if (data === request_body[confirm_field]) {
                return [true, ''];
            }
        }else if (data === request_body[rule_values[0]]) {
            return [true, ''];
        }

        return [false, 'The :attribute must be confirmed'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function date(data) {
    // Purpose: This function checks if the input is a date

    // Arguments:
    // - data: The input data

    // Returns:
    // - boolean: True if the input is a date, False otherwise
    // - string: The error message if the input is not a date, an empty string otherwise

    try{
        if (new Date(data) instanceof Date && !isNaN(new Date(data))) {
            return [true, ''];
        }

        return [false, 'The :attribute must be a date'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function date_equals(data, rule_values=[]) {
    // Purpose: This function checks if the input is equal to the expected date

    // Arguments:
    // - data: The input data
    // - rule_values: The expected date

    // Returns:
    // - boolean: True if the input is equal to the expected date, False otherwise
    // - string: The error message if the input is not equal to the expected date, an empty string otherwise

    try{
        if(rule_values.length === 0) {
            return [false, 'The expected date is not provided'];
        }
        let expected_date = rule_values[0];

        if (new Date(data) === new Date(expected_date)) {
            return [true, ''];
        }

        return [false, 'The :attribute must be equal to '+expected_date];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function decimal(data, rule_values=[]) {
    // Purpose: This function checks if the input is a decimal

    // Arguments:
    // - data: The input data
    // - rule_values: The number of digits before and after the decimal point

    // Returns:
    // - boolean: True if the input is a decimal, False otherwise
    // - string: The error message if the input is not a decimal, an empty string otherwise

    try{
        if(rule_values.length < 1) {
            return [false, 'The number of digits after the decimal point is not provided'];
        }else {
            decimal_values = data.split('.')[1];
            if(rule_values.length === 1) {
                if (decimal_values.length > rule_values[0]) {
                    return [false, 'The :attribute must be a decimal with '+rule_values[0]+' digits after the decimal point'];
                }
            }else{
                if(decimal_values.length > rule_values[1] || decimal_values.length < rule_values[0]) {
                    return [false, 'The :attribute must be a decimal with '+rule_values[0]+' to '+rule_values[1]+' digits after the decimal point'];
                }
            }
            return [true, ''];
        }
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function declined(data, failed_message='The :attribute must be declined') {
    // Purpose: This function checks if the input is declined or not
    // 
    // Arguments:
    // - data: The input data
    // - failed_message: The error message if the input is not declined
    // 
    // Returns:
    // - boolean: True if the input is declined, False otherwise
    // - string: The error message if the input is not declined, an empty string otherwise

    // If the input is true/yes/True/YES/Y/1, return False

    try{
        if (['true', 'yes', '1', 'y', 't', 'on'].includes(data.toLowerCase())) {
            return [false, failed_message];
        }

        return [true, ''];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function declined_if(data, rule_values=[], request_body={}) {
    // Purpose: This function checks if the input is declined if the other field condition is met

    // Arguments:
    // - data: The input data
    // - rule_values: other field, operation, expected value

    // Returns:
    // - boolean: True if the input is declined, False otherwise
    // - string: The error message if the input is not declined, an empty string otherwise

    // The other field must be present in the request
    // The operation must be one of the following: ==, !=, <, >, <=, >=
    // The expected value must be present

    // If only one parameter is present, the input must be declined if the other field is present
    // If two parameters are present, the input must be declined if the other field has the expected value
    // If three parameters are present, the input must be declined if the other field has the expected value based on the operation

    try{
        let other_field = rule_values[0];
        let operation = rule_values[1];
        let expected_value = rule_values[2];

        if (!operation && !expected_value) {
            if (request_body[other_field]) {
                return required(data);
            }else {
                return [true, ''];
            }
        }else if (operation && !expected_value) {
            expected_value = operation;
            operation = '==';
        }

        if(!['==', '!=', '<', '>', '<=', '>='].includes(operation)) {
            return [false, 'The operation must be one of the following: ==, !=, <, >, <=, >='];
        }

        if(check_if(request_body[other_field], operation, expected_value)) {
            return declined(data, 'The :attribute must be declined if the '+other_field+' is '+operation_lang[operation]+' '+expected_value);
        }else{
            return [true, ''];
        }
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function different(data, rule_values=[], request_body={}) {
    // Purpose: This function checks if the input is different from the other field

    // Arguments:
    // - data: The input data
    // - rule_values: The other field names

    // Returns:
    // - boolean: True if the input is different from the other field, False otherwise
    // - string: The error message if the input is not different from the other field, an empty string otherwise

    try{
        for (let other_field of rule_values) {
            if(!request_body[other_field]) {
                return [false, 'The other field ('+other_field+') is not present in the request'];
            }
            if (data === request_body[other_field]) {
                return [false, 'The :attribute must be different from '+other_field];
            }
        }
        return [true, ''];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function distinct(data) {
    // Purpose: This function checks if the input is distinct

    // Arguments:
    // - data: The input data

    // Returns:
    // - boolean: True if the input is distinct, False otherwise
    // - string: The error message if the input is not distinct, an empty string otherwise

    try{
        array_response = array(data);
        if(!array_response[0]) {
            return array_response;
        }
        data = JSON.parse(data);
        let unique_data = new Set(data);
        if (unique_data.size === data.length) {
            return [true, ''];
        }

        return [false, 'The :attribute must be distinct'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function email(data) {
    // Purpose: This function checks if the input is an email

    // Arguments:
    // - data: The input data

    // Returns:
    // - boolean: True if the input is an email, False otherwise
    // - string: The error message if the input is not an email, an empty string otherwise

    try{
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data)) {
            return [true, ''];
        }

        return [false, 'The :attribute must be an email'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function in_array(data, rule_values, request_body){
    // Purpose: This function checks if the input is in the array

    // Arguments:
    // - data: The input data
    // - rule_values: The array

    // Returns:
    // - boolean: True if the input is in the array, False otherwise
    // - string: The error message if the input is not in the array, an empty string otherwise

    try{
        if(rule_values.length === 0) {
            return [false, 'Target field is not provided'];
        }
        if(!request_body[rule_values[0]]) {
            return [false, 'The target field ('+rule_values[0]+') is not present in the request'];
        }
        let array_response = array(request_body[rule_values[0]]);

        if(!array_response[0]) {
            array_response[1] = 'The target field ('+rule_values[0]+') must be an array';
            return array_response;
        }
        let target_array = JSON.parse(request_body[rule_values[0]]);

        if (target_array.includes(data)) {
            return [true, ''];
        }

        return [false, 'The :attribute must be in the '+rule_values[0]];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function integer(data){
    // Purpose: This function checks if the input is an integer

    // Arguments:
    // - data: The input data

    // Returns:
    // - boolean: True if the input is an integer, False otherwise
    // - string: The error message if the input is not an integer, an empty string otherwise

    try{
        if(Number.isInteger(data)){
            return [true, ''];
        }

        return [false, 'The :attribute must be an integer'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }

}

function ip(data, rule_values=[]){
    // Purpose: This function checks if the input is an IP address

    // Arguments:
    // - data: The input data
    // - rule_values: The IP version

    // Returns:
    // - boolean: True if the input is an IP address, False otherwise
    // - string: The error message if the input is not an IP address, an empty string otherwise

    try{
        if(rule_values.length === 0) {
            return [false, 'The IP version is not provided'];
        }
        let ip_version = rule_values[0];

        if(!ip_version) {
            if(/^(\d{1,3}\.){3}\d{1,3}$/.test(data) || /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(data)){
                return [true, ''];
            }
            return [false, 'The :attribute must be an IP address'];
        }

        if(ip_version === 'v4'){
            if (/^(\d{1,3}\.){3}\d{1,3}$/.test(data)) {
                return [true, ''];
            }
        }else if(ip_version === 'v6'){
            if (/^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(data)) {
                return [true, ''];
            }
        }else{
            return [false, 'The IP version must be 4 or 6'];
        }

        return [false, 'The :attribute must be an IP address of version '+ip_version];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function less_than(data, rule_values=[], request_body={}){
    // Purpose: This function checks if the input is less than the other field's value

    // Arguments:
    // - data: The input data
    // - rule_values: The other field name

    // Returns:
    // - boolean: True if the input is less than the other field's value, False otherwise
    // - string: The error message if the input is not less than the other field's value, an empty string otherwise

    try{
        if(rule_values.length === 0) {
            return [false, 'The other field is not provided'];
        }
        let other_field = rule_values[0];

        if(request_body[other_field]){
            $target_data = request_body[other_field];
        }else{
            return [false, other_field+' is not present in the request'];
        }

        if(data < request_body[other_field]){
            return [true, ''];
        }

        return [false, 'The :attribute must be less than '+other_field];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function less_than_or_equal(data, rule_values=[], request_body={}){
    // Purpose: This function checks if the input is less than or equal to the other field's value

    // Arguments:
    // - data: The input data
    // - rule_values: The other field name

    // Returns:
    // - boolean: True if the input is less than or equal to the other field's value, False otherwise
    // - string: The error message if the input is not less than or equal to the other field's value, an empty string otherwise

    try{
        if(rule_values.length === 0) {
            return [false, 'The other field is not provided'];
        }
        let other_field = rule_values[0];

        if(request_body[other_field]){
            $target_data = request_body[other_field];
        }else{
            return [false, other_field+' is not present in the request'];
        }

        if(data <= request_body[other_field]){
            return [true, ''];
        }

        return [false, 'The :attribute must be less than or equal to '+other_field];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function mac_address(data){
    // Purpose: This function checks if the input is a MAC address

    // Arguments:
    // - data: The input data

    // Returns:
    // - boolean: True if the input is a MAC address, False otherwise
    // - string: The error message if the input is not a MAC address, an empty string otherwise

    try{
        if(/^([0-9a-fA-F]{2}[:-]){5}[0-9a-fA-F]{2}$/.test(data)){
            return [true, ''];
        }

        return [false, 'The :attribute must be a MAC address'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function max(data, rule_values=[]){
    // Purpose: This function checks if the input is less than or equal to the expected value

    // Arguments:
    // - data: The input data
    // - rule_values: The expected value

    // Returns:
    // - boolean: True if the input is less than or equal to the expected value, False otherwise
    // - string: The error message if the input is not less than or equal to the expected value, an empty string otherwise

    try{
        if(rule_values.length === 0) {
            return [false, 'The expected value is not provided'];
        }
        let expected_value = rule_values[0];

        if(data <= expected_value){
            return [true, ''];
        }

        return [false, 'The :attribute must be less than or equal to '+expected_value];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function min(data, rule_values=[]){
    // Purpose: This function checks if the input is greater than or equal to the expected value

    // Arguments:
    // - data: The input data
    // - rule_values: The expected value

    // Returns:
    // - boolean: True if the input is greater than or equal to the expected value, False otherwise
    // - string: The error message if the input is not greater than or equal to the expected value, an empty string otherwise

    try{
        if(rule_values.length === 0) {
            return [false, 'The expected value is not provided'];
        }
        let expected_value = rule_values[0];

        if(data >= expected_value){
            return [true, ''];
        }

        return [false, 'The :attribute must be greater than or equal to '+expected_value];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function not_in_array(data, rule_values, request_body){
    // Purpose: This function checks if the input is not in the other field's array

    // Arguments:
    // - data: The input data
    // - rule_values: The other field name

    // Returns:
    // - boolean: True if the input is not in the array, False otherwise
    // - string: The error message if the input is in the array, an empty string otherwise

    try{
        if(rule_values.length === 0) {
            return [false, 'Target field is not provided'];
        }
        if(!request_body[rule_values[0]]) {
            return [false, 'The target field ('+rule_values[0]+') is not present in the request'];
        }
        let array_response = array(request_body[rule_values[0]]);

        if(!array_response[0]) {
            array_response[1] = 'The target field ('+rule_values[0]+') must be an array';
            return array_response;
        }
        let target_array = JSON.parse(request_body[rule_values[0]]);

        if (!target_array.includes(data)) {
            return [true, ''];
        }

        return [false, 'The :attribute must not be in the '+rule_values[0]];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function not_regex(data, rule_values=[]){
    // Purpose: This function checks if the input does not match the expected regex

    // Arguments:
    // - data: The input data
    // - rule_values: The regex pattern

    // Returns:
    // - boolean: True if the input does not match the regex, False otherwise
    // - string: The error message if the input matches the regex, an empty string otherwise

    try{
        if(rule_values.length === 0) {
            return [false, 'The regex pattern is not provided'];
        }
        let regex_pattern = rule_values[0];

        if(!new RegExp(regex_pattern).test(data)){
            return [true, ''];
        }

        return [false, 'The :attribute must not match the regex pattern'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function numeric(data){
    // Purpose: This function checks if the input is numeric

    // Arguments:
    // - data: The input data

    // Returns:
    // - boolean: True if the input is numeric, False otherwise
    // - string: The error message if the input is not numeric, an empty string otherwise

    try{
        if(!isNaN(data)){
            return [true, ''];
        }

        return [false, 'The :attribute must be numeric'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function regex(data, rule_values=[]){
    // Purpose: This function checks if the input matches the expected regex

    // Arguments:
    // - data: The input data
    // - rule_values: The regex pattern

    // Returns:
    // - boolean: True if the input matches the regex, False otherwise
    // - string: The error message if the input does not match the regex, an empty string otherwise

    try{
        if(rule_values.length === 0) {
            return [false, 'The regex pattern is not provided'];
        }
        let regex_pattern = rule_values[0];

        if(new RegExp(regex_pattern).test(data)){
            return [true, ''];
        }

        return [false, 'The :attribute must match the regex pattern'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function required(data){
    // Purpose: This function checks if the input is present

    // Arguments:
    // - data: The input data

    // Returns:
    // - boolean: True if the input is present, False otherwise
    // - string: The error message if the input is not present, an empty string otherwise

    try{
        if(data){
            return [true, ''];
        }

        return [false, 'The :attribute is required'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}


function required_if(data, rule_values=[], request_body={}){
    // Purpose: This function checks if the input is present if the other field condition is met

    // Arguments:
    // - data: The input data
    // - rule_values: other field, operation, expected value

    // Returns:
    // - boolean: True if the input is present, False otherwise
    // - string: The error message if the input is not present, an empty string otherwise

    // The other field must be present in the request
    // The operation must be one of the following: ==, !=, <, >, <=, >=
    // The expected value must be present

    // If only one parameter is present, the input must be present if the other field is present
    // If two parameters are present, the input must be present if the other field has the expected value
    // If three parameters are present, the input must be present if the other field has the expected value based on the operation

    try{
        let other_field = rule_values[0];
        let operation = rule_values[1];
        let expected_value = rule_values[2];

        if (!operation && !expected_value) {
            if (request_body[other_field]) {
                return required(data);
            }else {
                return [true, ''];
            }
        }else if (operation && !expected_value) {
            expected_value = operation;
            operation = '==';
        }

        if(!['==', '!=', '<', '>', '<=', '>='].includes(operation)) {
            return [false, 'The operation must be one of the following: ==, !=, <, >, <=, >='];
        }

        if(check_if(request_body[other_field], operation, expected_value)) {
            return required(data);
        }else{
            return [true, ''];
        }
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function timezone(data){
    // Purpose: This function checks if the input is a timezone

    // Arguments:
    // - data: The input data

    // Returns:
    // - boolean: True if the input is a timezone, False otherwise
    // - string: The error message if the input is not a timezone, an empty string otherwise

    try{
        const timezone_set = new Set(timezones);
        if(timezone_set.has(data)){
            return [true, ''];
        }

        return [false, 'The :attribute must be a timezone'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

function url(data){
    // Purpose: This function checks if the input is a URL

    // Arguments:
    // - data: The input data

    // Returns:
    // - boolean: True if the input is a URL, False otherwise
    // - string: The error message if the input is not a URL, an empty string otherwise

    try{
        if(/^https?:\/\/[^\s]+$/.test(data)){
            return [true, ''];
        }

        return [false, 'The :attribute must be a URL'];
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}

module.exports = {
    accepted, accepted_if, after, after_or_equal, alpha, alpha_dash, alpha_num, alpha_num_dash, array, before, before_or_equal, between, between_date, between_exclusive, between_date_exclusive, boolean, check_if, confirmed, date, date_equals, decimal, declined, declined_if, different, distinct, email, in_array, integer, ip, less_than, less_than_or_equal, mac_address, max, min, not_in_array, not_regex, numeric, regex, required, required_if, timezone, url
};

function check_if(other_field_value, operation, expected_value) {
    // Purpose: This function checks if the other field value meets the expected condition

    // Arguments:
    // - other_field_value: The other field value
    // - operation: The operation
    // - expected_value: The expected value

    // Returns:
    // - boolean: True if the other field value meets the expected condition, False otherwise
    
    try{
        if(operation === '==') {
            if(other_field_value === expected_value) {
                return true;
            }
        }else if(operation === '!=') {
            if(other_field_value !== expected_value) {
                return true;
            }
        }else if(operation === '<') {
            if(other_field_value < expected_value) {
                return true;
            }
        }else if(operation === '>') {
            if(other_field_value > expected_value) {
                return true;
            }
        }else if(operation === '<=') {
            if(other_field_value <= expected_value) {
                return true;
            }
        }else if(operation === '>=') {
            if(other_field_value >= expected_value) {
                return true;
            }
        }
        return false
    }catch(e){
        console.log(e);

        return [false, 'Unexpected error occurred.'];
    }
}
