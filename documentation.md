# Project Documentation

## Installation

```
npm i check_requests
```

## Initialization

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
        "field_name1":["rule1","rule2:condition"],
        "field_name2":["rule3:condition1,condition2"]
    };

    const custom_errors ={  //optional data if not provided default messages will be shown
        "field_name1":{
            "rule1":"Rule 1 failed in field_name1",
            "rule2":"Message to be displayed in case rule2 is not satisfied by field1"
        }
    }
    // Validate request body
    let [isValid, errors, successes]= validateRequest(req, rules, custom_errors);

    // isValid is either true or false
    // - True if all the rules are satisfied
    // - False if one or more than one rule is not satisfied

    // errors
    // object containing field name and error messages for failed validations
    // {
    //    "field_name1" :["Rule 1 failed in field_name1", "Message to be displayed in case rule2 is not satisfied by field1"]
    // }

    // successes
    // array containing field names whose all rules are satisfied

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