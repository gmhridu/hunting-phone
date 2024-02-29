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
  // console.log(phones);

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
};

// handle search button
const handleSearch = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText);
};



const searchBtn = document.getElementById("handle-search-btn");
searchBtn.addEventListener("click", handleSearch);

loadDefaultPhones();

// loadPhone();
