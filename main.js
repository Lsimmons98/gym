const exerciseForm = document.getElementById('exercise-form')
const searchExercise = document.getElementById('exercise').value
const mainExerciseList = document.getElementById('main-exercise-list')
const searchExerciseList = document.getElementById('search-exercise-list')
const randomWorkoutList = document.getElementById('random-workout-list')
const searchTitle = document.getElementById('muscle-group-title')
const randomWorkoutTitle = document.getElementById('random-workout-title')
const exerciseInfo = document.getElementById('info')
const newExerciseForm = document.getElementById('add-exercise-form')
const newMuscleGroupBox = document.getElementById('new-muscle-group')
const searchedExerciseBox = document.getElementById('searched-exercises')
const exerciseDetailsBox = document.getElementById('exercise-details')
const toggleAllExercisesButton = document.getElementById('toggle-all-exercises')
const allExercisesDiv= document.getElementById('all-exercises')
const subGroupObject = {
  'Chest': ['Upper Chest', 'Middle Chest', 'Lower Chest'],
  'Back': ['Lats', 'Traps', 'Mid Back', 'Lower Back'],
  'Legs': ['Quads', 'Hamstrings', 'Calves', 'Glutes'],
  'Abs': ['Upper Abs', 'Lower Abs', 'Obliques'],
  'Biceps': ['Long Head', 'Short Head', 'Brachialis'],
  'Triceps': ['Long Head', 'Lateral Head', 'Medial Head'],
  'Shoulders': ['Front Deltoid', 'Lateral Deltoid', 'Rear Deltoid']
}
let exerciseList = []
let searchList

const applyDetailsEventListener = (listItem, exercise) => {
  listItem.addEventListener('click', (event) =>{
    event.preventDefault()
    if (exerciseDetailsBox.classList.contains('hidden')){
      exerciseDetailsBox.classList.remove('hidden')
    }
    moreDetailsToDOM(exercise)
  })
}

const applyDeleteEventListener = (button, exercise) => {
  button.addEventListener('click', (event) => {
  event.preventDefault()
  deleteExercise(exercise)
  })
}

const exerciseToDom = (exercise) => {
  const createListItem = document.createElement('li')
  createListItem.id=(`${exercise.id}`)
  createListItem.classList.add('exercise-item')
  applyDetailsEventListener(createListItem, exercise)

  const createP = document.createElement('p')
  createP.textContent = `${exercise.exercise_name}`
  createP.classList.add('exercise-name')

  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete'
  applyDeleteEventListener(deleteButton, exercise)

  exerciseList.push(exercise)
  mainExerciseList.appendChild(createListItem).appendChild(createP)
  createListItem.appendChild(deleteButton)
}

const retrieveAllExercises = () => {
  fetch('http://localhost:3000/exercises')
  .then(resp => resp.json())
  .then(resp => {
    resp.forEach(exercise => {
      exerciseToDom(exercise)
    })
  })
}

const filterExercises = (array) => {
  const searchExercise = document.getElementById('exercise').value

  searchTitle.textContent = `${searchExercise} Exercises`
  searchExerciseList.innerHTML = ''

  searchList = array.filter(exercise => exercise.muscle_group === searchExercise)

  searchList.forEach(exercise => {
    const createListItem = document.createElement('li')
    createListItem.textContent = `${exercise.exercise_name}`
    applyDetailsEventListener(createListItem, exercise)

  searchExerciseList.appendChild(createListItem)
  })
}

const setupRandomExercises = () => {
  exerciseForm.addEventListener('change', (event) => {
    event.preventDefault()

    const searchedExercise = document.getElementById('exercise').value

    randomWorkoutTitle.innerHTML = ''
    randomWorkoutList.innerHTML = ''

    if (searchedExerciseBox.classList.contains('hidden')){
      searchedExerciseBox.classList.remove('hidden')
    }

    filterExercises(exerciseList)

    createDeleteButton(searchedExercise)
  })
}

const createDeleteButton = (exercise) => {
if (document.getElementById('random-workout-button')){
  document.getElementById('random-workout-button').remove()
}
const randomWorkoutButton = document.createElement('button')
randomWorkoutButton.id = 'random-workout-button'
randomWorkoutButton.textContent = `Click for a Random ${exercise} Workout`
randomWorkoutButton.addEventListener('click', (event) => {
  event.preventDefault()
  randomWorkoutList.innerHTML = ''
  createRandomWorkout(exercise)
})
searchedExerciseBox.appendChild(randomWorkoutButton)
}

