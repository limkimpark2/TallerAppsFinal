# Realtime App Vue2

## Instalar dependencias

```bash
yarn install
# o
npm install
```

## Variables de entorno

En el archivo `.env` se encuentra las variables de entorno que se usan en la aplicacion

```bash
# SERVER
HOST=http://localhost
PORT=3001

# SOCKET ADMIN UI
SOCKET_ADMIN_UI_USERNAME=omar
SOCKET_ADMIN_UI_PASSWORD=$2a$12$euFXzmKk2PHlGxwvNLGh6ueDCoWSTsHBXQkhg1EiymT4bud4rCEJS # "OmarTaboada" encriptado con bcrypt

# CLIENT
VITE_SOCKET_HOST=${HOST}
VITE_SOCKET_PORT=${PORT}
```

## Correr aplicaciones

### Aplicacion cliente

```bash
yarn dev
# o
npm rurn dev
```

Y se puede ingresar a: [http://localhost:5173](http://localhost:5173)

### Aplicacion servidor y socket

```bash
node server/index.js
```

### Aplicacion Socket Admin UI

Ingresar a [http://localhost:3001/admin-ui#/](http://localhost:3001/admin-ui#/) (host y puerto cambiar de acuerdo a las variables de entorno) ingresar las credenciales: Username: `omar` y Password: `OmarTaboada`, que estan establecidas en el archivo de variables de entorno `.env`
