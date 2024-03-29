# Check Requests

## Table of Contents
* Installaion (#installation)
* Usuage (#usuage)
* Api (#api)
* Rules (#rules)
* Initialization (#initialization)
* Example (#example)

## Installation

You can install Check Requests via npm:

```bash
npm install check_requests
```


## Usage
To use Check Requests in your Node.js application, require it as follows:

``` Javascript
const { validateRequest } = require('check_requests');
```

Then, you can validate requests by calling the validateRequest function with the appropriate parameters. Here's an example:

```
const request = {
    body: {
        // Your request body here
    }
};

const rules = {
    // Your validation rules here
};

const customErrors = {
    // Your custom error messages here (optional)
};

const [isValid, errors, successes] = validateRequest(request, rules, customErrors);

if (isValid) {
    console.log('Validation successful!');
    console.log('Successfully validated fields:', successes);
} else {
    console.error('Validation failed!');
    console.error('Validation errors:', errors);
}

```

## API

```
validateRequest(request, rules, customErrors)
```
This function validates a request against a set of rules.

```
**request**: The request object to be validated.

**rules**: An object containing validation rules for each field.

**customErrors**: An optional object containing custom error messages.
```
Returns an array with the following elements:

```
**isValid**: A boolean indicating whether the validation was successful.

**errors**: An object containing validation errors, if any.

**successes**: An array of successfully validated fields.
```

## Rules

Here are the rules and their parameters that can be accepted

| Rule        | Parameters           | Description  |
| ------------- |:-------------:| -----:|
| accepted      | - | The field must be present and value equal to ```true```, ```yes```, ```1```, ```y```, ```t``` or ```on``` |
| accepted_if      | ```field_name```,```{operation/value}```,```{value}```      |   The field must be present and ```accepted``` the specified condition is met |
| after | ```date``` | The field under validation must be after the entered ```date``` |
| after_or_equal | ```date``` | The field under validation must be same as or after the entered ```date``` |
| alpha | - | The field under validation must contain only english alphabets ```A-Z``` ```a-z``` |
| alpha_dash | - | The field under validation must contain only english alphabets, underscores or dash |
| alpha_num | - | The field under validation must contain only english alphabets or numbers |
| alpha_num_dash | - | The field under validation must contain only english alphabets, numbers, underscores or dash |
| array | - | The field under validation must be an array |
| before | ```date``` | The field under validation must be before the entered ```date``` |
| before_or_equal | ```date``` | The field under validation must be same as or before the entered ```date``` |
| between | ```min```,```max``` | The field under validation must be between ```min``` and ```max``` value *(inclusive)* |
| between_date | ```min```,```max``` | The field under validation must be between ```min``` and ```max``` date value *(inclusive)* |
| between_date_exclusive | ```min```,```max``` | The field under validation must be between ```min``` and ```max``` date value *(exclusive)* |
| between_exclusive | ```min```,```max``` | The field under validation must be between ```min``` and ```max``` value *(exclusive)* |
| boolean | - | The field under validation must be a boolean value ```true```, ```yes```, ```1```, ```y```, ```t```, ```on```, ```false```, ```no```, ```0```, ```n```, ```f```, ```off``` |
| confirmed | {```field_name```} | The field under validation must have same value as ```field_name``` else of same value as field whose name is field under validation with ```_confirmation``` at the end, like ```password``` and ```password_confirmation``` |
| date | - | The field under validation must be date |
| date_equals | ```date``` | The field under validation must be equal to the entered ```date``` |
| decimal | ```length``` | The field under validation must be decimal with no of digits after decimal equal to ```length``` |
| declined | - | The field under validation must be present and equal to ```false```, ```no```, ```0```, ```n```, ```f```, ```off``` |
| declined_if      | ```field_name```,```{operation/value}```,```{value}```      |   The field under validation must be present and ```declined``` the specified condition is met |
| different | ```field_name```, {```other_field_names```} | The field under validation must have value different from the values of provided ```fields``` |
| distinct | - | The field under validation must be an ```array``` with distinct values |
| email | - | The field under validation must be a valid email |
| equal | ```value``` | The field under validation must be equal to ```value``` |
| exclude | - | The field with this rule will be excluded from success fields even if other validations are successfull |
| greater_than | ```other_field``` | The field under validation must have value greater than that of ```other_field``` |
| greater_than_or_equal | ```other_field``` | The field under validation must have value greater than or equal to that if ```other_field``` |
| in_array | ```other_field``` | The field under validation must have value present in ```other_field``` which is an array |
| integer | - | The field under validation must have a integer value |
| ip | {```version```} | The field under validation must be an IP address of version 6 if parameter is ```6``` or of version 4 if parameter is ```4``` or any one if no parameter is passed |
| less_than | ```other_field``` | The field under validation must have value less than that of ```other_field``` |
| less_than_or_equal | ```other_field``` | The field under validation must have value less than or equal to that if ```other_field``` |
| mac_address | - | The field under validation must be a valid mac address |
| max | ```value``` | The field under validation must have value which length must be less than or equal to ```value``` |
| min | ```value``` | The field under validation must have value which length must be greater than or equal to ```value``` |
| not_equal | ```value``` | The field under validation mustn't have value equal to ```value``` |
| not_in_array | ```other_field``` | The field under validation must have value that is not present in ```other_field``` which is an array |
| not_regex | ```regex_exp``` | The field under validation must have value that doesn't match the ```regex_exp``` |
| numeric | - | The field under validation must have numeric value |
| regex | ```regex_exp``` |  The field under validation must have value that matches the ```regex_exp``` |
| required | - | The field under validation must be present in request body |
| required_if | ```field_name```,```{operation/value}```,```{value}```      |   The field must be present if the specified condition is met |
| timezone | - | The field under validation must be a timezone |
| url | - | The field under validation must be URL |


## Examples
Here are some examples demonstrating how to use Check Requests in various scenarios.

```
import express from 'express';
import bodyParser from 'body-parser';
import { validateRequest } from 'check_requests';

const app = express();
const port = 3000;

// Middleware to parse urlencoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to parse json bodies
app.use(express.json());

app.post('/', (req, res) => {
    // Define validation rules
    const rules = {
        "first_name": ["alpha"],
        "last_name": ["alpha"],
        "user_name": ["required","alpha_num_dash"],
        "date_of_birth": ["before:2000-01-01"],
        "date_of_joining": ["after:2020-01-01"],
        "email": ["required","email"],
        "consent": ['required', 'accepted_if:email'],
        "age": ["required","numeric","between:20,60"],
        "password": ["required","confirmed"],
        "gender": ["required","boolean"],
        "hobbies": ["array"]
    };
    // Validate request body
    let [isValid, errors, successes]= validateRequest(req, rules, []);
    
    console.log([isValid, errors, successes]);

    if(isValid){
        res.send('Request Vaidated');
    }else{
        res.send('Request not validated');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

```
### Thank You

## Author


| Name          | Sulabh Nepal         |
| ------------- |:-------------:       |
| Email         | me@sulabh.info.np    |