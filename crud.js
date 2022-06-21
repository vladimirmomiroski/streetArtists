// Remove item from Artist Listing
 function removeItem(e) {
    let cardHTML = e.currentTarget.parentElement.parentElement;
    console.log(cardHTML)
    let htmlCardId = e.currentTarget.parentElement.parentElement.id;
    const card = findIndexOfArray(artistData, htmlCardId);
    const { id, artist} = card;
    let confirmForDelete = confirm("Are you sure you want to delete this item?");
    if (confirmForDelete) {
      artistData = artistData.filter(item => item.id !== id);
      cardHTML.remove();
      updatingDataOnChange(artistData, artist, totalIncome, itemsSold);
    }
  }

// Edit Item
  function editItem(e) {
    editingMode = true;
    const parentId = e.currentTarget.parentNode.parentNode.id;
    indexCardEdit = findIndexOfArray(artistData, parentId);
    console.log(indexCardEdit)
    let {isPublished, title, description, type, price, image} = indexCardEdit
    isPublishedInput.checked = isPublished;
    titleInput.value = title
    descriptionInput.value = description;
    newItemSelect.value = type;
    priceInput.value = price;
    imgUrlInput.value = image;
    submitBtn.innerText = "Edit";
     formTitle.innerText = "Edit Item";
    location.hash = "#new/edit";
  }

//  Send item to Auction Page
   function sendToAuction(e) {
    const id = e.currentTarget.parentNode.parentNode.id
    let auctionCard = artistData.filter(item => item.id === parseInt(id))
    printAuctionCard(auctionCard, auctionContainer)
    initTimer(20)
    localStorage.setItem("auctionCard", JSON.stringify(auctionCard));
      const allBtns = selectAuctionBtns()
      disableBtns(allBtns)
      location.hash = "#auction"
   }

   function printAuctionCard(array, container) {
     container.innerHTML = ""
     array.forEach(({ image, artist, type, price, id}) => {
          let halfPrice = Math.floor(price / 2);
          let card = document.createElement("card")
          card.classList.add("auction-card")
          card.setAttribute("id", id);
          container.append(card)
          let img = document.createElement("img")
          img.setAttribute("src", image)
          img.classList.add("card-image", "card-auction-image")
          card.append(img)
          let artistAndType = document.createElement("div")
          artistAndType.classList.add("artist-type-wrapper")
          card.append(artistAndType)
          let artistText = document.createElement("div")
          artistText.classList.add("card-artist", "card-artist-auction")
          let typeText = document.createElement("div")
          typeText.classList.add("card-type")
          artistAndType.append(artistText, typeText)
          artistText.innerText = artist;
          typeText.innerText = type;
          let priceText = document.createElement("div");
          card.append(priceText)
           priceText.innerHTML = `
           price: <span class="half-price-card">$${halfPrice}</span>
           <i class="fas fa-sticky-note note-left"></i>
           <i class="fas fa-sticky-note note-right"></i>
           `
          priceText.classList.add("price-auction-card")
     })
      
   }

  //  Publish Item
    function publishUnpublishItem(e) {
     let cardId = e.currentTarget.parentNode.parentNode.id
     const card = findIndexOfArray(artistData, cardId)
     card.isPublished = !card.isPublished
      updatingDataOnChange(artistData, card.artist, totalIncome, itemsSold);
  }

 // Add New Item
  class NewItem {
   constructor(id, dateCreated, isPublished, isAuctioning, artist, dateSold, description, image, title, type, price, priceSold) {
     this.id = id;
     this.dateCreated = dateCreated;
     this.isPublished = isPublished;
     this.isAuctioning = isAuctioning;
     this.artist = artist;
     this.dateSold = dateSold;
     this.description = description;
     this.image = image;
     this.title = title;
     this.type = type;
     this.price = price;
     this.priceSold = priceSold;
   }
 }


const itemForm = document.querySelector("#itemForm");
const isPublishedInput = document.querySelector("#isPublished");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const typeInput = document.querySelector("#type");
const priceInput = document.querySelector("#price");
const imgUrlInput = document.querySelector("#imgUrl");
const auctionContainer = document.querySelector("#cardAuction");
const submitBtn = document.querySelector("#submitBtn");
const formTitle = document.querySelector("#formTitle")
console.log(submitBtn)
const goBack = document.querySelector("#goBack");
isPublishedInput.checked = true;

