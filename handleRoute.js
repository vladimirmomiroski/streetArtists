// Routing sections

const landingPage = document.querySelector("#landingPage");
const artistHomePage = document.querySelector("#artistHomePage");
const artistListing = document.querySelector("#artistListing");
const newItemSection = document.querySelector("#newItemSection");
const captureImagePage = document.querySelector("#captureImagePage");
const visitorHomePage = document.querySelector("#visitorHomePage");
const visitorListingPage = document.querySelector("#visitorListingPage");
const filterLayout = document.querySelector("#filterLayout");
const auctionPage = document.querySelector("#auctionPage");

// Handle Route

function handleRoute() {
    let hash = location.hash;
    switch (hash) {
      case hash = "":
        titlePage.innerText = "Street Artists - Landing Page";
        landingPage.style.display = "flex";
        artistHomePage.style.display = "none";
        artistListing.style.display = "none";
        newItemSection.style.display = "none";
        captureImagePage.style.display = "none";
        filterLayout.style.display = "none";
        visitorHomePage.style.display = "none";
        visitorListingPage.style.display = "none";
        auctionPage.style.display = "none"
        logo.style.display = "none";
        auctionLogo.style.display = "none";
        hamburgerMenu.style.display = "none";
        break;
      case hash = "#artists":
        titlePage.innerText = "Street Artists - Artists Page";
        landingPage.style.display = "none";
        artistHomePage.style.display = "block";
        artistListing.style.display = "none";
        newItemSection.style.display = "none";
        captureImagePage.style.display = "none";
        visitorHomePage.style.display = "none";
        filterLayout.style.display = "none";
        visitorListingPage.style.display = "none";
        auctionPage.style.display = "none"
        logo.style.display = "block";
        auctionLogo.style.display = "none";
        hamburgerMenu.style.display = "block";
        break;
        case hash = "#artists/items":
            titlePage.innerText = "Street Artists - Artist Items";
            landingPage.style.display = "none";
            artistHomePage.style.display = "none";
            artistListing.style.display = "block";
            newItemSection.style.display = "none";
            captureImagePage.style.display = "none";
            visitorHomePage.style.display = "none";
            visitorListingPage.style.display = "none";
            filterLayout.style.display = "none";
            auctionPage.style.display = "none"
            logo.style.display = "block";
            auctionLogo.style.display = "none";
            hamburgerMenu.style.display = "block";
            break;
            case hash = "#new/edit":
              titlePage.innerText = "Street Artists - New/Edit";
              landingPage.style.display = "none";
              artistHomePage.style.display = "none";
              artistListing.style.display = "none";
              newItemSection.style.display = "block";
              captureImagePage.style.display = "none";
              filterLayout.style.display = "none";
              visitorHomePage.style.display = "none";
              visitorListingPage.style.display = "none";
              auctionPage.style.display = "none"
              logo.style.display = "block";
              auctionLogo.style.display = "none";
              hamburgerMenu.style.display = "block";
              break;
              case hash = "#snapshot_page":
                titlePage.innerText = "Street Artists - Capture Image";
                landingPage.style.display = "none";
                artistHomePage.style.display = "none";
                artistListing.style.display = "none";
                newItemSection.style.display = "none";
                captureImagePage.style.display = "block";
                filterLayout.style.display = "none";
                visitorHomePage.style.display = "none";
                visitorListingPage.style.display = "none";
                auctionPage.style.display = "none"
                logo.style.display = "block";
                initCaptureImagePage()
                break;
       case hash = "#visitor":
        titlePage.innerText = "Street Artists - Visitor Page";
        landingPage.style.display = "none";
        artistHomePage.style.display = "none";
        artistListing.style.display = "none";
        newItemSection.style.display = "none";
        captureImagePage.style.display = "none";
        visitorHomePage.style.display = "block";
        visitorListingPage.style.display = "none";
        filterLayout.style.display = "none";
        auctionPage.style.display = "none"
        logo.style.display = "block";
        auctionLogo.style.display = "block";
        hamburgerMenu.style.display = "none";
        break;
        case hash = "#visitor-listing":
            titlePage.innerText = "Street Artists - Visitor Items";
            landingPage.style.display = "none";
            artistHomePage.style.display = "none";
            artistListing.style.display = "none";
            newItemSection.style.display = "none";
            captureImagePage.style.display = "none";
            visitorHomePage.style.display = "none";
            filterLayout.style.display = "none";
            visitorListingPage.style.display = "block";
            auctionPage.style.display = "none"
            logo.style.display = "block";
            auctionLogo.style.display = "block";
            hamburgerMenu.style.display = "none";
        break;
          case hash = "#filter-cards":
            titlePage.innerText = "Street Artists - Filter Cards";
            landingPage.style.display = "none";
            artistHomePage.style.display = "none";
            artistListing.style.display = "none";
            newItemSection.style.display = "none";
            captureImagePage.style.display = "none";
            visitorHomePage.style.display = "none";
            filterLayout.style.display = "block";
            visitorListingPage.style.display = "none";
            auctionPage.style.display = "none"
            logo.style.display = "block";
            auctionLogo.style.display = "block";
            hamburgerMenu.style.display = "none";
            break;
            case hash = "#auction":
              titlePage.innerText = "Street Artists - Filter Cards";
              landingPage.style.display = "none";
              artistHomePage.style.display = "none";
              artistListing.style.display = "none";
              newItemSection.style.display = "none";
              captureImagePage.style.display = "none";
              visitorHomePage.style.display = "none";
              filterLayout.style.display = "none";
              visitorListingPage.style.display = "none";
              auctionPage.style.display = "block"
              logo.style.display = "block";
              checkForMenu();
              break;
          
    }
  }
  
  // Hashchange
  
  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("load", handleRoute);

  function checkForMenu() {
    if(isVisitorJoined === "true") {
      hamburgerMenu.style.display = "none";
      auctionLogo.style.display = "block"
    } else {
      hamburgerMenu.style.display = "block";
      auctionLogo.style.display = "none"
    }
  }

 