let mainMenuItem = document.querySelectorAll("#main nav ul li"),
	mainMenuItemLink = document.querySelectorAll("#main nav ul li a"),
	subMenuContainer = document.querySelectorAll("#subMenu"),
	subMenu = document.querySelectorAll("#subMenu ul"),
	subMenuItem = document.querySelectorAll("#subMenu li"),
	subMenuItemLink = document.querySelectorAll("#subMenu li a"),
	lastSelectedSub,
	help = document.getElementById("help");
	
let isMobileDevice = false;
	hamburger = document.getElementById("showMobileMenu"),
	closeMMenu = document.getElementById("closeMobileMenu"),
	closeMMenuAlt = document.getElementById("closeMobileMenuAlt"),
	backToMainMenu = document.querySelectorAll(".selectedMainMenuItem a")[0];

function checkMobileDevice() {
	return isMobileDevice = window.matchMedia("(any-pointer:coarse)").matches;
}

	
/************* MAIN MENU MANIPULATION *************/
mainMenuItemLink.forEach(llink => {
	llink.addEventListener("click", (e) => {
		document.getElementById("subMenu").classList.add("shown");
		mainMenuItem.forEach(item => {
			item.classList.remove("active");
		});
		llink.parentElement.classList.add("active");
		let destination = llink.getAttribute("data-subid");
		if (checkMobileDevice() == true) {
			let	selectedMainMenuItem = llink.innerText;
			backToMainMenu.innerHTML = "<img alt='Naspäť' src='./assets/img/header/Icons.svg' />" + selectedMainMenuItem;
			if (destination == "help") {
				getContents(help, e);
				document.getElementById("menuBlock").classList.remove("mobileMenuShown");
				document.getElementById("subMenu").classList.remove("shown");
			}
		}

		subMenu.forEach(subLink => {
			subLink.classList.remove("active");
			if (subLink.getAttribute("id") == destination) {
				subLink.classList.add("active");
			}
		});
		subMenuItem.forEach(sItem => {
			if (checkMobileDevice() == false) {
				sItem.classList.remove("active");
			}
		});
		
		
	});
	
});

/************* SUBMENU MANIPULATION *************/
subMenuItemLink.forEach(sLink => {
	sLink.addEventListener("click", (e) => {
		subMenuItem.forEach(sItem => {
			sItem.classList.remove("active");
		});
		sLink.parentElement.classList.add("active");
		lastSelectedSub = sLink;
		getContents(sLink, e);
		
		if (checkMobileDevice() == true) {
			document.getElementById("menuBlock").classList.remove("mobileMenuShown");
			document.getElementById("subMenu").classList.remove("shown");
		}
		
	}, true);
});


/***************HELP LINK GET CONTENT************************/
help.addEventListener("click", (e) => {
	getContents(help, e);
});


/*************FUNCTION TO GET CONTENT FROM ANOTHER PAGE AND PLACE IT TO THE CONTENT CONTAINER**************/
function getContents(source, e) {
	const obj = document.getElementById("content");
	if (typeof obj != "undefined") {
		document.getElementById("content").animate([{opacity: 1}, {opacity: 0}, {opacity: 1}], 800);
		setTimeout(() => {
			document.getElementById("innerContent").innerHTML = "<object type='text/html' data='" + source + "'></object>";
			window.history.replaceState(null, "", source);
		}, 400);
	}
	e.preventDefault();
}




/*******************MOBILE MENU MANIPULATION*********************/
hamburger.addEventListener("click", () => {
	document.getElementById("menuBlock").classList.add("mobileMenuShown");
});
closeMMenu.addEventListener("click", () => {
	document.getElementById("menuBlock").classList.remove("mobileMenuShown");
});
closeMMenuAlt.addEventListener("click", () => {
	document.getElementById("menuBlock").classList.remove("mobileMenuShown");
	document.getElementById("subMenu").classList.remove("shown");
});
backToMainMenu.addEventListener("click", () => {
	document.getElementById("subMenu").classList.remove("shown");
});
