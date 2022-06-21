// Copy Data
let artistData = [...items]
let slicedArrForChartData = [[], []]

// Global Flag Variables
let editingMode = false;
let isVisitorJoined = "false";

// Functions //

// Storage Values
function checkLocalStorageValues() {
  const checkMainData = localStorage.getItem("artistData")
  if(checkMainData) {
    const mainDataFromStorage = JSON.parse(checkMainData);
    const checkArtistLoggedData = localStorage.getItem("currentLoggedArtist")
    const loggedArtistFromStorage = JSON.parse(checkArtistLoggedData)
    const {artist} = loggedArtistFromStorage[0]
    titleArtist.innerText = artist; 
    artistData = [...mainDataFromStorage];
     updatingDataOnChange(artistData, artist, totalIncome, itemsSold);
  }
  const itemsBidTrack = localStorage.getItem("itemsTrack")
  const time = localStorage.getItem("clock");
  const card = localStorage.getItem("auctionCard");
  if(itemsBidTrack) {
    const arrToPrint = JSON.parse(itemsBidTrack)
    printBidsOnRefresh(arrToPrint, resultsWrapper);
  }
  if(time) {
  initTimer(parseInt(time))
  }
  if(card) {
    const cardFromAuction = JSON.parse(card)
    printAuctionCard(cardFromAuction, auctionContainer)
  }
  const visitorJoinedFromStorage = localStorage.getItem("isVisitorJoined");
  if(visitorJoinedFromStorage) {
    isVisitorJoined = visitorJoinedFromStorage;
    console.log(isVisitorJoined);
  }



}

// Auction Bids
function printBidsOnRefresh(array, container) {
  container.innerHTML = ""
  array.forEach(bid => {
      container.innerHTML += `
      <div class="eachPrice">$${bid}</div>
      `
  })
}

// Fetch Users
function fetchUsers(select) {
  fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => data.forEach(({ name }) => {
    select.innerHTML += `<option value="${name}"">${name}</option>`;
    })
  );
}

 // Artist Print Card
 function printCardArtist(array, container) {
  container.innerHTML = "";
  array.forEach(({ id, image, title, dateCreated, price, description, isPublished}) => {
    let eachDate = new Date(dateCreated).toLocaleDateString()
    let card = document.createElement("div");
    let cardImg = document.createElement("img");
    container.append(card);
    card.classList.add("card");
    card.setAttribute("id", id);
    card.append(cardImg);
    cardImg.setAttribute("src", image);
    cardImg.classList.add("card-image");
    let cardBody = document.createElement("div");
    cardBody.classList.add("cardBody");
    card.append(cardBody);
    let cardTitleWrapperAndPrice = document.createElement("div");
    let titleAndDate = document.createElement("div");
    let cardPrice = document.createElement("div");
    cardTitleWrapperAndPrice.classList.add("cardTitleWrapperAndPrice");
    let cardTitle = document.createElement("div");
    let cardDate = document.createElement("div")
    titleAndDate.append(cardTitle, cardDate)
    cardTitle.classList.add("cardTitle");
    cardDate.classList.add("cardDate")
    cardPrice.classList.add("cardPrice");
    cardTitleWrapperAndPrice.append(titleAndDate, cardPrice);
    cardDate.textContent = eachDate
    cardTitle.textContent = title;
    cardPrice.textContent = `$${price}`;
    let descDiv = document.createElement("div");
    let desc = document.createElement("div")
    descDiv.append(desc)
    desc.classList.add("cardArtistDesc")
    desc.innerText = description
    cardBody.append(cardTitleWrapperAndPrice, descDiv);
    createButtonsForArtistItems(card, isPublished);
  });
  console.log(array);
}

