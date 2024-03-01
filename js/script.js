const buyBtn = document.getElementById("buy-btn");

buyBtn.addEventListener('click', () => {
  const selectPhones = document.getElementById("search-field");
  selectPhones.scrollIntoView({ behavior: "smooth" });
})

const loadDefaultPhones = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
  const defaultData = await response.json();
  const defaultPhones = defaultData.data;
  displayPhones(defaultPhones);
}



const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // 1. get the container by id
  const phoneContainer = document.getElementById("phones-container");
  phoneContainer.innerHTML = "";

  // display show all buttons if there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-container');
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden');
  }
  else {
    showAllContainer.classList.add('hidden');
  }

  // console.log('is show all', isShowAll);
  // display only first 12 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }


  phones.forEach((phone) => {
    // console.log(phone);
    // 2. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card xs:w-[23rem] md:w-96 bg-white shadow-xl p-4 border border-[#CFCFCF] space-y-2`;

    // 3. set innerHTML
    phoneCard.innerHTML = `
        <figure class="px-6 py-5 bg-[#0D6EFD0D] rounded-2xl">
        <img
          src="${phone.image}"
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2
          class="card-title poppins-fonts text-2xl font-bold text-[#403F3F]"
        >
          ${phone.phone_name}
        </h2>
        <p
          class="poppins-fonts text-base font-normal text-[#706F6F] text-center"
        >
          There are many variations of
          <br />
          passages of available, but the
          <br />
          majority have suffered
        </p>
        <h3 class="poppins-fonts text-2xl font-bold text-[#403F3F]">
          $ <span>999</span>
        </h3>
        <div class="card-actions">
          <button id="show-details-btn"; 
            class="btn bg-[#0D6EFD] hover:bg-[#5b97f1] text-white rounded-lg poppins-fonts font-bold"
          >
            Show Details
          </button>
        </div>
      </div>
    `;
    // 4. appendChild
    phoneContainer.appendChild(phoneCard);

    const showDetailsBtn = phoneCard.querySelector("#show-details-btn");

    showDetailsBtn.addEventListener("click", () => {
      handleShowDetails(phone.slug);
    });
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
};

const handleShowDetails = async (slug) => {
  // console.log("phone slug", slug);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slug}`
  );
  const data = await res.json();
  console.log(data);
  const phone = data.data;

  showPhoneDetails(phone);

};

const showPhoneDetails = (phone) => {  
  const showDetailContainer = document.getElementById("show-detail-container");

  showDetailContainer.innerHTML = `
  <figure class="px-6 py-2 bg-[#0D6EFD0D] rounded-2xl flex items-center justify-center">
        <img
          src="${phone.image}"
          alt="phone"
          class="rounded-xl"
        />
      </figure>
      <div class="flex flex-col gap-2 my-3">
        <h2
          class="card-title poppins-fonts text-2xl font-bold text-[#403F3F]"
        >
          ${phone.name}
        </h2>
        <p
          class="poppins-fonts text-base font-normal text-[#706F6F]"
        >
          It is a long established fact that a reader will be distracted by the readable content
          <br>
          of a page when looking at its layout.
        </p>
        <p class="text-xl text-[#403F3F] poppins-fonts font-semibold">Storage: <span class="text-[#706F6F] font-normal">${phone?.mainFeatures?.storage}</span></p>
        <p class="text-xl text-[#403F3F] poppins-fonts font-semibold">Display Size: <span class="text-[#706F6F] font-normal">${phone?.mainFeatures?.displaySize}</span></p>
        <p class="text-xl text-[#403F3F] poppins-fonts font-semibold">Chipset: <span class="text-[#706F6F] font-normal">${phone?.mainFeatures?.chipSet}</span></p>
        <p class="text-xl text-[#403F3F] poppins-fonts font-semibold">Memory: <span class="text-[#706F6F] font-normal">${phone?.mainFeatures?.memory}</span></p>
        <p class="text-xl text-[#403F3F] poppins-fonts font-semibold">Slug: <span class="text-[#706F6F] font-normal">${phone.slug}</span></p>
        <p class="text-xl text-[#403F3F] poppins-fonts font-semibold">Release date: <span class="text-[#706F6F] font-normal">${phone.releaseDate}</span></p>
        <p class="text-xl text-[#403F3F] poppins-fonts font-semibold">Brand: <span class="text-[#706F6F] font-normal">${phone.brand}</span></p>
        <p class="text-xl text-[#403F3F] poppins-fonts font-semibold">GPS: <span class="text-[#706F6F] font-normal">${phone?.others?.GPS !== undefined ? phone.others.GPS : "Not Available"}</span></p>
      </div>

  `;
  // show the modal
   show_details_modal.showModal();
}





// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText, isShowAll);
};

const searchFields = document.getElementById("search-field");
searchFields.addEventListener('keypress', (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});


const searchBtn = document.getElementById("handle-search-btn");
searchBtn.addEventListener("click", handleSearch);

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");

  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  }
  else {
    loadingSpinner.classList.add("hidden");
  }

};

const handleShowAll = () => {
  handleSearch(true);
}

const showAllBtn = document.getElementById("show-all-btn");
showAllBtn.addEventListener('click', handleShowAll);

loadDefaultPhones();


