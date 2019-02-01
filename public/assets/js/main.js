// minifies status
var header = document.getElementById('header')
var headroom  = new Headroom(header)
headroom.init()

// open and close views-menu on mobile
var burger		= $('#burger')
var menuRouter	= $('.menuRouter');


function burger_click(ev) {
	ev.preventDefault();
	menuRouter.toggleClass('active');
}
function burger_unclick(ev) {
	if ($(ev.target).attr('id') == 'burger') return
	menuRouter.removeClass('active')
}
burger.on('click', function(ev) {
	burger_click(ev)
});



// Change wallet name
var walletName = $('.walletName')


function walletName_click(el) {
	el.attr('contenteditable', 'true')
	el.focus()
}
function walletName_unlick(ev) {
	el = $(ev.target)
	if (el.attr('contenteditable') == true) return
	// save new name here ()
}

walletName.on('click', function() {
	walletName_click($(this))
})


// reset initiated interation on _clicks
$(window).on('click', function(ev) {
	burger_unclick(ev)
	walletName_unlick(ev)
})

// for display purposes
var routers = $('[router="true"]')

function switchRoute(ev, el) {
	ev.preventDefault()
	var route = el.attr('router-data')
	
	$('.content-box').hide()
	$('.content-box.' + route).show()
	
	$(window).scrollTop(0)

	routers.removeClass('active')
	el.addClass('active')
}

routers.on('click', function(ev) {
	switchRoute(ev, $(this))
})

$('.content-transactions').hide()
$('.content-contracts').hide()
$('.content-wallet').hide()
$('.content-send').hide()








