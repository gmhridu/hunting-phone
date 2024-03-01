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

const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones);
};

const displayPhones = (phones) => {
  // 1. get the container by id
  const phoneContainer = document.getElementById("phones-container");
  phoneContainer.innerHTML = "";

  // display show all buttons if there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-container');
  if (phones.length > 12) {
    showAllContainer.classList.remove('hidden');
  }
  else {
    showAllContainer.classList.add('hidden');
  }
  // display only first 12 phones
  phones = phones.slice(0, 12);


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
          <button
            class="btn bg-[#0D6EFD] hover:bg-[#5b97f1] text-white rounded-lg poppins-fonts font-bold"
          >
            Show Details
          </button>
        </div>
      </div>
    `;
    // 4. appendChild
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
};

// handle search button
const handleSearch = () => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText);
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

}

loadDefaultPhones();


