function publishedItemsFiltering(data) {
    const published = data.filter(item => item.isPublished);
    return published;
  }
  
  function currentLoggedArtistDataFiltering(data, artist) {
     const currentLoggedData = data.filter(item => item.artist === artist)
     return currentLoggedData;
  }
  
  function currentArtistTotalIncomeOfItemsSold(data) {
    const totalIncome = data.reduce((total,item) => total + item.priceSold, 0)
    return totalIncome;
  }
  
  function totalItemsSoldByArtist(data) {
    let countSoldItems = 0;
      for(let i = 0; i < data.length; i++) {
        if(data[i].priceSold) {
          countSoldItems++;
        }
      }
      
      return countSoldItems;
  }
  
  function findIndexOfArray(data, id){
     const cardId = parseInt(id)
     const card = data.find(item => cardId === item.id)
     return card;
  }
  
  function updatingDataOnChange(data, artist, income, iSold) {
       localStorage.setItem("artistData", JSON.stringify(data));
       const publishedItems = publishedItemsFiltering(data);
        const loggedArtist = currentLoggedArtistDataFiltering(data, artist);
        income.innerText = "$" + currentArtistTotalIncomeOfItemsSold(loggedArtist);
        iSold.innerText = `${totalItemsSoldByArtist(loggedArtist)}/${loggedArtist.length}`;
        printCardArtist(loggedArtist, artistListingContainer);
        printCardVisitor(publishedItems, listingContainer);
       localStorage.setItem("currentLoggedArtist", JSON.stringify(loggedArtist));
  }

