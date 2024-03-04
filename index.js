// Importing validation rules
const { accepted, accepted_if, after, after_or_equal, alpha, alpha_dash, alpha_num, alpha_num_dash, array, before, before_or_equal, between, boolean, confirmed, date, date_equals, decimal, declined, declined_if, different, distinct, email, equal, greater_than, greater_than_or_equal, in_array, integer, ip, less_than, less_than_or_equal, mac_address, max, min, not_equal, not_in_array, not_regex, numeric, regex, required, required_if, timezone, url } = require('./src/rules.js');

// Function to validate request against rules
function validateRequest(request, rules, custom_errors = []) {

    try{
        // Object to store errors
        let errors = {};
        // Array to store successfully validated fields
        let successes = [];

        if(typeof request.body !== 'object') {
            return [false, 'Request body should be an object'];
        }

        if(typeof rules !== 'object') {
            return [false, 'Validation rules should be an object'];
        }

        if(typeof custom_errors !== 'object') {
            return [false, 'Custom errors should be an object'];
        }

        // Iterating through each field in the rules object
        for (let field in rules) {
            // Accessing the rules for the current field
            let field_rules = rules[field];
            let response = [];

            if (!Array.isArray(field_rules)) {
                return [false, 'Validation rules should be an array'];
            }

            // Checking for 'required_if' rule
            let required_if_regex = new RegExp(/required_if:(.*)/);
            let required_if_match = field_rules.filter(item => required_if_regex.test(item));
            let required_if_index = -1;
            if (required_if_match.length > 1) {
                required_if_index = field_rules.indexOf(required_if_match[0]);
            }

            // Validating the field based on rules of required and required_if
            if (!request.body[field] && !field_rules.includes('required')) {
                continue;
            } else if (field_rules.includes('required')) {
                response = required(request.body[field]);
            } else if (required_if_index > -1) {
                let rule = field_rules[required_if_index];
                rule = rule.split(':');
                let field_rules = rule[1].split(',');
                response = required_if(request.body[field], field_rules, request.body);
            }

            // Handling validation errors
            if (response[0]==false) {
                let error_message = '';
                if (custom_errors[field] && custom_errors[field]['required']) {
                    error_message = custom_errors[field]['required'];
                } else {
                    error_message = response[1].replace(':attribute', field);
                }
                if (errors[field]) {
                    errors[field].push(error_message);
                } else {
                    errors[field] = [error_message];
                }
                continue;
            }

            // Skipping validation if field is nullable and empty
            if (field_rules.includes('nullable') && (request.body[field] === '' || request.body[field] === null)) {
                if (!field_rules.includes('exclude')) {
                    successes.push(field);
                }
                continue;
            }

            // Iterating through each rule for the current field
            field_rules.forEach(rule => {
                rule = rule.split(':');
                let rule_name = rule[0];
                let rule_values = [];
                if(rule.length > 1) {
                    rule_values = rule[1].split(',');
                }
                let response = [];
                switch (rule_name.toLowerCase()) {
                    case 'accepted':
                        response = accepted(request.body[field]);
                        break;
                    case 'accepted_if':
                        response = accepted_if(request.body[field], rule_values, request.body);
                        break;
                    case 'after':
                        response = after(request.body[field], rule_values);
                        break;
                    case 'after_or_equal':
                        response = after_or_equal(request.body[field], rule_values);
                        break;
                    case 'alpha':
                        response = alpha(request.body[field]);
                        break;
                    case 'alpha_dash':
                        response = alpha_dash(request.body[field]);
                        break;
                    case 'alpha_num':
                        response = alpha_num(request.body[field]);
                        break;
                    case 'alpha_num_dash':
                        response = alpha_num_dash(request.body[field]);
                        break;
                    case 'array':
                        response = array(request.body[field]);
                        break;
                    case 'before':
                        response = before(request.body[field], rule_values);
                        break;
                    case 'before_or_equal':
                        response = before_or_equal(request.body[field], rule_values);
                        break;
                    case 'between':
                        response = between(request.body[field], rule_values);
                        break;
                    case 'between_date':
                        response = between_date(request.body[field], rule_values);
                        break;
                    case 'between_exclusive':
                        response = between_exclusive(request.body[field], rule_values);
                        break;
                    case 'between_date_exclusive':
                        response = between_date_exclusive(request.body[field], rule_values);
                        break;
                    case 'boolean':
                        response = boolean(request.body[field]);
                        break;
                    case 'confirmed':
                        response = confirmed(request.body[field], rule_values, request.body, field);
                        break;
                    case 'date':
                        response = date(request.body[field]);
                        break;
                    case 'date_equals':
                        response = date_equals(request.body[field], rule_values);
                        break;
                    case 'decimal':
                        response = decimal(request.body[field], rule_values);
                        break;
                    case 'declined':
                        response = declined(request.body[field]);
                        break;
                    case 'declined_if':
                        response = declined_if(request.body[field], rule_values, request.body);
                        break;
                    case 'different':
                        response = different(request.body[field], rule_values, request.body);
                        break;
                    case 'distinct':
                        response = distinct(request.body[field]);
                        break;
                    case 'email':
                        response = email(request.body[field]);
                        break;
                    case 'equal':
                        response = equal(request.body[field], rule_values);
                        break;
                    case 'exclude':
                        response = [true, ''];
                        break;
                    case 'greater_than':
                        response = greater_than(request.body[field], rule_values, request.body);
                        break;
                    case 'greater_than_or_equal':
                        response = greater_than_or_equal(request.body[field], rule_values, request.body);
                        break;
                    case 'in_array':
                        response = in_array(request.body[field], rule_values, request.body);
                        break;
                    case 'integer':
                        response = integer(request.body[field]);
                        break;
                    case 'ip':
                        response = ip(request.body[field], rule_values);
                        break;
                    case 'less_than':
                        response = less_than(request.body[field], rule_values, request.body);
                        break;
                    case 'less_than_or_equal':
                        response = less_than_or_equal(request.body[field], rule_values, request.body);
                        break;
                    case 'mac_address':
                        response = mac_address(request.body[field]);
                        break;
                    case 'max':
                        response = max(request.body[field], rule_values);
                        break;
                    case 'min':
                        response = min(request.body[field], rule_values);
                        break;
                    case 'not_equal':
                        response = not_equal(request.body[field], rule_values);
                        break;
                    case 'not_in_array':
                        response = not_in_array(request.body[field], rule_values, request.body);
                        break;
                    case 'not_regex':
                        response = not_regex(request.body[field], rule_values);
                        break;
                    case 'numeric':
                        response = numeric(request.body[field]);
                        break;
                    case 'regex':
                        response = regex(request.body[field], rule_values);
                        break;
                    case 'timezone':
                        response = timezone(request.body[field]);
                        break;
                    case 'url':
                        response = url(request.body[field]);
                        break;                
                    default:
                        response = [false, rule_name+' Rule not found'];
                        break;
                }
                // Handling validation errors
                if(!response[0]) {
                    let error_message = '';
                    if (custom_errors[field] && custom_errors[field][rule_name]) {
                        error_message = custom_errors[field][rule_name];
                    } else {
                        error_message = response[1].replace(':attribute', field);
                    }
                    if(errors[field]) {
                        errors[field].push(error_message);
                    }else {
                        errors[field] = [error_message];
                    }
                }
            });
            // Adding field to successes if no errors
            if(!errors[field] && !field_rules.includes('exclude')) {
                successes.push(field);
            }
        }
        // Returning errors and successes
        if (Object.keys(errors).length > 0) {
            return [false, errors, successes];
        }
        // Returning successes
        return [true, [], successes];
    }catch(err){
        console.log(err);
        return [false, err.message, []];
    }
}
module.exports = {
    validateRequest
};