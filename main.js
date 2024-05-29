const exerciseForm = document.getElementById('exercise-form')
const searchExercise = document.getElementById('exercise').value
const mainExerciseList = document.getElementById('main-exercise-list')
const searchExerciseList = document.getElementById('search-exercise-list')
const searchTitle = document.getElementById('muscle-group-title')
const exerciseInfo = document.getElementById('info')
const newExerciseForm = document.getElementById('add-exercise-form')
const newMuscleGroupBox = document.getElementById('new-muscle-group')
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

const applyDetailsEventListener = (listItem, exercise) => {
  listItem.addEventListener('click', (event) =>{
    event.preventDefault()
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
  createListItem.textContent = `${exercise.exercise_name}`
  createListItem.id=(`${exercise.id}`)
  applyDetailsEventListener(createListItem, exercise)

  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete'
  applyDeleteEventListener(deleteButton, exercise)

  exerciseList.push(exercise)
  mainExerciseList.appendChild(createListItem).appendChild(deleteButton)
  filterExercises(exerciseList)
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

retrieveAllExercises()

const filterExercises = (array) => {
  const searchExercise = document.getElementById('exercise').value

  searchTitle.textContent = `${searchExercise} Exercises`
  searchExerciseList.innerHTML = ''

  const searchList = array.filter(exercise => exercise.muscle_group === searchExercise)
  searchList.forEach(exercise => {
    const createListItem = document.createElement('li')
    createListItem.textContent = `${exercise.exercise_name}`
    applyDetailsEventListener(createListItem, exercise)

    searchExerciseList.appendChild(createListItem)
  })
}

exerciseForm.addEventListener('change', (event) => {
  event.preventDefault()
  filterExercises(exerciseList)
})

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
  name.appendChild(subGroup)
  name.appendChild(category)
  name.appendChild(instructions)
  name.appendChild(image)
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

newMuscleGroupBox.addEventListener('change', (event) => {
  event.preventDefault()
  applySubGroups()
})

applySubGroups()

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

newExerciseForm.addEventListener('submit', createExercise)

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
