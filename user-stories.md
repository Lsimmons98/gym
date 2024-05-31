Feature 1: Search Exercises by Muscle Group
  - User Story: As a user, if I know which muscle group I want to hit that day, I want to be able to search for a list of exercises for that muscle group.
  - Details: Implement a form with a drop down menu that allows users to input a muscle group. On submission, the  app fetches exercises from the server that target the specified muscle group.

Feature 2: Click to Display Exercise Details
 - User Story: As a user, I want to be able to click an exercise to display more details about the exercise.
 - Details: Add a click event listener that will display a photo of the targeted muscle group and a brief description on how to perform the exercise

Feature 3: Add New Exercise Form
 - User Story: As a user, I want to be able to add exercises to the exercise list.
 - Details: Add a form which will allow users to add exercises to the exercise list. This button will use a post request to communicate with the server and then append the new     exercise to the DOM.

 Feature 4: Generate Random Workout
  - User Story: As a user, I want to be able to generate random workouts for a specified muscle group with the click of a button
  - Details: Add a button which will trigger a function that randomly chooses an exercises with each of the relevant subgroups and appends them to the DOM