// Buttons for Artist Cards
function createButtonsForArtistItems(card, publish) {
  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("button-wrapper");
  const auctionBtn = document.createElement("button");
  const publishBtn = document.createElement("button");
  const removeBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  auctionBtn.classList.add("auctionBtn");
  publishBtn.classList.add("publishBtn");
  removeBtn.classList.add("removeBtn");
  editBtn.classList.add("editBtn");
  auctionBtn.innerText = "Send to Auction";
  removeBtn.innerText = "Remove";
  editBtn.innerText = "Edit";
  buttonWrapper.append(auctionBtn, publishBtn, removeBtn, editBtn);
  card.append(buttonWrapper);
  auctionBtn.addEventListener("click", sendToAuction);
  publishBtn.addEventListener("click", publishUnpublishItem);
  removeBtn.addEventListener("click", removeItem);
  editBtn.addEventListener("click", editItem);
  if(publish) {
    publishBtn.classList.add("publishedStyle")
    publishBtn.classList.remove("unpublishedStyle");
    publishBtn.innerText = "Unpublish"
  } else {
    publishBtn.classList.add("unpublishedStyle")
    publishBtn.classList.remove("publishedStyle");
    publishBtn.innerText = "Publish"
  }
}

// Visitor Print Card
function printCardVisitor(array, container) {
  container.innerHTML = "";
  array.forEach(({ image, artist, title, description, price, id }, idx) => {
    let card = document.createElement("div");
    let cardImg = document.createElement("img");
    container.append(card);
    card.classList.add("card");
    card.setAttribute("id", id);
    card.append(cardImg);

    cardImg.setAttribute("src", image);
    cardImg.classList.add("card-image");

    let cardBody = document.createElement("div");
    cardBody.classList.add("cardBody");
    card.append(cardBody);

    let cardNameAndPrice = document.createElement("div");
    cardBody.append(cardNameAndPrice);
    cardNameAndPrice.classList.add("cardNameAndPrice");
    let cardArtistName = document.createElement("div");
    cardArtistName.classList.add("cardArtist");

    let cardPrice = document.createElement("div");
    cardPrice.classList.add("cardPrice");
    cardNameAndPrice.append(cardArtistName, cardPrice);
    cardArtistName.textContent = artist;
    cardPrice.textContent = `$${price}`;
    let cardTitleAndDesc = document.createElement("div");
    cardBody.append(cardTitleAndDesc);
    let cardTitle = document.createElement("p");
    cardTitle.classList.add("cardTitleVisitor");
    let cardDesc = document.createElement("p");
    cardDesc.classList.add("cardVisitorDesc");
    cardTitleAndDesc.append(cardTitle, cardDesc);
    cardTitle.textContent = title;
    cardDesc.textContent = description;

    if (idx % 2 === 1) {
      card.style.backgroundColor = "var(--dark-brown)";
      cardArtistName.style.color = "var(--light-creme)";
      cardPrice.style.backgroundColor = "var(--light-creme)";
      cardPrice.style.color = "var(--dark-brown)";
      cardTitleAndDesc.style.color = "var(--light-creme)";
    } else {
      card.style.backgroundColor = "var(--light-creme)";
      cardArtistName.style.color = "var(--dark-brown)";
      cardPrice.style.backgroundColor = "var(--dark-brown)";
      cardPrice.style.color = "var(--light-creme)";
      cardTitleAndDesc.style.color = "var(--dark-brown)";
    }
  });
  console.log(array);
}
const publishedItems = publishedItemsFiltering(artistData);

// Filter
function filterItemsFn() {
  let titleVal = filterTitle.value;
  let artistVal = filterArtist.value;
  let minVal = filterMin.value;
  let maxVal = filterMax.value;
  let typeVal = filterType.value;

  console.log(titleVal, artistVal, minVal, maxVal, typeVal);
  const publishedItemsForFilter = publishedItemsFiltering(artistData)
  let filtered = publishedItemsForFilter.filter( item => {
    return (
      (titleVal
        ? item.title.toLowerCase().includes(titleVal.toLowerCase())
        : true) &&
      (artistVal ? item.artist === artistVal : true) &&
      (minVal ? item.price >= minVal : true) &&
      (maxVal ? item.price <= maxVal : true) &&
      (typeVal ? item.type === typeVal : true)
    );
  });

  printCardVisitor(filtered, listingContainer);

  let filteredMsg = document.createElement("p")
  filteredMsg.classList.add("items-found");
 
  listingContainer.prepend(filteredMsg)
  if (filtered.length > 1){
    filteredMsg.innerText = `${filtered.length} Items were found`;
  } else if (filtered.length === 1){
    filteredMsg.innerText = `${filtered.length} Item is found`;
  } else {
    filteredMsg.innerText = "No Items were found"
    filteredMsg.classList.remove("items-found");
    filteredMsg.classList.add("no-items");
  }
  location.hash = "#visitor-listing";
}

