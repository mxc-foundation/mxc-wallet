var terms = {}

$(document).ready(function(){

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
	
})