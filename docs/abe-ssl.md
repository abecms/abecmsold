# create localhost ssl website

```javascript
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
```

You will be asked a couple of questions… 

```javascript
openssl rsa -in key.pem -out newkey.pem && mv newkey.pem key.pem
```

Move files into website folder

- cert.pem
- key.pem