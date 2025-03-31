const images = [
	{ link: "https://c4.wallpaperflare.com/wallpaper/929/594/563/left-4-dead-l4d2-hd-wallpaper-preview.jpg" },
	{ link: "https://c4.wallpaperflare.com/wallpaper/953/775/686/left-4-dead-2-wallpaper-preview.jpg" },
	{ link: "https://c4.wallpaperflare.com/wallpaper/949/364/935/left-4-dead-2-wallpaper-preview.jpg" },
	{ link: "https://c4.wallpaperflare.com/wallpaper/340/184/898/left-4-dead-2-wallpaper-preview.jpg" },
	{ link: "https://c4.wallpaperflare.com/wallpaper/101/889/172/left-4-dead-2-wallpaper-preview.jpg" },
]

let repeat = -1;

function image_rand() {
	let carr = document.getElementById('carr-image');
	let rand; 

	do {
		rand = Math.floor(Math.random() * images.length);
	} while (rand === repeat);

	repeat = rand;
	let rs = images[rand].link;

	carr.classList.add("fade-out");

	setTimeout(() => {
		carr.innerHTML = `<img class="img-carrjs fade-in" src="${rs}">`;

		carr.classList.remove("fade-out");
	}, 500);
}

image_rand()

setInterval(image_rand, 5000);