// Redirecting small Functions
function chooseArtistFn() {
  if (currentLoggedArtistText === "") {
    return;
  }
  titleArtist.innerText = currentLoggedArtistText;
  updatingDataOnChange(artistData, currentLoggedArtistText, totalIncome, itemsSold)
  location.hash = "#artists";
}

function homeLogo() {
  location.hash = "";
  titleArtist.innerText = "Street ARTists";
  currentLoggedArtistText = "";
  isVisitorJoined = "false";
  localStorage.setItem("isVisitorJoined", isVisitorJoined)
}

function joinAsVisitorFn() {
  location.hash = "#visitor";
  isVisitorJoined = "true"
  localStorage.setItem("isVisitorJoined", isVisitorJoined)
}

// Animate Images
function animateImagesFn(array) {
  for (let i = 0; i < array.length; i++) {
    let eachImage = array[i];
    let img = document.createElement("img");
    img.setAttribute("src", `images/${eachImage}.jpg`);
    img.setAttribute("alt", "gallery image");
    img.classList.add("visitor-image");
    img.addEventListener("click", () => {
      location.hash = "visitor-listing";
    })
    if (i < 6) {
      imageBoxOne.append(img);
    } else {
      imageBoxTwo.append(img);
    }
  }
}

// Carousel
function createCarouselItem({ img, textOne, textTwo }) {
  carousel.innerHTML = `
  <div class="carousel-wrapper">
  <div class="carousel-box1">
    <div class="carousel-box1-image">
     <img class="carousel-image" src="${img}" alt="person">
     <p class="carousel-text">${textOne}</p>
    </div>
  </div>
<span class="cross"></span>
  <div class="carousel-box2">
    <p class="class="carousel-box2-text">${textTwo}</p>
  </div>
</div>
  `;
  let leftArrow = document.createElement("img");
  let rightArrow = document.createElement("img");
  leftArrow.classList.add("carousel-left-arrow");
  rightArrow.classList.add("carousel-right-arrow");
  leftArrow.setAttribute("src", "carousel/left.png");
  rightArrow.setAttribute("src", "carousel/right.png");
  carousel.append(leftArrow, rightArrow);
  leftArrow.addEventListener("click", swipeLeft);
  rightArrow.addEventListener("click", swipeRight);
}

function swipeLeft() {
  if (slide === 0) {
    slide = carouselItems.length - 1;
  } else {
    slide--;
  }
  createCarouselItem(carouselItems[slide]);
}

function swipeRight() {
  if (slide === carouselItems.length - 1) {
    slide = 0;
  } else {
    slide++;
    console.log(slide);
  }
  createCarouselItem(carouselItems[slide]);
}

// Select form
function itemTypesUploadSelect(array, select) {
  array.forEach((type) => {
    select.innerHTML += `
       <option value="${type}">${type}
     `;
  });
}

// Functions for ChartJS
function chartButtonsOnClick(e) {
  slicedArrForChartData = [[], []]
  chartButtons.forEach(button => {
   
    button.classList.remove("button-chart-active")
    button.style.backgroundColor = "#a26a5e"
  })
  let clickedBtn = e.currentTarget 
  clickedBtn.classList.add("button-chart-active");
  clickedBtn.style.backgroundColor = "#d54c2e";
  
  let daysToShow = e.currentTarget.getAttribute("data-id")
  getDays(daysToShow)
  if(myChart) {
    myChart.data.datasets[0].data = slicedArrForChartData[1]
    myChart.data.labels = slicedArrForChartData[0]
    myChart.update()
  }
}

