# 🔐 Autenticación con Google en Spring Boot usando Firebase

Este proyecto muestra cómo implementar autenticación con **Google** en una aplicación **Spring Boot**, utilizando **Firebase Authentication**. El token `idToken` generado por Firebase es validado por el backend para autorizar al usuario.

---

## 🚀 Tecnologías

- Spring Boot
- Firebase Authentication
- Google OAuth 2.0
- JSON Web Tokens (JWT)

---

## 🔧 Configuración

### Firebase

1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Crear un proyecto.
3. Habilitar el método de autenticación **Google**.
4. Descargar `serviceAccountKey.json` y colocarlo en `src/main/resources/`.

---

## 🔁 Flujo de autenticación

1. El usuario inicia sesión con Google en el frontend usando Firebase SDK.
2. Firebase devuelve un `idToken` JWT.
3. El frontend envía ese token al backend (Spring Boot).
4. El backend verifica el token con Firebase Admin SDK.

---

## 📦 Endpoint

```http
POST /api/auth/login
Body: {
  "token": "ID_TOKEN_DE_FIREBASE"
}
