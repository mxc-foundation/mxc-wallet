var terms = {}

$(document).ready(function(){

	function updateCoo() {

		terms.popup = $('.popup-box')
		terms.input = $('#inputTerms')
		terms.btn = $('.popup-box .btn-action')
		
		if (Cookies.get('AXS_terms') != '1') {
			terms.popup.fadeIn()
		}

		terms.input.on('change', function(){
			if ($(this).is(':checked')) {
				terms.btn.prop('disabled', false)
				return
			}
			terms.btn.prop('disabled', true)
		})

		terms.btn.on('click', function(){
			if (terms.btn.prop('disabled')) return
			Cookies.set('AXS_terms', '1')
			terms.popup.fadeOut()
		})

	}
	updateCoo()

	function waitForUpdate(){
		terms.update = $('.display-4')
		console.log(0)
		if (terms.update.length == 0) {
			setTimeout(function(){
				waitForUpdate()	
			}, 500)
			return
		}
			Cookies.remove('AXS_terms')
		waitForLogin()
	}
	waitForUpdate()

	function waitForLogin() {
		terms.update = $('.display-4')
		console.log(1)
		if (terms.update.length == 1) {
			setTimeout(function(){
				waitForLogin()	
			}, 500)
			return
		}
		updateCoo()
		waitForUpdate()
	}
	
})

