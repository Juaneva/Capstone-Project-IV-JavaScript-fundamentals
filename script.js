// Please help me to make the save for later work. I have read through all of my code and not sure why its not working.
// I dont have any errors on my page or in my js file but its still not working :) 
// Thanks so much!!!





// fade out buttons on first image *****
$(document).ready(function(){
$(".hideHero").click(function(){
  $(".hero").fadeOut(2000);
});

// fade in button on first image ***
$(document).ready(function(){
  $(".showHero").click(function(){
    $(".hero").fadeIn(2000)
  });
})

// stop animation of fade out and fade in
$(document).ready(function(){
  $(".stop").click(function(){
    $(".hero").stop()
  });
})

});


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}


// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Animation on home page pink line (if its already on right please refresh page and try again)
$(document).ready(function(){
  $("button").click(function(){
    $(".pinkBox").animate({left: '1000px'});
  });
});

// Chain effect on home page
$(document).ready(function(e){
  $("button").click(function(){
    $("#chain").css("color", "pink").fadeOut(2000);

    $("p").click(function(event){
      event.preventDefault();
    });
  });
});



//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////



// Global array meant for containing a list of boolean values that indicates which specific 
// items/articles are liked and not liked on the current webpage.

let likes_array = [];

$(document).ready(function(){

    // Number of like buttons on the current page obtained.
    let numberOfLikeButtons = document.querySelectorAll(".likeButton").length;

    // Check if the website has NOT been visited before.
    if(localStorage.getItem("visitedBefore") === null){

        // Website visited status initialized and set to true in local storage.
        localStorage.setItem("visitedBefore", true);
        
        // Saved items array intialized in local storage.
        localStorage.setItem("savedItems", JSON.stringify(savedItems));
        
        // Comments arrays for the index, favorites and contact initialized in local storage.
        localStorage.setItem("comments", JSON.stringify(comments_array));


    }
    // Checks if webpage has been visited before.
    else if(JSON.parse(localStorage.getItem("visitedBefore")) === true){
        
        // All previously "saved for later" items are retrieved from local storage and added to the saved items array.
        saved_items = JSON.parse(localStorage.getItem("savedItems"));

    }

    // Checks if the current page is on the Saved For Later page (aka the Saved Items page).
    if(window.location.href.search("saveForLater.html") != -1){
        
        // Functionality of the saved for later page handled.
        handleSaveForLater();

    }
    // Checks if the current page is on the Index page (aka the home page).
    else if(window.location.href.search("index.html") != -1){

        // Likes array and comments array are initialized according to whether the index page has been visited yet or not.
        initLocalStorage("comments", "indexVisited", numberOfLikeButtons);
        
        // All functionality of index page handled.
        // The index comments array and index likes array local storage variable names are passed as parameters.
        handleArticles("comments");

    }
    // Checks if current page is on the favorites page.
    else if(window.location.href.search("favorites.html") != -1){
        
        // Likes array and comments array are initialized according to whether the favorites has been visited yet or not.
        initLocalStorage("comments", "likes", numberOfLikeButtons);
    }


    // Checks if current page is the Contact Us page.
    else if(window.location.href.search("contact.html") != -1){

        // Functionality of contact us page handled.
        handleContact();
        
    }

});


// Functionality for the saved for later page handled here.
// Renders all saved items on the saved for later page.
function handleSaveForLater(){
    
  // Each user saved item is retrieved from the saved items array and appended to the savedItems div.
  savedItems.forEach(function(item){
      let savedForLater = document.getElementById("savedItems");

      let newDiv = document.createElement("div");
      
      newDiv.innerHTML += item;

      savedForLater.appendChild(newDiv);

  });

}


