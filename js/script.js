/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


/***  
   GLOBAL VARIABLES
***/

const students = document.querySelectorAll('.student-item');
// Create and add elements for pagination links
const page = document.querySelector(".page");
const div = document.createElement("DIV");
div.className = 'pagination'; 
const ul = document.createElement("UL");
ul.className = "pageList";
ul.innerHTML = '';
let pageList = document.querySelector('.pageList');
div.appendChild(ul);
page.appendChild(div);


/*** 
   FUNCTION: DISPLAY STUDENTS ON THE ACTIVE PAGE
***/

function showPage(students, activePage) {

  // Calculate range of students to display based on the active page.
  let activePageFirst = activePage.textContent * 10 - 10;
  let activePageLast = '';
  if (activePage.textContent * 10 > students.length) {
    activePageLast = students.length;
  } else {
    activePageLast = activePage.textContent * 10;
  };

  // Display the students for the active page and hide the rest.
  for (let i = 0; i < students.length; i++) {
    if (i >= activePageFirst && i < activePageLast) {
      students[i].style.display = 'block';
    } else {
      students[i].style.display = 'none';
    }
  };
};

/*** 
   CREATE AND APPEND PAGE LINKS
***/
 
function appendPageLinks(students) {  
  
  for (let i = 0; i < students.length / 10; i++) {

    // Create page links.
    const li = document.createElement("LI");
    const pageLink = document.createElement("A");
    pageLink.href = "#";
    pageLink.textContent = i + 1;
    li.appendChild(pageLink);
    ul.appendChild(li);

    // Make first page active and display first 10 students.
    let firstPage = ul.firstChild.firstChild;
    firstPage.className = "active";
    showPage(students, firstPage)

    // On click, change the active page and display the corresponding 10 students.
    pageLink.addEventListener('click', () => {
    let currentPage = document.querySelector('.active');
    let activePage = event.target;
    if (activePage != currentPage) {
      currentPage.classList.remove("active");
      activePage.className = "active";
      showPage(students, activePage);
    } else {
      event.preventDefault();
      console.log('Page already active');
    };
    });
  };
};

appendPageLinks(students);




/*** 
  CREATE AND ADD SEARCH ELEMENTS
***/

const studentSearch = document.createElement("DIV");
studentSearch.className = "student-search";
const input = document.createElement("INPUT");
input.placeholder = "Search for students...";
const button = document.createElement("BUTTON");
button.textContent = "Search";
button.className = "submitSearch";

studentSearch.appendChild(input);
studentSearch.appendChild(button);

const pageHeader = document.querySelector('.page-header');
pageHeader.appendChild(studentSearch);

// Variables to reference the `input` and search `button` elements
const search = document.querySelector('input');
const submit = document.querySelector('.submitSearch');
let currentSearchValue = '';

// Messaging if there are no results (hidden by default)
const noResults = document.createElement('h1');
noResults.textContent = "There are no students with that name!";
noResults.style.color = "gray";
noResults.style.textAlign = "center";
noResults.style.display = "none";
const studentList = document.querySelector('.student-list');
studentList.parentNode.insertBefore(noResults, studentList.nextSibling);


/*** 
  FUNCTION: SEARCH STUDENTS FOR MATCHES AND DISPLAY RESULTS
***/
function searchNames(search, students) {
  // Clear the current content (list of page links or the no results message)
  document.querySelector('.pageList').innerHTML = '';
  noResults.style.display = "none";
  // Array for students who match the search and array for students who don't match the search
  let searchResults = [];
  let notInSearch = [];

  // Search through students for match and display or hide based on results
  if (search.value.length != 0) {
    for (let i = 0; i < students.length; i++) {
      let studentName = students[i].querySelector("h3");
      if (studentName.textContent.toLowerCase().includes(search.value.toLowerCase())) {
        students[i].style.display = 'block';
        searchResults.push(students[i]);  
      } else {
        students[i].style.display = 'none';
        notInSearch.push(students[i]); 
      };
    };

    // Append page links based on the search results or show message if there are no matches
    if (searchResults.length > 0) {
      appendPageLinks(searchResults);
    } else if (searchResults.length === 0){
      console.log('no results');
      noResults.style.display = "block";
    };

  // If search is input is empty, show all students again  
  } else {
    appendPageLinks(students);
  };
  currentSearchValue = search.value;
};




submit.addEventListener('click', (event) => {
  // event.preventDefault();
  searchNames(search, students);
});

/* submit listener */
search.addEventListener('keyup', () => {
  // If keyup casued the value of the search to change, search for matches
  if (search.value != currentSearchValue) {
    searchNames(search, students);
  }
});


