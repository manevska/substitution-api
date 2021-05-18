# Substitution API

This project contains a single lambda function triggered by an HTTP request made on the provisioned API Gateway REST API `/replace` route with `POST` method. The request body must be provided as `application/json`. The body structure is defined in `substitute-service/models/sentence.request.model.ts` model: it must contain the `sentence` property.

### Locally

In order to test the rep function locally, run the following command from the substitute-service directory:

- `npx sls invoke local -f ReplaceWord --path mock.json` 


### Remotely

Copy and paste this `curl` command in your terminal or in Postman to test this api. Optionally: replace the `sentence` parameter in the body with your value.

```
curl --location --request POST 'https://c6pck03mz1.execute-api.eu-west-1.amazonaws.com/test/replace' \
--header 'Content-Type: application/json' \
--data-raw '{
    "sentence": "We really like the new security features of Google Cloud"
}'
```

## Project structure

The project code base is divided in:  

- `core` - containing globally used models and services shared among multiple micro-services
- `substitute-service` - service for the substitution (word replacement)

```
.
├── src
│   ├── core                                    # Globally shared models and services
│   │   ├── models                          
│   │   │   └── service.response.model.ts       # Service Error and response models
│   │   ├── services
│   │   │   └── ApiGatewayResponse.service.ts   # ApiGateway error and response models
│   │   │
│   │   └── index.ts                            # Import/export of all global services
│   │
│   └── substitute-service                      # Word replacement micro-service
│       ├── constants                          
│       │   └── ReplacableWords.ts              # Key-value pair of words and their replacements 
│       ├── models                              
│       │   └── sentence.request.model.ts       # Request model
│       ├── services
│       │   └── ReplaceWordService.ts           # Lambda function for the word replacement
│       └── src                                
│           └── handlers                        # Function for the word replacement
│               └── SubstituteController.ts     # Replace Word handler
│
├── mock.json                                   # Example request for local testing
├── package.json
├── serverless.ts                               # Serverless service file
├── tsconfig.json                               # Typescript compiler configuration
└── webpack.config.js                           # Webpack configuration

```