const moreDetailsToDOM = (exercise) => {
  exerciseInfo.innerHTML = ''

  const name = document.createElement('h1')
  name.textContent = exercise.exercise_name

  const muscleGroup = document.createElement('h3')
  muscleGroup.textContent = `Muscle Group: ${exercise.muscle_group}`

  const subGroup = document.createElement('h3')
  subGroup.textContent = `Sub-Group: ${exercise.sub_group}`

  const category = document.createElement('h3')
  category.textContent = `Category: ${exercise.category}`

  const instructions = document.createElement('p')
  instructions.textContent = `Instructions: ${exercise.instructions}`

  const image = document.createElement('img')
  image.setAttribute('src', exercise.image)

  exerciseInfo.appendChild(name).appendChild(muscleGroup)
  name.append(subGroup, category, instructions, image)
}

const applySubGroups = () => {
  const newMuscleGroupValue = document.getElementById('new-muscle-group').value
  const subGroupDropDown = document.getElementById('new-sub-group')
  const blankOption = document.createElement('option')
  blankOption.textContent = 'Select a Sub Group'
  blankOption.value = ''
  blankOption.disabled = true
  blankOption.selected = true

  subGroupDropDown.innerHTML = ''
  subGroupDropDown.appendChild(blankOption)

  if(subGroupObject[newMuscleGroupValue]){
  subGroupObject[newMuscleGroupValue].forEach(subGroup => {
    const newOption = document.createElement('option')
    newOption.value = subGroup
    newOption.innerText = subGroup
    subGroupDropDown.appendChild(newOption)
  })
}
}

const createExercise = (event) => {
  event.preventDefault()
  const formData = {
    "exercise_name": newExerciseForm.elements["new-exercise-name"].value,
    "muscle_group": newExerciseForm.elements["new-muscle-group"].value,
    "sub_group": newExerciseForm.elements["new-sub-group"].value,
    "category": newExerciseForm.elements["new-category"].value,
    "image": newExerciseForm.elements["new-image-url"].value,
    "instructions": newExerciseForm.elements["new-instructions"].value,
  };

  const options = {
    method: 'POST',
    headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    body: JSON.stringify(formData)
  }

  fetch('http://localhost:3000/exercises', options)
    .then(resp => resp.json())
    .then(exerciseToDom)
}

const deleteExercise= (exercise) => {
  const options = {
    method: 'DELETE',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }
  fetch(`http://localhost:3000/exercises/${exercise.id}`, options)
  .then(_resp => document.getElementById(exercise.id).remove())
}

const createRandomWorkout = (muscleGroup) => {
  subGroupObject[muscleGroup].forEach(subGroup => {
    const subGroupExercises = searchList.filter(exercise => exercise.sub_group === subGroup)
    const getIndex = Math.floor(Math.random()*subGroupExercises.length)
    const randomWorkoutMuscleGroup = document.getElementById('exercise').value
    randomWorkoutTitle.textContent = `Random ${randomWorkoutMuscleGroup} Workout`

    if(subGroupExercises[getIndex]){

    const createListItem = document.createElement('li')
    createListItem.textContent = subGroupExercises[getIndex].exercise_name
    applyDetailsEventListener(createListItem, subGroupExercises[getIndex])

    randomWorkoutList.appendChild(createListItem)
    }
  })
}

const newExerciseSubmitListener = () => {
  newExerciseForm.addEventListener('submit', createExercise)
  }

const createMuscleSubGroups = () => {
  newMuscleGroupBox.addEventListener('change', (event) => {
    event.preventDefault()
    applySubGroups()
  })
}

const listenerForToggleAllExercises = () => {
  toggleAllExercisesButton.addEventListener('click', (event) => {
    event.preventDefault()
    if(toggleAllExercisesButton.textContent === 'Show All Exercises'){
      toggleAllExercisesButton.textContent = 'Hide Exercises List'
      allExercisesDiv.classList.remove('hidden')
    } else if (toggleAllExercisesButton.textContent === 'Hide Exercises List'){
      toggleAllExercisesButton.textContent = 'Show All Exercises'
      allExercisesDiv.classList.add('hidden')
  }
})
}

retrieveAllExercises()
createMuscleSubGroups()
applySubGroups()
setupRandomExercises()
newExerciseSubmitListener()
listenerForToggleAllExercises()

document.addEventListener('DOMContentLoaded', () => {
  const searchMuscleGroup = document.getElementById('exercise-form')
  searchMuscleGroup.reset()
})
