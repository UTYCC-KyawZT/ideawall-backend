# Idea Wall - Backend

Idea Wall is a note-taking application that provides a backend service for managing users' ideas and folders (referred to as "Walls"). With this backend, users can create, organize, and share their ideas with others, enabling collaboration on notes within each wall.

## Features

- **Walls:** Users can create multiple folders, called "Walls," to categorize and organize their ideas (notes).

- **Ideas:** Inside each wall, users can create individual ideas (notes) to store their thoughts, reminders, or any information they want to keep track of.

- **Sharing and Collaboration:** Users can share their ideas with others, facilitating collaboration on shared notes.

- **Permissions:** Idea Wall offers flexible permissions, allowing users to control who can view or edit their shared ideas. Users can customize access levels for each shared note, ensuring privacy and collaboration based on their preferences.

## Technology Stack

The backend of Idea Wall is built using the following technologies:

- **Node.js:** A JavaScript runtime environment that powers the server-side logic.
- **Express.js:** A fast and flexible web application framework for Node.js, used to build the RESTful APIs for Idea Wall.
- **Database:** A suitable database system is utilized to store users' data, such as MongoDB, MySQL, or PostgreSQL (You can choose the one that best fits your needs).

## Getting Started

To run the Idea Wall Backend using Docker, follow these steps:

1. **Clone the Repository:**
```git clone https://github.com/UTYCC-KyawZT/ideawall-backend.git```
2. **Build the Docker Image:**
3. **Run the Docker Container:**

This will start the Idea Wall Backend inside a Docker container and expose it on port 8000.

## Dependencies

The Idea Wall Backend uses various Node.js packages to provide its functionality. These packages include:

- [bcryptjs@2.4.3](https://www.npmjs.com/package/bcryptjs): For secure password hashing.
- [body-parser@1.20.2](https://www.npmjs.com/package/body-parser): To parse incoming request bodies.
- [dotenv@16.3.1](https://www.npmjs.com/package/dotenv): For managing environment variables.
- [express@4.18.2](https://www.npmjs.com/package/express): A web application framework for Node.js.
- [jsonwebtoken@9.0.1](https://www.npmjs.com/package/jsonwebtoken): For generating and verifying JSON Web Tokens.
- [mongoose@7.4.0](https://www.npmjs.com/package/mongoose): A MongoDB object modeling tool.
- [cors@2.8.5](https://www.npmjs.com/package/cors): CORS is for providing a Connect/Express middleware that can be used to enable CORS with various options
- [morgan@1.10.0](https://wwww.npmjs.com/package/morgan): HTTP request logger middleware for node.js
- [nodemon@3.0.1](https://www.npmjs.com/package/nodemon): A utility that automatically restarts the server during development.

## Configuration

The backend uses environment variables for configuration. Make sure to create a `.env` file in the root directory and set your environment variables there.
```
DB_CONNECTION=mongodb+srv://walls_admin:xxxxx@walls.xxxxx.mongodb.net/
ACCESS_TOKEN_SECRET=xxxxxxx
REFRESH_TOKEN_SECRET=xxxxxxx
```

## Contributions

Contributions to this project are welcome! If you encounter any issues or have suggestions for improvements, please feel free to submit a pull request or create an issue.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or need further information, please don't hesitate to contact me at [kyawkingston@gmail.com](mailto:kyawkingston@gmail.com).

Happy note-taking with Idea Wall!