// copy address to clipboard
function copyToClipboard(el) {
	var clipboard = $('#clipboard')
	clipboard.val('')
	clipboard.val(el.text()).select()
	document.execCommand("copy")
}

$(window).ready(function(){

	$('.icon-contracts').on('click', function() {
		copyToClipboard( $('h2.address-line') )
	})

})