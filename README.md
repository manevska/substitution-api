# Substitution API

This project consists of two lambda functions triggered by HTTP requests made on the provisioned API Gateway REST APIs.
1. The first Lambda function is used for replacing the key words with their substitutes in a sentence. 
    - It's triggered by a REST API request on the `/replace` route with `POST` method. 
    - The request body must be provided as `application/json`. 
    - The body structure is defined in `substitute-service/models/sentence.request.model.ts` model: it <b>must</b> contain the `sentence` property.
2. The second Lambda function is used for adding new key words and their substitutes to the database for further use by the first function. 
    - It's triggered by a REST API request on the `/add` route with `POST` method.
    - The request body must be provided as `application/json`.
    - The body structure is defined in `substitute-service/models/word.request.model.ts` model: it <b>must</b> contain the `word` and `substitute` properties.

### Locally

In order to test the replace function locally, run the following command from the substitute-service directory:

- `npx sls invoke local -f ReplaceWord --path mock.json` 


## Remotely
### Replace
Copy and paste this `curl` command in your terminal or in Postman to test the substitution api. Optionally: replace the `sentence` parameter in the body with your value.
<b> 
NOTE: Test examples already in db are:
- Amazon -> Amazon©
- Deloitte -> Deloitte©
- Google -> Google© 
- Microsoft -> Microsoft©
- Oracle -> Oracle©. 
</b>

```
curl --location --request POST 'https://ddidyckjhd.execute-api.eu-west-1.amazonaws.com/dev/replace' \
--header 'Content-Type: application/json' \
--data-raw '{
    "sentence": "We really like the new security features of Google Cloud"
}'
```
### Add
Copy and paste this `curl` command in your terminal or in Postman to test the adding new words api. Optionally: replace the `word` and `substitute` parameters in the body with your values.

```
curl --location --request POST 'https://ddidyckjhd.execute-api.eu-west-1.amazonaws.com/dev/add' \
--header 'Content-Type: application/json' \
--data-raw '{
    "word": "Company",
    "substitute": "Company©"
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
│       ├── actions                          
│       │   └── DynamoDB.ts                     # DynamoDB Manager 
│       ├── models                              
│       │   ├── sentence.request.model.ts       # Request model for substitution
        │   └── word.request.model.ts           # Request model for adding words 
│       ├── services
│       │   ├── ReplaceWordService.ts           # Lambda function for the word replacement
│       │   └── AddWordService.ts               # Lambda function for adding new words in db
│       └── src                                
│           └── handlers                        # Function for the word replacement
│               ├── SubstituteController.ts     # Replace Word handler
│               └── WordsController.ts          # Add Word handler
│
├── mock.json                                   # Example request for local testing
├── package.json
├── provider_role_statements.yml                # AWS IAM role statements
├── serverless.ts                               # Serverless service file
├── tsconfig.json                               # Typescript compiler configuration
└── webpack.config.ts                           # Webpack configuration

```
