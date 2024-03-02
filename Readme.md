# Check Requests

## Table of Contents
* Installaion
* Usuage
* Api
* Example

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