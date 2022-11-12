const main = document.getElementById('main');
const doubleMoneyBtn = document.querySelector('.double');
const showMillionairesBtn = document.querySelector('.millionaires');
const sortBtn = document.querySelector('.sort');
const calculateWelthBtn = document.querySelector('.calculate');
const addUserBtn = document.querySelector('.add-user');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const resp = await fetch('https://randomuser.me/api');
  const data = await resp.json()

  const user = data.results[0].name;
  const newUser = {
    name: `${user.first} ${user.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  addNewUser(newUser)
}

function addNewUser(user) {
  data.push(user)

  updateDOM()
}

function doubleUserMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 }
  })

  updateDOM()
}



function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM()
}

function showMillionaires() {
  data = data.filter(item => item.money >= 1000000);

  updateDOM()
}

function calculateTotalWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const showWealth = document.createElement('div');
  showWealth.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
  main.appendChild(showWealth)

}

function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(div);
  })
}

function formatMoney(number) {
  return '£' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUserBtn.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleUserMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWelthBtn.addEventListener('click', calculateTotalWealth);
