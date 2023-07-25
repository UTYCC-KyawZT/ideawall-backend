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

## Installation

Follow the steps below to set up the Idea Wall backend on your local machine:

1. **Clone the repository:** Start by cloning this GitHub repository to your local machine using the following command:

```git clone https://github.com/UTYCC-KyawZT/ideawall-backend.git```


2. **Install dependencies:** Change into the project's directory and install the required dependencies using npm (Node Package Manager):

```
cd idea-wall-backend
npm install
```

3. **Configure the database:** Set up a database of your choice (e.g., MongoDB, MySQL, or PostgreSQL) and create the necessary tables/collections.

4. **Environment variables:** Create a `.env` file in the root directory and specify the required environment variables. For example, if using MongoDB, your `.env` file might look like this:

```
DB_CONNECTION=mongodb+srv://walls_admin:xxxxx@walls.xxxxx.mongodb.net/
ACCESS_TOKEN_SECRET=xxxxxxx
REFRESH_TOKEN_SECRET=xxxxxxx
```

5. **Run the server:** Start the backend server using the following command:
```
npm start
```

6. **Backend is up and running:** The backend is now running on the specified port, and it's ready to handle API requests from the Idea Wall frontend.

Please note that this backend project only provides the server-side functionality for the Idea Wall application. To use the full application, you'll also need to set up the frontend, which is available in a separate GitHub repository.

## Contribute

We welcome contributions to Idea Wall! If you find any issues or want to add new features, feel free to submit a pull request. We'll be happy to review and merge them.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify the code as per the terms of the license.

## Contact

If you have any questions or need further information, please don't hesitate to contact us at [your-email@example.com](mailto:your-email@example.com).

Happy note-taking with Idea Wall!

