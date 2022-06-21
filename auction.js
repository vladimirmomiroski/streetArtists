
   const bidAmountInput = document.querySelector("#ammountBid");
    const bidBtn = document.querySelector("#bidBtn");
    const containerWrapper = document.querySelector(".containerWrapper");
    const resultsWrapper = document.querySelector(".resultsWrapper")
    containerWrapper.append(resultsWrapper)
    const timer = document.querySelector(".infoClock")
    bidBtn.disabled = true
   

    let timerInterval;

    function initTimer(time) {
        if (timerInterval) {
            clearInterval(timerInterval)
        }
           
        timer.innerText = time;

        timerInterval = setInterval(() => {
           if (time === -1) {
                alert("Auction is finished");
                clearInterval(timerInterval)
                timer.innerText = "No item on Auction now"
                const cardFromStorage = localStorage.getItem("auctionCard")
                const cardFromAuction = JSON.parse(cardFromStorage)
                let {id, artist} = cardFromAuction[0]
                if(itemsTrack.length > 0) {
                    bidBtn.disabled = true;
                    artistData = artistData.filter(item => item.id !== id)
                    cardFromAuction[0].priceSold = itemsTrack[itemsTrack.length - 1]
                    artistData.push(cardFromAuction[0])
                    liveAuctioningItem.innerText = "/";
                    console.log(artistData)
                    updatingDataOnChange(artistData, artist, totalIncome, itemsSold);
                }
                
                auctionContainer.innerHTML = ""
                resultsWrapper.innerHTML = ""
                localStorage.removeItem("clock");
                localStorage.removeItem("itemsTrack");
                localStorage.removeItem("auctionCard");
                return
            }
            timer.innerHTML = `<i class="far fa-clock"></i> ${timeFormat(time)}`
            localStorage.setItem("clock", time);
            time-- 
        }, 1000)
    }
    let itemsTrack = []
    function onBidHandler() {
        let bidAmm = bidAmountInput.value
        if(bidAmm === "") {
            return;
        }
        const eachPrice = document.createElement("div")
        eachPrice.classList.add("eachPrice")
        eachPrice.innerText = bidAmm
        resultsWrapper.append(eachPrice)
        eachPrice.innerText = "$" + bidAmm
        itemsTrack.push(parseInt(bidAmm));
        localStorage.setItem("itemsTrack", JSON.stringify(itemsTrack))
        liveAuctioningItem.innerText = itemsTrack[itemsTrack.length - 1];

        makeBid(bidAmm).then(data => {
            const { isBidding, bidAmount } = data
            if (isBidding) {
                initTimer(60)
                const eachPrice = document.createElement("div")
                eachPrice.classList.add("eachPrice")
                eachPrice.innerText = bidAmount
                resultsWrapper.append(eachPrice)
                eachPrice.innerText = "$" + bidAmount
                bidAmountInput.setAttribute('min', bidAmount)
                bidAmountInput.value = bidAmount + 10;
                itemsTrack.push(bidAmount)     
                localStorage.setItem("itemsTrack", JSON.stringify(itemsTrack))
                liveAuctioningItem.innerText = itemsTrack[itemsTrack.length - 1];
            } else {
                console.log(itemsTrack)
                console.log("finished")
                bidBtn.disabled = true;
                alert("You won")
            }   
        })
    }
    // initTimer()
    
    bidBtn.addEventListener('click', onBidHandler)



function makeBid(amount) {
    const url = 'https://blooming-sierra-28258.herokuapp.com/bid'
    const data = { amount }

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'origin-when-cross-origin',
        body: JSON.stringify(data)
    }).then(res => res.json());
}


function selectAuctionBtns() {
    let buttons = document.querySelectorAll(".auctionBtn");
    return buttons
  }

  function disableBtns(buttons) {
      buttons.forEach(button => {
          button.disabled = true;
          button.style.textDecoration = "line-through";
      })
  }

function timeFormat(duration) {   
    let format = "";
    let mins = Math.floor(((duration % 3600) / 60));
    let secs = Math.floor(duration % 60);

    format += "" + mins + ":" + (secs < 10 ? "0" : "");
    format += "" + secs;
   if(typeof duration === "number") {
       return format
   } else {
       return "No Item on Auction right now!"
   }
}









