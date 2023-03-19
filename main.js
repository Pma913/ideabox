// ***** Query Selectors *****
const titleInput = document.querySelector('#inputTitle');
const bodyInput = document.querySelector('#inputBody');
const saveButton = document.querySelector('#buttonSave');
const savedIdeasSection = document.querySelector('#savedIdeasCards');
const showStarredButton = document.querySelector('#showStarredButton');
const searchInput = document.querySelector('#inputSearch');

// ***** Data Model ********
const savedIdeas = [];
let newIdea;


// ***** Event Handlers *******
saveButton.disabled = true;
showStarredButton.disabled = true;

const buttonChange = (event) => {
  event.preventDefault();
  if (titleInput.value && bodyInput.value) {
    saveButton.disabled = false;
    saveButton.style.background = '#1F1F3D';
    saveButton.classList.add('cursor');
  }
}

const emptyInputs = () => {
  titleInput.value = '';
  bodyInput.value = '';
}

const saveIdea = (event) => {
  event.preventDefault();
  newIdea = new Idea(titleInput.value, bodyInput.value);
  savedIdeas.push(newIdea);
  savedIdeasSection.innerHTML += `
    <section id=${newIdea.id} class="saved-idea-box">
      <header class="saved-idea-box header">
        <img id="star" class="header-img cursor" src="assets/star.svg" alt="star icon"/>
        <img id="x" class="header-img cursor"src="assets/delete.svg" alt="delete icon"/>
      </header>
      <div class="saved-idea-box body">
        <h1 class="idea-title">${newIdea.title}</h1>
        <p class="idea-body-text">${newIdea.body}</p>
      </div>   
      <footer class="saved-idea-box footer">
        <img class="comment-img" src="assets/comment.svg" alt="comment icon"/>
        <p class="comment">Comment</p>
      </footer>
    </section>
  `;

  emptyInputs();
  saveButton.disabled = true;
  saveButton.classList.remove('cursor');
  saveButton.style.background = '#353567';
}

const deleteIdea = (event) => {
  const ideaId = parseInt(event.target.closest('section').id);

  savedIdeas.forEach((element, index) => {
    if (event.target.id === 'x' && ideaId === element.id) {
      savedIdeas.splice(index, 1);
      event.target.closest('section').remove();
    }
  })
}

const starIdea = (event) => {
  const ideaId = parseInt(event.target.closest('section').id);

  savedIdeas.forEach(element => {
    if (ideaId === element.id && event.target.id === 'star') {
      event.target.parentNode.innerHTML = `
        <img id="activeStar" class="header-img cursor" src="assets/star-active.svg"/>
        <img id="x" class="header-img cursor"src="assets/delete.svg"/>
        `;
      element.updateIdea();
    } else if (ideaId === element.id && event.target.id === 'activeStar') {
      event.target.parentNode.innerHTML = `
        <img id="star" class="header-img cursor" src="assets/star.svg"/>
        <img id="x" class="header-img cursor"src="assets/delete.svg"/>
        `;
      element.updateIdea();
      if (showStarredButton.innerText === 'Show All Ideas') {
        document.getElementById(element.id).classList.toggle('hidden');
      }
    }
  })

  showStarredButton.disabled = false;
  showStarredButton.classList.add('cursor');
}

const showStarred = () => {
  if (showStarredButton.innerText === 'Show Starred Ideas') {
    showStarredButton.innerText = 'Show All Ideas';
  } else {
    showStarredButton.innerText = 'Show Starred Ideas';
  }

  savedIdeas.forEach(element => {
    if (!element.starred) {
      const idea = document.getElementById(element.id);
      idea.classList.toggle('hidden');
    }
  });
}

const filterSavedIdeas = () => {
  const characters = searchInput.value.toUpperCase();
  
  savedIdeas.forEach(element => {
    const idea = document.getElementById(element.id);
  
    if (!element.title.toUpperCase().includes(characters) && !element.body.toUpperCase().includes(characters)) {
     idea.classList.add('hidden');
    } else {
     idea.classList.remove('hidden');
    }
  }); 
}

// ***** Event Listeners *******
saveButton.addEventListener('click', saveIdea);
titleInput.addEventListener('input', buttonChange);
bodyInput.addEventListener('input', buttonChange);
savedIdeasSection.addEventListener('click', deleteIdea);
savedIdeasSection.addEventListener('click', starIdea);
showStarredButton.addEventListener('click', showStarred);
searchInput.addEventListener('input', filterSavedIdeas);