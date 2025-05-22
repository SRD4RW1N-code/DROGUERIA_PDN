# 📘 Autenticación con Facebook en Spring Boot usando Firebase

Este proyecto demuestra cómo implementar autenticación de usuarios mediante **Facebook** utilizando **Firebase Authentication** en el frontend y **Spring Boot** en el backend. Firebase se encarga de generar un `ID Token` (JWT), el cual se valida en el servidor para autorizar solicitudes protegidas.

---

## 🚀 Tecnologías utilizadas

- Java 17+
- Spring Boot 3+
- Firebase Admin SDK
- Facebook OAuth 2.0
- JSON Web Tokens (JWT)
- Maven

---

## 🔧 Configuración de Firebase para Facebook

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
2. Ve a **Authentication > Métodos de inicio de sesión**.
3. Activa el proveedor **Facebook**.
4. Registra tu aplicación en [Facebook for Developers](https://developers.facebook.com/):
   - Obtén el `App ID` y el `App Secret`.
   - Configura la URI de redirección:  
     ```
     https://<tu-proyecto>.firebaseapp.com/__/auth/handler
     ```
5. Pega el `App ID` y `App Secret` en la configuración de Firebase.

6. Descarga el archivo `serviceAccountKey.json` desde la consola de Firebase y colócalo en `src/main/resources/`.

---

## 🔁 Flujo de autenticación

1. El usuario inicia sesión con su cuenta de **Facebook** en el frontend usando Firebase SDK.
2. Firebase autentica al usuario y devuelve un **ID Token**.
3. El frontend envía ese token JWT al backend.
4. El backend (Spring Boot) valida el token con Firebase Admin SDK.
5. Si el token es válido, se autoriza el acceso a recursos protegidos.

---

## 📦 Endpoint principal

### POST `/api/auth/login`

```json
{
  "token": "ID_TOKEN_DE_FIREBASE"
}
