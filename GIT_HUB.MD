# 🐱 Autenticación con GitHub en Spring Boot usando Firebase

Este proyecto permite implementar autenticación de usuarios mediante **GitHub** utilizando **Firebase Authentication** como intermediario y **Spring Boot** para validar el `ID Token` (JWT) emitido por Firebase.

---

## 🚀 Tecnologías utilizadas

- Java 17+
- Spring Boot 3+
- Firebase Admin SDK
- GitHub OAuth 2.0
- JSON Web Tokens (JWT)
- Maven

---

## 🔧 Configuración de Firebase para GitHub

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
2. Ve a **Authentication > Métodos de inicio de sesión**.
3. Activa el proveedor **GitHub**.
4. Registra tu aplicación en [GitHub Developer Settings](https://github.com/settings/developers):
   - Crea una OAuth App.
   - Usa como URI de redirección:
     ```
     https://<tu-proyecto>.firebaseapp.com/__/auth/handler
     ```
   - Obtén el `Client ID` y `Client Secret`.
5. Pega el `Client ID` y `Client Secret` en la configuración de Firebase.

6. Descarga el archivo `serviceAccountKey.json` desde Firebase y colócalo en `src/main/resources/`.

---

## 🔁 Flujo de autenticación

1. El usuario inicia sesión con su cuenta de **GitHub** desde el frontend usando Firebase SDK.
2. Firebase autentica al usuario y devuelve un **ID Token** (JWT).
3. El frontend envía este token al backend.
4. El backend en Spring Boot valida el token con Firebase Admin SDK.
5. Si el token es válido, se otorga acceso a los recursos protegidos.

---

## 📦 Endpoint principal

### POST `/api/auth/login`

```json
{
  "token": "ID_TOKEN_DE_FIREBASE"
}
