if (typeof($) == 'undefined') {
(function(){
  _my_script=document.createElement('SCRIPT');
  _my_script.addEventListener('load', loaded, true);
  _my_script.type='text/javascript';
  _my_script.src='https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
  document.getElementsByTagName('head')[0].appendChild(_my_script);
})();
} else {
	$("#sidebar").remove();
	loaded();
}

function loaded() {
	$.ajaxSetup({timeout: 400000});
	$.fn.loading = function(add) {
		if (add) $(this).append("<img class='loader' src='http://saunby.net/w5/loader.gif' />");
		else $(this).find('.loader').remove();
		return this;
	}
	var sidebar = $("<div id='sidebar'>").css({ position: 'fixed', right: '0', top: '0', width: '30%', height: '100%', background: '#ffc', 'z-index': '999999', padding: '1em', opacity: 0.99, 'overflow-y': 'scroll', 'font-size': '12px'}).appendTo('body').loading(true);
	$.ajax({
		dataType: 'jsonp',
		data: {uri: location.href},
		jsonp: 'callback',
		url: "http://saunby.net/cgi-bin/extrp",
		success: function (data) {
			$("#sidebar").loading(false).empty();
			var places = $("<ul>").appendTo("#sidebar");
			for (ii in data) {
				var title = $("<h3>").text(data[ii].name).click(expandplace);
				$("<li>").append(title).appendTo(places).data(data[ii]);
			}
		}
	
	});
}

function expandplace() {
	var place = $(this).parent();
	$(this).unbind("click").click(hideplace);
	if (place.children(".w5_ext").length == 1) {
		place.children(".w5_ext").show();
		return false;
	}
	var ext = $("<div class='w5_ext'>");
	ext.appendTo(place);
	$("<img>").attr('src', place.data('map')).css("max-width", "90%").appendTo(ext);
	var wp = "http://en.wikipedia.org/wiki/"+place.data("uri").split(":")[1];
	$("<a target='_blank'>").text("W").attr('href', wp).appendTo(ext).css('float', 'right');
}
function hideplace() {
	$(this).unbind("click").click(expandplace);
	$(this).parent().children(".ext").hide();
}
