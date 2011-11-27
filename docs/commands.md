## Public

### Users

#### List

curl -X GET http://127.0.0.1:8001/v1.0/users

#### Get

curl -X GET http://127.0.0.1:8001/v1.0/users/kami

## Admin API

### Users

#### Create

curl -X POST -H "content-type: application/json" -H "x-api-key: foo" \
http://127.0.0.1:8001/v1.0/users --data-binary \
'{"username":"Kami", "email": "tomaz@tomaz.me", "aliases": ["Kami", "kami", "Tomaz Muraus"]}'

#### Delete

curl -X DELETE -H "content-type: application/json" -H "x-api-key: foo" \
http://127.0.0.1:8001/v1.0/users/kami


### Providers

#### Register

curl -X POST -H "content-type: application/json" -H "x-api-key: foo" \
http://127.0.0.1:8001/v1.0/providers/register --data-binary \
'{"name":"github", "description": "Github provider"}'