// Local storage variable names for the page-specific comments array, likes array and page visited status, 
// as well as the number of like buttons on the current webpage are all passed as parameters.
// If the current webpage has not been visited yet, the likes array is initialized in local storage.
// If the current webpage has been visited before, the likes array and comments array are retrieved from local storage.
function initLocalStorage(localStorageComments, localStorageLikes, pageVisited, numLikeButtons){
    
  // Checks if the current page has been visited yet.
  if(localStorage.getItem(pageVisited) === null){
      // The current webpage's visited status set to true.
      localStorage.setItem(pageVisited, true);
      
      // All like status values set to false, as none of the items/articles have been liked by the user yet.
      for(i = 0; i < numLikeButtons; i++){
          likes_array.push(false);
      }

      // Likes array saved to local storage.
      localStorage.setItem(localStorageLikes, JSON.stringify(likes_array));

      // All like indicators are hidden from the webpage, as none of the items/articles have been liked by the user yet.
      $(".likedImg").hide();
  }
  else if(JSON.parse(localStorage.getItem(pageVisited)) === true){
      // Likes array retrieved from local storage.
      likes_array = JSON.parse(localStorage.getItem(localStorageLikes));
  }

}


  
  for(i = 1; i <= likes_array.length; i++){
      // Checks if the like status of an item/article on the page is true. If true, the like indicator image is shown.
      // We use index i-1 since the array starts at index i=0, but the id of the like button and like indicator starts with an index of i=1, i.e. btnLike1 and Like1.
      if(likes_array[i-1] == true){
          $("#Like" + i).show(); // Like indicator image shown.

          $("#likeButton" + i).html("Unlike"); // "Like" button text changes to "Unlike".

      }
      // Checks if the like status of an item/article on the page is false. If false, the like indicator image is no longer shown.
      else if(likes_array[i-1] == false){
          $("#Like" + i).hide(); // Like indicator not shown.

          $("#likeButton" + i).html("Like"); // "Unike" button text changes to "Like".

      }

      // A specific item/article on the webpage with id article_i is obtained.
      let itemContent = document.getElementById("article_" + i).innerHTML + "<br><hr><br>";

      // Checks if this specific item is a saved item in the saved items array.
      if(saved_items.includes(itemContent)){
          $("#save" + i).html("Unsave Item"); // "Save For Later" button text set to "Unsave Item".
      }
      // Checks if this specific item is NOT a saved item in the saved items array.
      else if(!saved_items.includes(itemContent)){
          $("#save" + i).html("Save For Later"); // "Unsave Item" button text set to "Save For Later."
      }

  }

  // Checks for any button click event on the index page.
  $("button").click(function(event){
      
      for(i = 1; i <= likes_array.length; i++){

          // Checks if the "Save For Later" / "Unsave Item" button for a specific item is clicked.
          // If the specific item already exists in the saved items array, it is removed from the saved items array, and thus removed from the saved items folder.
          // If it does not already exist in the saved items array, it is added to saved items array, and thus added to the saved items folder.
          if(event.target.id == "save" + i){

              // Specific item/article obtained from array.
              let itemContent = document.getElementById("article_" + i).innerHTML + "<br><hr><br>";

              // Checks if specific item/article has been saved to the saved items array.
              if(saved_items.includes(itemContent)){
                  
                  $("#" + event.target.id).html("Saved For Later"); // "Unsave Item" button text changed to "Save For Later".

                  let removedIndex = saved_items.indexOf(itemContent);

                  saved_items.splice(removedIndex, 1); // Saved item/article removed from array.

                  localStorage.setItem("savedItems", JSON.stringify(saved_items)); // Updated array saved to local storage.
              }
              else{
                  $("#" + event.target.id).html("Unsave Item"); // "Save For Later" button text changed to "Unsave Item".

                  saved_items.push(itemContent); // Item/article added to array.

                  localStorage.setItem("savedItems", JSON.stringify(saved_items)); // Updated array saved to local storage.
              }

              alert("You have saved " + saved_items.length + " items to your Saved Items folder."); // User told how many items they have in their saved items folder.


          }

          // Checks if "Like" / "Unlike" button is clicked.
          // If the "Like" button is clicked, the Like indicator image is shown.
          // If the "Unlike" button is clicked, the Like indicator image is no longer shown.
          if(event.target.id == "btnLike" + i){
              
              // Checks if current item at index i-1 is NOT already liked.
              // We use index i-1 since the array starts at index i=0, but the id of the like button starts with an index of i=1, i.e. btnLike1.
              if(likes_array[i-1] == false){
                  
                  likes_array[i-1] = true; // Like status in weights likes array changed to true.
                  
                  $("#Like" + i).show().animate({marginLeft: "+=50px"}).animate({marginLeft: "-=50px"}); // Like indicator image is shown and animated.

                  $("#btnLike" + i).html("Unlike"); // "Like" button text changed to "Unlike".

                  localStorage.setItem(localStorageLikes, JSON.stringify(likes_array)); // Updated likes array saved to storage.
              }
              // Checks if current item at index i-1 is already liked.
              else if(likes_array[i-1] == true){
                  
                  likes_array[i-1] = false; // Like status is likes array changed to true.
                  
                  $("#Like" + i).hide(); // Like indicator image no longer shown.

                  $("#btnLike" + i).html("Like"); // "Unlike" button text changed to "Like".

                  localStorage.setItem(localStorageLikes, JSON.stringify(likes_array)); // Updated likes array saved to local storage.
              }
          }

      }
  });