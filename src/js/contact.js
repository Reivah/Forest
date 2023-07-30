const contactName = document.querySelector('#contact-name')
const contactPhone = document.querySelector('#contact-phone')
const contactEmail = document.querySelector('#contact-email')
const contactTextarea = document.querySelector('#contact-msg')
const contactSendBtn = document.querySelector('.contact-btn')
const contactClearBtn = document.querySelector('.contact-clear-btn')
const allInputs = document.querySelectorAll('.contact-label')
const allContactItems = document.querySelectorAll('.contact-item')
const contactPopup = document.querySelector('.contact-popup')

const checkInputs = inputs => {
	inputs.forEach(input => {
		if (input.value === '') {
			declineMsg(input)
		} else {
			clearDecline(input)
		}
	})
}

const declineMsg = input => {
	const contactItem = input.parentElement
	contactItem.classList.add('decline')
}

const clearDecline = input => {
	const contactItem = input.parentElement
	contactItem.classList.remove('decline')
}

const emailVerification = email => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,3})$/i

	if (re.test(email.value)) {
		clearDecline(email)
	} else {
		declineMsg(email)
	}
}

const sendContactForm = () => {
	let declines = 0

	allContactItems.forEach(item => {
		if (item.classList.contains('decline')) {
			declines++
		}
	})

    if(declines === 0){
        contactPopup.classList.add('show-popup-msg')
    }
}

contactClearBtn.addEventListener('click', e => {
	e.preventDefault()
	allInputs.forEach(input => {
		input.value = ''
	})

	allContactItems.forEach(item => {
		item.classList.remove('decline')
	})
})

contactSendBtn.addEventListener('click', e => {
	e.preventDefault()
	checkInputs([contactName, contactPhone, contactEmail, contactTextarea])
	emailVerification(contactEmail)
	sendContactForm()
})
