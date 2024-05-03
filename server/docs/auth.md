# API Documentation for `/auth`

This document provides information about the endpoints available in the `/auth` route.

## Table of Contents

- [Verify User](#verify-user)
- [Register User](#register-user)
- [Login User](#login-user)

## Verify User

**Endpoint:** `/auth/verify`

**Method:** `GET`

**Description:** This endpoint is used to verify if a user is authenticated.

**Headers:**

- `Authorization`: Bearer token for the authenticated user.

**Response:**

- `200 OK` on success, returns `{ success: true }`.
- `401 Unauthorized` if the token not provided, returns `{ error: true, message: "Token not received" }`.
- `403 Forbidden` if the token is invalid, returns `{ error: true, message: "Invalid token" }`.

## Register User

**Endpoint:** `/auth/register`

**Method:** `POST`

**Description:** This endpoint is used to register a new user.

**Body:** (all params are required)

- `email`: The email of the user.
- `username`: The username of the user.
- `password`: The password of the user.

**Response:**

- `201 Created` on success, returns `{ message: "User registered successfully" }`.
- `400 Bad Request` if the user already exists, returns `{ error: true, message: "User already exists" }`.

## Login User

**Endpoint:** `/auth/login`

**Method:** `POST`

**Description:** This endpoint is used to authenticate a user.

**Body:** (all params are required)

- `email`: The email of the user.
- `password`: The password of the user.

**Response:**

- `200 OK` on success, returns an object containing the `username`, `email`, and `token` of the authenticated user.
- `404 Not Found` if the user does not exist, returns `{ error: true, message: "The user does not exist" }`.
- `401 Unauthorized` if the password is incorrect, returns `{ error: true, message: "Invalid Password" }`.
