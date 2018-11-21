$(document).ready(function(){
	// page js ↓
	setTimeout(function(){
		$('.imgSocks').addClass('on');
	}, 1000);

	$('.imgSocks').click(function(){
		if ( !$(this).hasClass('event') )
		{
			$(this).addClass('event');
			setTimeout(function(){
				$('.imgSocks').removeClass('event');
			}, 1000);
		}
	});

	
});