const exerciseForm = document.getElementById('exercise-form')
const searchExercise = document.getElementById('exercise').value
const mainExerciseList = document.getElementById('main-exercise-list')
const searchExerciseList = document.getElementById('search-exercise-list')
const searchTitle = document.getElementById('muscle-group-title')
let exerciseList = []


const retrieveAllExercises = () => {
  fetch('http://localhost:3000/exercises')
  .then(resp => resp.json())
  .then(resp => {
    resp.forEach(exercise => {
      exerciseToDom(exercise)
    })
  })
}

const exerciseToDom = (exercise) => {
  const createListItem = document.createElement('li')
  createListItem.textContent = `${exercise.exercise_name}`

  exerciseList.push(exercise)
  mainExerciseList.appendChild(createListItem)
}

retrieveAllExercises()


const filterExercises = (array) => {
  const searchExercise = document.getElementById('exercise').value

  searchTitle.textContent = `${searchExercise} Exercises`
  searchExerciseList.innerHTML = ''

  const searchList = array.filter(exercise => exercise.muscle_group === searchExercise)
  searchList.forEach(exercise => {
    const createListItem = document.createElement('li')
    createListItem.textContent = `${exercise.exercise_name}`

    searchExerciseList.appendChild(createListItem)
  })
}

exerciseForm.addEventListener('submit', (event) => {
  event.preventDefault()
  filterExercises(exerciseList)
})
