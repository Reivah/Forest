// ------------------------------------------------------
// NAV-HAMBURGER SCRIPT

// ------------------------------------------------------
const mobileNavItems = document.querySelectorAll('.mobile-item')
const navMobile = document.querySelector('.nav-mobile')
const hamburgerBtn = document.querySelector('.hamburger-icon')
const body = document.querySelector('body')

const showMobileMenu = () => {
	navMobile.classList.toggle('mobile-show')

	mobileNavItems.forEach(item => {
		item.addEventListener('click', () => {
			navMobile.classList.remove('mobile-show')
			hamburgerBtn.classList.remove('open')
			body.classList.remove('no-scroll')
		})
	})
	hamburgerBtn.classList.toggle('open')
	body.classList.toggle('no-scroll')
}

hamburgerBtn.addEventListener('click', showMobileMenu)

const sections = document.querySelectorAll('section')
const navLinks = document.querySelectorAll('.nav-link')

window.onscroll = () => {
	sections.forEach(section => {
		let top = window.scrollY
		let offset = section.offsetTop
		let height = section.offsetHeight
		let id = section.getAttribute('id')

		if (top > offset && top < offset + height) {
			navLinks.forEach(link => {
				link.classList.remove('active')
				document.querySelector('.nav-link[href*=' + id + ']').classList.add('active')
			})
		}

	})
	
}