function getDays(numOfDays) {
  let dates = []
   let today = Date.parse(new Date());
   let oneDay = 86400000;
   for(let i = 0; i < numOfDays; i++) {
     let eachDay = oneDay * i
     let allDays = new Date(today - eachDay).toLocaleDateString()
     dates.push(allDays)
   }
   calcDatesAndSold(dates)
}

function calcDatesAndSold(dates) {
  let currentLogged = artistData.filter(item => item.artist === titleArtist.innerText)
  let arr = [] 
  let cuttedSlices = []
        dates.forEach(date => {
          currentLogged.forEach(({dateSold, priceSold}) => {
            let dateC = new Date(dateSold).toLocaleDateString()
            if(dateC === date) {
              arr.push(priceSold)
            } else {
              arr.push(0);
            }
          
          })
        })
        console.log(arr)
        for(let i = 0; i < arr.length; i += currentLogged.length) {
                 let cut = arr.slice(i, i + currentLogged.length);
                 cuttedSlices.push(cut)
        }

        // Returns labels and data but data needs to be calculated for each index
        printDataChart([{dates}, {cuttedSlices}]) 
}

function printDataChart(array) {
  const finalVersion = []
    console.log(array)
     array[1].cuttedSlices.forEach(el => {
        const result = el.reduce((count, el) => el + count , 0)
        finalVersion.push(result)
     })

         slicedArrForChartData[0].push(array[0].dates)
          slicedArrForChartData[1].push(finalVersion)
       console.log(slicedArrForChartData[0], slicedArrForChartData[1])
     

      // returns the complete labels and data but doesn't print
       chartDataJs()
}


// Landing Page variables
const titlePage = document.querySelector("head title");
const logo = document.querySelector("#logo");
const auctionLogo = document.querySelector("#auctionLogo");
const hamburgerMenu = document.querySelector("#hamburgerMenu");
const selectArtist = document.querySelector("#selectArtist");
const chooseArtist = document.querySelector("#chooseArtist");
const joinAsVisitor = document.querySelector("#joinVisitor");
const titleArtist = document.querySelector("#titleArtist");
let currentLoggedArtistText = "";


// Join as Artist fetching Data
fetchUsers(selectArtist)

selectArtist.addEventListener("change", function () {
  currentLoggedArtistText = this.value;
});

selectArtist.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Artist HomePage
const artistContainer = document.querySelector("#artistListingContainer");

// Hamburger menu
const menuPopup = document.querySelector("#menuPopup");
menuPopup.addEventListener("click", (e) => {
  if (e.target.href) {
    menuPopup.classList.toggle("show");
    if(isVisitorJoined === "true") {
      bidBtn.disabled = true;
      bidBtn.classList.add("line-through")
  } 
  }
});
console.log(menuPopup);

hamburgerMenu.addEventListener("click", () => {
  menuPopup.classList.toggle("show");
});

// Artist Budget
const itemsSold = document.querySelector("#totalItemsSold");
const totalIncome = document.querySelector("#totalIncome");
const liveAuctioningItem = document.querySelector("#liveAuctioningItem");

// ChartJS Part
let chartButtons = document.querySelectorAll(".btn-chart")
chartButtons.forEach(button => {
  button.addEventListener("click", chartButtonsOnClick)
}) 

let myChart;
function chartDataJs() {
  if(myChart) {
    myChart.destroy()
    console.log("check chart")
  }
  
  const labels = slicedArrForChartData[0].length > 0 ? slicedArrForChartData[0] : [];
  const dataset = slicedArrForChartData[1].length > 0 ? slicedArrForChartData[1] : [];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Ammount",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: dataset,
        backgroundColor: ["#a26a5e"],
        borderWidth: 0,
        
      },
    ],
  };
  const config = {
    type: "bar",
    data,
    options: {
      indexAxis: "y",
      
    },
  };
  
  myChart = new Chart(document.getElementById("myChart"), config);
}

  
 

