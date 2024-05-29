const exerciseForm = document.getElementById('exercise-form')
const searchExercise = document.getElementById('exercise').value
const mainExerciseList = document.getElementById('main-exercise-list')
const searchExerciseList = document.getElementById('search-exercise-list')
const searchTitle = document.getElementById('muscle-group-title')
const exerciseImage = document.getElementById('image')
const exerciseInfo = document.getElementById('info')
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
  createListItem.addEventListener('click', (event) =>{
    event.preventDefault()
    moreDetailsToDOM(exercise)
  })
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
    createListItem.addEventListener('click', (event) =>{
      event.preventDefault()
      moreDetailsToDOM(exercise)
    })

    searchExerciseList.appendChild(createListItem)
  })
}

exerciseForm.addEventListener('change', (event) => {
  event.preventDefault()
  filterExercises(exerciseList)
})

const moreDetailsToDOM = (exercise) => {
  exerciseImage.innerHTML = ''
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
  name.appendChild(subGroup)
  name.appendChild(category)
  name.appendChild(instructions)
  name.appendChild(image)
}
