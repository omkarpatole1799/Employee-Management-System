### Dev branch

## End Points

# Login [POST]

END_POINT - IP/auth/login

```
-sendData: {
  "email": "1",
  "password" : "1"
}
```

- ERROR RESPONSES
```
{
  "success": false,
  "error_status": 500,
  "message": "Incorrect username or password"
}
```

- SUCCESS RESPONSE
```
{
  "success": true,
  "message": "authenticated",
  "token": <jwt_token> 
}
```


![alt text](image.png)