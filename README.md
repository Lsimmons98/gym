# Workout Planner Project

Welcome to the Workout Planner project! This application allows users to select exercises based on different muscle groups, add new exercises, and generate random workouts. The project is built using HTML, CSS, and JavaScript.

## Brief Description

This project is a user-friendly web application designed to help users select and learn about different exercises. Users can:

- Select exercises by muscle group.
- View details of each exercise.
- Add new exercises to the list.
- Generate random workouts based on selected muscle groups.

The application fetches exercise data from a local server and displays it dynamically on the web page.

## Setup Instructions

To set up this project locally, follow these steps:

### Prerequisites

- Node.js installed on your machine.
- A code editor like VSCode.

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/exercise-selection-form.git
    cd exercise-selection-form
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

3. **Start the local server:**

    ```bash
    json-server --watch exercises.json --port 3000
    ```

4. **Open the project in your browser:**

    Open `index.html` in your preferred web browser to view the application.

## Project Structure

- `index.html`: The main HTML file containing the structure of the application.
- `style.css`: The CSS file for styling the application.
- `main.js`: The JavaScript file containing the functionality for fetching, displaying, and managing exercises.
- `exercises.json`: The JSON file used by json-server to simulate a REST API with exercise data.

## Usage

- **Select a Muscle Group:** Choose a muscle group from the dropdown menu to view exercises related to that group.
- **View Exercise Details:** Click on an exercise to view more details, including instructions and an image.
- **Add a New Exercise:** Fill out the form at the bottom of the page to add a new exercise to the list.
- **Generate Random Workouts:** After selecting a muscle group, click the button to generate a random workout from the available exercises.
