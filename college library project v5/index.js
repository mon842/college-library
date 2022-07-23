console.log("This is ES6 version of Project 2");
showTable();
showsubTable();

// book class
class Book {
  // creating a class Book with a constructor and declaring the name,author and type
  constructor(name, author, type, Borrower,borrowDate) {
    this.name = name;
    this.author = author;
    this.type = type;
    this.Borrower = Borrower;
    this.borrowDate = borrowDate;
  }
}
// book 2
class Book2 {
  // creating a class Book with a constructor and declaring the name,author and type
  constructor(name, author, type, Borrower,borrowDate,returnDate) {
    this.name = name;
    this.author = author;
    this.type = type;
    this.Borrower = Borrower;
    this.borrowDate = borrowDate;
    this.returnDate = returnDate;
  }
}

// class to display the message 
class Display {
  // creating a class Display with several functions like add, clear and validate
  add(
    book // add function to add the html in the DOM
  ) {    
    showTable();
  }

  clear() {
    // clear function which clears the form for the next user
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }

  validate(
    book // validate function which validates the length of book name and author
  ) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }

  show(type, displayMessage) {
    let message = document.getElementById("message");
    let boldText;
    if (type === "success") {
      boldText = "Success";
    } else {
      boldText = "Error!";
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
    setTimeout(function () // setTimeout will show the message for 5000s only
    {
      message.innerHTML = "";
    }, 5000);
  }
}

// Add submit event listener to libraryForm 
let libraryForm = document.getElementById("libraryForm"); // getting the library Form element by id libraryForm
libraryForm.addEventListener("submit", libraryFormSubmit); // adding an event listener that on submiting the libraryFormSubmit will be fired or called

function libraryFormSubmit(e) {
  // console.log("YOu have submitted library form");
  let name = document.getElementById("bookName").value; // getting the book name value
  let author = document.getElementById("author").value; // getting the author value
  let Borrower = document.getElementById("Borrower").value; // getting the borrower value
  // let borrowDate = document.getElementById("borrowDate").value; // getting the borrower value
  // console.log(name, author, Borrower, borrowDate);
  let borrowDate=new Date();
   borrowDate=String( " Date: "+borrowDate.getDate()+"/"+( borrowDate.getMonth()+1)+"/"+ borrowDate.getFullYear()+" \n Time: "+ borrowDate.getHours()+":"+ borrowDate.getMinutes());
  let type;
  let fiction = document.getElementById("fiction"); // getting the fiction element
  let programming = document.getElementById("programming"); // getting the programming element
  let cooking = document.getElementById("cooking"); // getting the cooking element

  if (fiction.checked) {
    // in if elese statement checking which on is clicked and then storing it's value in type
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }
  let book;
  //   console.log(name.length + " " + author.length + " " + type.length + " " );
  if (name.length > 0 && author.length > 0 && type.length > 0 && Borrower.length > 0 && borrowDate.length > 0) {
    book = new Book(name, author, type, Borrower,borrowDate); // creating the book object with the book name and author value by the user and calling the class Book
    alert(" your Book is added");
  }else{
    alert(" your Book is not added");
  }

  let display = new Display(); //creating the display object and calling the class Display

  if (display.validate(book)) {
    // calling the vlaidate function
    display.add(book);
    display.clear();
    display.show("success", "Your book has been successfully added");
  } else {
    // Show error to the user
    display.show("danger", "Sorry you cannot add this book");
  }

  let tableObj;
  let tableData = localStorage.getItem("tableData"); // getting item named 'tableData' from localStorage
  if (tableData == null) {
    tableObj = [];
  } else {
    tableObj = JSON.parse(tableData); // arranging the the stored notes to the notes array
  }
  tableObj.push(book); // adding the note to the notes array
  localStorage.setItem("tableData", JSON.stringify(tableObj)); // storing the tableData array in localStorage Or Updating the localStorage
  e.preventDefault();
  showTable();
}


// function to show the Table

function showTable() {
  let tableObj;
  let tableData = localStorage.getItem("tableData"); // getting item named 'tableData' from localStorage
  if (tableData == null) {
    tableObj = [];
  } else {
    tableObj = JSON.parse(tableData); // arranging the the stored books data to the tableData array
  }
  // console.log(tableObj[0]);
  let UIstring = "";
  tableObj.forEach(function (element, sno) {
    // kind of for loop to loop through the elements in the tableData arrayy
    UIstring += `
    <tr class="table-1">
        <th scope="col">${++sno}</th>
        <td class="bookNam">${element.name}</td>
        <td class="bookNam2">${element.author}</td>
        <td class="bookNam3">${element.type}</td>
        <td class="bookNam4">${element.Borrower}</td>
        <td class="bookNam4">${element.borrowDate}</td>
        <button id='${sno}' onclick=submit(this.id) class="btn btn-primary">submit</button>
    </tr>`;
  });
  let tableBody = document.getElementById("tableBody"); // getting element 'tab' from document(html or dom) using id
  if (tableObj.length != 0) {
    // checking if the notes variable is empty or not
    tableBody.innerHTML = UIstring;
  } else {
    tableBody.innerHTML = `<h4> no books to show </h4>`;
  }
}