// Artist Listing Page

const artistListingContainer = document.querySelector(
  "#artistListingContainer"
);

const newItemArtist = document.querySelector("#newItemArtist");

newItemArtist.addEventListener("click", () => {
  location.hash = "#new/edit";
  submitBtn.innerText = "Add Item";
  formTitle.innerText = "New Item";
});

// Add New Item && Edit
const newItemSelect = document.querySelector("#selectNewItem")
itemTypesUploadSelect(itemTypes, newItemSelect)

// Visitor Homepage

auctionLogo.addEventListener("click", function() {
  location.hash = "#auction";
  if(isVisitorJoined === "true") {
    bidBtn.disabled = false;
    bidBtn.classList.remove("line-through");
} 
})

// Carousel Items
const carouselItems = [
  {
    img: "carousel/person1.jpg",
    textOne:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, ratione explicabo. Eveniet, inventore voluptatem deserunt repudiandae",
    textTwo:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, ratione explicabo. Eveniet, inventore voluptatem deserunt repudiandae",
  },
  {
    img: "carousel/person2.jpg",
    textOne:
      "Lorem ipsum dolor sit amet consectetur  elit. Exercitationem, ratione explicabo. Eveniet, inventore voluptatem deserunt repudiandae",
    textTwo:
      "Lorem ipsum dolor sit amet consectetur elit. Exercitationem, ratione explicabo. Eveniet, inventore voluptatem deserunt repudiandae",
  },
  {
    img: "carousel/person3.jpg",
    textOne:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. ratione explicabo. Eveniet, inventore voluptatem deserunt repudiandae",
    textTwo:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.ratione explicabo. Eveniet, inventore voluptatem deserunt repudiandae",
  },
];

const carousel = document.querySelector("#carousel");
let slide = 0;
createCarouselItem(carouselItems[slide]);

//  Visitor Images Animation Part
const visitorPageImageContainer = document.querySelector("#imageContainer");

const animateImages = [
  "image1",
  "image2",
  "image3",
  "image4",
  "image5",
  "image6",
  "image4",
  "image5",
  "image6",
  "image1",
  "image2",
  "image3",
];

let imageBoxOne = document.createElement("div");
let imageBoxTwo = document.createElement("div");
visitorPageImageContainer.append(imageBoxOne, imageBoxTwo);
imageBoxOne.classList.add("image-box-one");
imageBoxTwo.classList.add("image-box-two");

animateImagesFn(animateImages);


// Visitor Listing

const visitorListingBtn = document.querySelector("#visitorListingBtn");
const listingContainer = document.querySelector("#listingContainer");
const filteringItems = document.querySelector("#filteringItems");

visitorListingBtn.addEventListener("click", () => {
  location.hash = "#visitor-listing";
});

filteringItems.addEventListener("click", () => {
  location.hash = "#filter-cards";
});

printCardVisitor(publishedItems, listingContainer);

// Visitor Listing Items - Filter

const closeFilterMenu = document.querySelector("#closeFilterMenu");
const filterMark = document.querySelector("#filterMark");

const filterTitle = document.querySelector("#title");
const filterArtist = document.querySelector("#artistName");
const filterMin = document.querySelector("#min");
const filterMax = document.querySelector("#max");
const filterType = document.querySelector("#type");

closeFilterMenu.addEventListener("click", () => {
  location.hash = "#visitor-listing";
  listingContainer.innerHTML = "";
  printCardVisitor(publishedItems, listingContainer);
});

fetchUsers(filterArtist)
itemTypesUploadSelect(itemTypes, filterType)


// Event Listeners
window.addEventListener("load", checkLocalStorageValues);
logo.addEventListener("click", homeLogo);
chooseArtist.addEventListener("click", chooseArtistFn)
joinAsVisitor.addEventListener("click", joinAsVisitorFn)
filterMark.addEventListener("click", filterItemsFn)
