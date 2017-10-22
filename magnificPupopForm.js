$(document).ready(function () {

	// Click on the X to hide the link in the popup

	$('.linkFormPupop_close').click(function () {
		let close = $('.linkFormPupop');
		if (close.css('right') === '0px' || close.css('right') === 0) {
			close.css('right', '-128px');
		} else {
			close.css('right', '0');
		}
	});

	// open magnific  first window

	$('#linkFormPupo-inline-popups').magnificPopup({
		delegate: 'a',
		removalDelay: 500, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function () {
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});


	// validation checkbox and getting data answers
	// ======================================

	let squaredArea = $('#pupopFormThirdWindow input[name="Площадь участка"]');
	let landscape = $('#pupopFormThirdWindow input[name="Ландшафт"]');

	$('#pupopFormFirstWindow').change(function () {
		$('#pupopButtonNextSecondWindow').attr('disabled', false);
		setTimeout(function () {
			let landAreaInputValue = $('input[name="landArea"]:checked').val();
			squaredArea.val(landAreaInputValue);
		}, 100)
	});

	$('#pupopFormSecondWindow').change(function () {
		$('#pupopButtonNextThirdWindow').attr('disabled', false);
		setTimeout(function () {
			let landScapeInputValue = $('input[name="landscape"]:checked').val();
			landscape.val(landScapeInputValue);
		}, 100)
	});
	// open magnific second window
	$('#pupopButtonNextSecondWindow').magnificPopup({
		items: {
			src: '#pupopFormSecondWindow',
			type: 'inline'
		}
	});
	// open magnific third window
	$('#pupopButtonNextThirdWindow').magnificPopup({
		items: {
			src: '#pupopFormThirdWindow',
			type: 'inline',
		}
	});


	// end
	// ==========================================


	// input mask
	// ==========================================
	$('#pupopPhone').inputmask({
		"mask": "(999) 999-9999"
	});

	// END input mask ===========================

	//E-mail Ajax Send
	$("#pupopFormThirdWindow").submit(function () { //Change
		let first = $('#pupopFormFirstWindow');
		let second = $('#pupopFormSecondWindow');
		let third = $(this);

		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: third.serialize()
		}).done(function () {
			// alert("Спасибо Вам!");
			setTimeout(function () {
				$.magnificPopup.close();
				first.trigger("reset");
				second.trigger("reset");
				third.trigger("reset");
				$('#pupopButtonNextSecondWindow').attr('disabled', true);
				$('#pupopButtonNextThirdWindow').attr('disabled', true);
			}, 500);
		});
		return false;
	});

});