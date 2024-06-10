$(function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var imgEle = new Image();
	imgEle.src = './assets/HajjGreeting.png';

	imgEle.onload = function() {
		canvas.width = imgEle.width;
		canvas.height = imgEle.height;
		ctx.drawImage(imgEle, 0, 0);
		ctx.font = "27pt ltazermedium";
	}

	$(document).on('input', '#name', function(){
		//redraw image
	    ctx.clearRect(0,0,canvas.width,canvas.height);
	    ctx.drawImage(imgEle, 0, 0);

		var name = $(this).val().trim();
		var nameArr = name.split(' ');

		var nNameArr = [''];
		for (var i=0; i<nameArr.length; i++) {
			var tPrx = nNameArr[0] + nameArr[i];
			if (tPrx.length <= 30)
				nNameArr[0] += ' '+ nameArr[i];
			else
				nNameArr[1] += ' '+ nameArr[i]; 
		}
		
		for (var i=0; i<nNameArr.length; i++) {
			if (i >= 2) return;

			$('.name-place').html(nNameArr[i]);
	
	
			 var textWidth = ctx.measureText(nNameArr[i] ).width

		    //refill text
		    var textX = 280 + textWidth; //textWidth + ( (parseInt(canvas.width) - parseInt(textWidth) ) / 2 ) ;
		    var textY =  parseInt(canvas.height) - 47;//parseInt(canvas.height/2) + 90
		    

		    ctx.fillStyle = "#007599";
			
			

		   	ctx.fillText(nNameArr[i], textX, textY + (i*60));
		}

		return false;
	});

	$('.btn-primary').click(function() {
		if ($('#name').val().trim() == '')
			return false;
		
		var dataUrl = document.getElementById('canvas').toDataURL('image/jpeg', 1);
		
		var image = new Image();
        image.src = dataUrl

        var w = window.open("");
        w.document.write(image.outerHTML);
		
		//$(this).attr('href', document.getElementById('canvas').toDataURL('image/jpeg', 0.5));
		//$(this).attr('download', 'Eid-Greeting.jpg');

		$('#name').val('');
		$('#name').trigger('input');
	});
});