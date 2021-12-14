# API

## REST

### User management

#### Creation

```
curl http://localhost:5555/rest/users -d '{"username": "barfooz"}' -H "content-type: application/json"

-->

{"user":{"id":1,"username":"barfooz","apiKey":"73d6d6b4-953b-49b8-b2c1-09a958f557de","updatedAt":"2021-12-14T08:25:57.885Z","createdAt":"2021-12-14T08:25:57.885Z"}}
```

#### Lookup

```
curl http://localhost:5555/rest/users/me -H 'api-key: 73d6d6b4-953b-49b8-b2c1-09a958f557de' -H "content-type: application/json"

-->

{"user":{"id":1,"username":"barfooz","apiKey":"73d6d6b4-953b-49b8-b2c1-09a958f557de","createdAt":"2021-12-14T08:25:57.885Z","updatedAt":"2021-12-14T08:25:57.885Z"}}
```

### Image management

#### Creation

```
curl http://localhost:555/rest/images -H 'api-key: 73d6d6b4-953b-49b8-b2c1-09a958f557de' -H "content-type: application/json" -d {"data": Buffer}
```