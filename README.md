# Keycloak Integration API with NestJS

## Description

This repository contains an API implemented in NestJS that facilitates integration with Keycloak, providing methods for common user and role management operations. Integration with Keycloak is essential for handling user authentication and authorization securely.

## Features

### Authentication

- **Login**: Allows users to log in.
- **Logout**: Logs out an authenticated user.
- **Refresh Token**: Renews the access token to keep the session active.
- **Forgot Password**: Allows users to reset their forgotten password.

### User Management

- **Create User**: Creates a new user in Keycloak.
- **List Users**: Retrieves a list of registered users.
- **Update User**: Modifies the information of an existing user.
- **Delete User**: Removes a user from Keycloak.

### Password Management

- **Update Password**: Allows users to change their password.

### Role Management

- **List Roles**: Retrieves a list of available roles in Keycloak.

## Implementation

This API is implemented using the NestJS framework, ensuring a modular and scalable structure. NestJS is based on TypeScript and follows design patterns similar to Angular, making code understanding and maintenance easier.

## Requirements

Make sure to have Node.js and npm installed on your system before running the application.

## Configuration

1. Clone the repository: `git clone https://github.com/raymelguerra/key-cloak-integration.git`
2. Install dependencies: `npm install`
3. Configure environment variables in a `.env` file with Keycloak credentials.

## Usage

1. Start the application: `npm run start`
2. Access the API using different endpoints to perform the mentioned operations.

## Contributions

Feel free to contribute to the development of this API. All contributions are welcome!

## License

This project is under the MIT license. Refer to the `LICENSE` file for more details.

---

I hope this README file is helpful for your repository. Good luck with your project!