goBack.addEventListener("click", () => {
     location.hash = "#new/edit"
     formTitle.innerText = "New Item"
     submitBtn.innerText = "Add Item"

})
  
  function newItemOnSubmit(e) {
    e.preventDefault();
    const artist = titleArtist.innerText;
    if(editingMode) {

    submitBtn.innerText = "Edit Card";
    indexCardEdit.isPublished = isPublishedInput.checked
    indexCardEdit.title = titleInput.value
    indexCardEdit.description = descriptionInput.value 
    indexCardEdit.type = typeInput.value
    indexCardEdit.price = parseInt(priceInput.value)
    indexCardEdit.image = imgUrlInput.value
    
    console.log(indexCardEdit)
    editingMode = false;
    location.hash = "#artists/items"
    
    } else {
      isPublishedInput.checked = true;
      const id = new Date().valueOf()
      const dateCreated = new Date().toISOString()
      const isPublished = isPublishedInput.checked
      const isAuctioning = false;
      console.log(artist)
      const dateSold = null;
      const description = descriptionInput.value;
      const image = imgUrlInput.value;
      const title = titleInput.value;
      const type = typeInput.value;
      const price = parseInt(priceInput.value)
      const priceSold = null;
        const itemObj = new NewItem(id, dateCreated, isPublished, isAuctioning, artist, dateSold, description, image, title, type, price, priceSold);
        artistData.push(itemObj) 
    }
    
    updatingDataOnChange(artistData, artist, totalIncome, itemsSold);
    location.hash = "#artists/items"
    this.reset()
}

// Cancel and go back to Artist Listing
const cancelButton = document.querySelector("#cancelBtn");

function cancelFormAction() {
    location.hash = "#artists/items";
}


itemForm.addEventListener("submit", newItemOnSubmit);
cancelButton.addEventListener("click", cancelFormAction);

// Snapshot Page

const snapshotImageContainer = document.querySelector("#snapshotImageContainer")

snapshotImageContainer.addEventListener("click", () => {
  location.hash = "#snapshot_page"
})

// Snapshot Part
function initCaptureImagePage() {
  console.log('Capture image')

  // Initial widht and height of the video, will update later
  let width = 640;
  let height = 0;

  // flag for streaming or not (initial val is false)
  let currentStream;
  let currentStreamingIndex = 0;

  // Global vars in this init function
  let video = null;
  let canvas = null;
  let photo = null;
  let takeSnapShotBtn = null;
  let switchbutton = null;

  let allVideoDevices

  // The image
  let imageData;

  // Take all devices
  navigator.mediaDevices.enumerateDevices().then(data => {
      allVideoDevices = data.filter(device => device.kind === 'videoinput')
      switchbutton.removeAttribute('disabled')
  })

  // Get stream when switching camera
  function getStream() {
      currentStreamingIndex++
      const source = allVideoDevices[currentStreamingIndex % allVideoDevices.length].deviceId

      const constrains = {
          video: {
              deviceId: source ? { exact: source } : undefined
          }
      }

      navigator.mediaDevices.getUserMedia(constrains)
          .then((stream) => {
              currentStream = stream;
              video.srcObject = stream;
          })
  }

  function initCamera() {
      // selectors
      video = document.querySelector('#video');
      canvas = document.querySelector('#canvas');
      photo = document.querySelector('#photo');
      takeSnapShotBtn = document.querySelector('#startButton');
      switchbutton = document.querySelector('#switchButton');

      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
          .then((stream) => {
              currentStream = stream
              video.srcObject = stream;
          })
          .catch(function (err) {
              console.log("An error occurred: " + err);
          });

      video.addEventListener('canplay', function () {

          height = video.videoHeight / (video.videoWidth / width);
      });


      takeSnapShotBtn.addEventListener('click', takepicture);


      switchbutton.addEventListener('click', function () {
          if (currentStream) {
              stopAllStream(currentStream)
          }
          getStream()
      })
  }

  function stopAllStream(stream) {
      stream.getTracks().forEach(track => {
          track.stop();
      });
  }

  function takepicture() {
    const snapshotImgTaken = document.querySelector("#snapshotImgTaken")
      let context = canvas.getContext('2d');

      if (width && height) {
          canvas.width = width;
          canvas.height = height;
          context.drawImage(video, 0, 0, width, height);
          imageData = canvas.toDataURL('image/png');
          photo.setAttribute('src', imageData);
           snapshotImgTaken.src = imageData;
           imgUrlInput.value = imageData;
          
      }
      console.log(photo)
  }

  initCamera()
}













