
const popupPanel = document.querySelector('.popup-box')
const inputEmail = document.querySelector('#email')
const inputName = document.querySelector('#name')
const inputSurname = document.querySelector('#surname')
const inputCredit = document.querySelector('#credit-card')
const openPopupPanel = document.querySelector('.offert-btn')
const sendPopupBtn = document.querySelector('.send-btn')
const popupCloseBtn = document.querySelector('.popup-close-btn')
const popupTabs = document.querySelectorAll('.popup-tab')
const sendMsgBox = document.querySelector('.contact-popup')
const allInputs = document.querySelectorAll('.popup-tab input')
const errorText = document.querySelectorAll('.error-text')


const showError = (input, msg) => {
	const popupTab = input.parentElement
	popupTab.classList.add('error')
	
	const errorMsg = input.nextElementSibling
	errorMsg.textContent = msg
}
const removeError = input => {
	const popupTab = input.parentElement
	popupTab.classList.remove('error')
}

const checkCreditCard = input => {
	if(input.value === ''){
		showError(input, input.placeholder)
	}
}

const checkLength = (input, number) => {
	if(input.value.length < number){
		showError(input, `Numer karty musi składać się z min. ${number} znaków`)
	}
	
}


const checkEmail = email => {
	const regExp =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (regExp.test(email.value)) {
		removeError(email)
	} else {
		showError(email, `Wprowadź poprawny adres e-mail...`)
	}
}


const checkErrors = () => {
	const allPopupTabs = document.querySelectorAll('.popup-tab')
	let errors = 0
	
	allPopupTabs.forEach(popupTab => {
		if (popupTab.classList.contains('error')) {
			errors++
		}
	})

	if (errors === 0) {
		sendMsgBox.classList.add('show-popup-msg')
	}
	
}



const checkInput = input => {
	input.forEach(element => {
		if (element.value === '') {
			showError(element, element.placeholder)
		} else {
			removeError(element)
		}
	})
}


sendPopupBtn.addEventListener('click', e => {
	e.preventDefault();
	checkInput([inputEmail, inputName, inputSurname, inputCredit])
	checkEmail(inputEmail);
	checkLength(inputCredit, 16)
	checkCreditCard(inputCredit)
	checkErrors();
})


openPopupPanel.addEventListener('click', () => {
	popupPanel.style.display = 'block'
})



popupCloseBtn.addEventListener('click', e => {
	e.preventDefault();
    popupPanel.style.display = 'none'
	popupTabs.forEach(tab => {
		tab.classList.remove('error')
	})
	allInputs.forEach(input => {
		input.value = ''
	})
	
})