// deleting the submitted book records from the table
function deleteRow(index) {
  // console.log("i am deleting", index);
  // let tableObj;

  let subTable = localStorage.getItem("subTable"); //again getting item named 'donotes' from localStorage.... and fetching the donotes data from localStorage
  if (subTable== null) {
      tableObj2 = [];
  } else {
      tableObj2 = JSON.parse(subTable); // arranging the the stored donotes to the subTablearray
  }

  tableObj2.splice(--index, 1); //delete the note from the notes array and remove it from the notes object and from the localStorage
  localStorage.setItem("subTable", JSON.stringify(tableObj2)); // storing the notes array in localStorage Or Updating the localStorage
  showTable(); // function to display notes to the user
  showsubTable();
}

// function to search for notes in localStorage

let searchTxt = document.getElementById("searchTxt"); // grabbing the element with id 'searchTxt'
searchTxt.addEventListener("input", function () {
  // whenever the user input in the search bar this function fires
  let input = searchTxt.value.toLowerCase(); // in the input variable values of searchTxt is stored
//   console.log("searching for notes in localStorage", input); // showing the search results in console
  let noteCard = document.getElementsByClassName("table-1"); // grabbing the note card element from Dom or html
//   console.log(noteCard);
  Array.from(noteCard).forEach(function (element) {
    let cardText= element.getElementsByClassName("bookNam")[0].innerText;
    let cardText2= element.getElementsByClassName("bookNam2")[0].innerText;
    let cardText3= element.getElementsByClassName("bookNam3")[0].innerText;
    let cardText4= element.getElementsByClassName("bookNam4")[0].innerText;
    console.log(cardText);
    if (cardText.includes(input) || cardText2.includes(input) || cardText3.includes(input) || cardText4.includes(input)) {
      // checking if input is in the notes array
      element.style.display = "block"; // setting the display of the searched card note or notes
    } else {
      element.style.display = "none"; // setting the display none if there is no input in the notes array of the searched card note or notes
    }
  });
});


// ----------------------------------------doing--------------------------------------------------------
function submit(index) {
  index = index - 1;
  let tableObj;
  let tableData = localStorage.getItem("tableData"); // getting item named 'tableData' from localStorage
  if (tableData == null) {
    tableObj = [];
  } else {
    tableObj = JSON.parse(tableData); // arranging the the stored books data to the tableData array
  }
  let returnDate=new Date();
  returnDate=String(" Date: "+returnDate.getDate()+"/"+(returnDate.getMonth()+1)+"/"+returnDate.getFullYear()+" \n Time: "+returnDate.getHours()+":"+returnDate.getMinutes());

  let book2 = new Book2(tableObj[index].name,tableObj[index].author, tableObj[index].type, tableObj[index].Borrower,tableObj[index].borrowDate,returnDate); // creating the book object with the book name and author value by the user and calling the class Book
  console.log(book2);
  let subTable = localStorage.getItem("subTable"); //again getting item named 'donotes' from localStorage.... and fetching the donotes data from localStorage
  if (subTable== null) {
      tableObj2 = [];
  } else {
      tableObj2 = JSON.parse(subTable); // arranging the the stored donotes to the subTablearray
  }
  tableObj2.unshift(book2);

  localStorage.setItem("subTable", JSON.stringify(tableObj2)); // storing the subTablearray in localStorage Or Updating the localStorage


  tableObj.splice(index, 1); //delete the note from the notes array and remove it from the notes object and from the localStorage
  localStorage.setItem("tableData", JSON.stringify(tableObj)); // storing the notes array in localStorage Or Updating the localStorage
  showTable(); // function to display notes to the user
  showsubTable();// function to display donotes to the user
}

// function to display notes to the user
function showsubTable() {
  // let tableObj2;
  let subTable = localStorage.getItem("subTable"); //again getting item named 'donotes' from localStorage.... and fetching the donotes data from localStorage
  if (subTable== null) {
      tableObj2 = [];
  } else {
      tableObj2 = JSON.parse(subTable); // arranging the the stored donotes to the subTablearray
  }

  let html2 = ""; // variable to hold the html
  tableObj2.forEach(function (element, sno) {
      // kind of for loop to loop through the elements in the notes array
      html2 += `
      <tr class="table-1">
        <th scope="col">${++sno}</th>
        <td class="bookNam">${element.name}</td>
        <td class="bookNam2">${element.author}</td>
        <td class="bookNam3">${element.type}</td>
        <td class="bookNam4">${element.Borrower}</td>
        <td class="bookNam4">${element.borrowDate}</td>
        <td class="bookNam4">${element.returnDate}</td>
        <button id='${sno}' onclick=deleteRow(this.id) class="btn btn-primary">delete</button>
    </tr>`; // in ' onclick=deleteNote(this.id)' this.id sends the id of the index on clicking the delete button and calls the function deleteNote() with parameter index
  });

  let tableBody2 = document.getElementById("tableBody2"); // getting element 'notes' from document(html or dom) using id
  if (tableObj2.length != 0) {
      // checking if the notes variable is empty or not
      tableBody2.innerHTML = html2;
  } else {
      tableBody2.innerHTML = `<h4> no pending work to show </h4>`;
  }
}