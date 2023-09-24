document.addEventListener('readystatechange', async event => { 
	if (event.target.readyState != "complete") return;

	cardAdders = document.getElementsByClassName("card-adder")
	const cards = await fetch('./tokens.json').then(response => response.json())
	entries = "";
	for (const card of cards.data) {entries += `<a onclick="AddCard(__Player__,'${card.name.replaceAll('\'','\\\'')}','${card.png}')">${card.name} (${card.power}/${card.toughness})</a>\n`}
	const collection = document.getElementsByClassName("dropdown-content");
	for (let i=0;i<collection.length;i++) {
		collection[i].innerHTML += `<input type="text" class="search" placeholder="Search.." id="SearchInput${i+1}" onkeyup="SearchFunction(${i+1})">`;
		collection[i].innerHTML += entries.replaceAll('__Player__', i+1);
	}
});
function HideDropdowns() {
	dropdowns = document.getElementsByClassName("dropdown-content");
	for (i = 0; i < dropdowns.length; i++) {
		if (dropdowns[i].classList.contains("show"))
			dropdowns[i].classList.toggle("show");
	}
}
function ShowDropdown(Player) {	document.getElementById("Dropdown" + Player).classList.toggle("show"); }
function AddCard(Player, Name, png) {
	ShowDropdown(Player);
	NewID = Math.random().toString(16).slice(2);
	document.getElementById("Player" + Player).innerHTML += `
		<div id="${NewID}" class="card ${Name.replaceAll(" ", "_")}">
			<img class="card-img" src=${png} alt="${Name}">
			<div class="tap" onclick="TapCard('${NewID}')"></div>
			<div class="remove" onclick="RemoveCard('${NewID}')"></div>
		</div>
	`;
}
function RemoveCard(ID) {
	card = document.getElementById(ID);
	card.parentNode.removeChild(card);
}
function TapCard(ID) { document.getElementById(ID).classList.toggle('tapped'); }
function FlipPlayer() { document.getElementById("Player1").classList.toggle('flipped'); }
function SearchFunction(Player) {
	var input, filter, ul, li, a, i;
	input = document.getElementById("SearchInput" + Player);
	filter = input.value.toUpperCase();
	div = document.getElementById("Dropdown" + Player);
	a = div.getElementsByTagName("a");
	for (i = 0; i < a.length; i++) {
		txtValue = a[i].textContent || a[i].innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			a[i].style.display = "";
		} else {
			a[i].style.display = "none";
		}
	}
}