selectNsfw = document.getElementById("nsfw")
search = document.getElementById("reddit")

selectNsfw.addEventListener('change', updateRules);
search.addEventListener('keyup', updateSub);

async function updateSub(e) {
	if (e.key === 'Enter' || e.keyCode === 13) {
		$(".grid").empty();
		$(".scroll-arrow")[0].style.opacity = 0;
		await getContent(search.value)
	}
}
async function updateRules(e) {
	$(".grid").empty();
	$(".scroll-arrow")[0].style.opacity = 0;
	await getContent(search.value)
	
}

async function getContent(s) {
	seeNsfw = document.getElementById("nsfw").checked
	await fetch(`https://www.reddit.com/r/${s}/.json?sort=top&t=all&limit=100&count=100`)
		.then((result) => {
			return result.json();
		})
		.then((content) => {
			for (i = 0; i < content.data.children.length; i++) {

				image = content.data.children[i].data.url_overridden_by_dest;
				nsfw = content.data.children[i].data.over_18 && !seeNsfw
				if (!image.includes("i.redd.it") || nsfw)
					continue

				$(
					`<div class="img-wrapper">
						<img src="${image}" class="img-content">
						<div class="content fade">${content.data.children[i].data.title}</div>
					</div>`
				).appendTo(".grid")
			}
		})
	$(".scroll-arrow")[0].style.opacity = 1;
}

const checkpoint = 200;

window.addEventListener("scroll", () => {
	const currentScroll = window.pageYOffset;
	console.log(currentScroll)
	if (currentScroll <= checkpoint)
  		opacity = 1 - currentScroll / checkpoint;
	else
  		opacity = 0;
	document.querySelector(".input-wrapper").style.opacity = opacity;
});