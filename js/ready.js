$(document).ready(function() {
	// Get both xml get_seasons.xml and xsl file, then process data via xsltProcessor
	$.ajax({
		url: "get_seasons.xml",
		dataType: "xml"
	}).fail(function() {
		document.write('<span style="padding: 10px; background-color: orange; color: #fff; border-radius:5px">We are sorry, but we were unable to get data for you. Please, try again later.</span.');

	}).done(function(xmlData) {
		xml = xmlData;
	});
	// Preload details xsl for later manipulation and detailed data displaying
	$.ajax({
		url: "filter_details.xsl",
		dataType: "xml"
	}).fail(function() {
		document.write('details<span style="padding: 10px; background-color: orange; color: #fff; border-radius:5px">We are sorry, but we were unable to get data for you. Please, try again later.</span.');

	}).done(function(fdxsl) {
		detailsXsl = fdxsl;
	});
	// Get the first xsl for transformation
	$.ajax({
			url: "filter_seasons.xsl",
			dataType: "xml"

		}).fail(function() {
			document.write('<span style="padding: 10px; background-color: orange; color: #fff; border-radius:5px">We are sorry, but we were unable to get data for you. Please, try again later.</span.');

		}).done(function(xsltData) {
			xsl = xsltData;

			xsltProcessor = new XSLTProcessor();
			xsltProcessor.importStylesheet(xsl);
			result = xsltProcessor.transformToFragment(xml,document);
			// insert retrieved dom fragment to select form
			$('#league').html(result);
		});
		getSeasonInfo(7242);

		// On select LIGUE change, get data for corresponding season
		$('#league').change(function() {
			getSeasonInfo(this.value);
			$('#modal').show();
		});

		// On select DATE change, remove all tables expect table containing specified date
		$('#matchdates').change(function() {
			if (this.value == 'all') {
				if ($('#team option:selected').val() == 'all') {
					$('.resultTable, .resultTable > tbody tr').show();
				}
				else {
					$('.resultTable, .resultTable > tbody tr').hide();
					$(".resultTable:contains('"+$('#team option:selected').val()+"')").show();
					$(".resultTable > tbody tr:contains('"+$('#team option:selected').val()+"')").show();
				}
			}
			else {
				if ($('#team option:selected').val() == 'all') {
					$('.resultTable, .resultTable > tbody tr').hide();
					$(".resultTable:contains('"+this.value+"')").show();
					$(".resultTable > tbody tr:contains('"+this.value+"')").show();
				}
				else {
					$('.resultTable, .resultTable > tbody tr').hide();
					$(".resultTable:contains('"+this.value+"')").show();
					$(".resultTable > tbody tr:contains('"+this.value+"')").show();
					$(".resultTable").not(":contains('"+$('#team option:selected').val()+"')").hide();
					$(".resultTable > tbody tr").not(":contains('"+$('#team option:selected').val()+"')").hide();
				}
			}
			if (tableCount == countHiddenTables()) {
				$('.empty').show();
			}
			else {
				$('.empty').hide();
			}
		});
		$('#team').change(function() {
			if (this.value == 'all') {
				if ($('#matchdates option:selected').val() == 'all') {
					$('.resultTable, .resultTable > tbody tr').show();
				}
				else {
					$('.resultTable, .resultTable > tbody tr').hide();
					$(".resultTable:contains('"+$('#matchdates option:selected').val()+"')").show();
					$(".resultTable > tbody tr:contains('"+$('#matchdates option:selected').val()+"')").show();
				}
			}
			else {
				if ($('#matchdates option:selected').val() == 'all') {
					$('.resultTable, .resultTable > tbody tr').hide();
					$(".resultTable:contains('"+this.value+"')").show();
					$(".resultTable > tbody tr:contains('"+this.value+"')").show();
				}
				else {
					$('.resultTable, .resultTable > tbody tr').hide();
					$(".resultTable:contains('"+this.value+"')").show();
					$(".resultTable > tbody tr:contains('"+this.value+"')").show();
					$(".resultTable").not(":contains('"+$('#matchdates option:selected').val()+"')").hide();
				}
			}

			if (tableCount == countHiddenTables()) {
				$('.empty').show();
			}
			else {
				$('.empty').hide();
			}
		});
});
function countHiddenTables() {
	return $('.resultTable').filter(function() {
				return ($(this).css('display') == 'none');
			}).length;
}
function getSeasonInfo(seasonId) {
	$.ajax({
		url: "http://ness-test.tutoky.com/get_matches&type=season&id="+seasonId+"&detailed=yes.xml",
		dataType: "xml"
	}).fail(function() {
		document.write('<span style="padding: 10px; background-color: orange; color: #fff; border-radius:5px">We are sorry, but we were unable to get data for you. Please, try again later.</span.');

	}).done(function(xmlData) {

		xml2 = xmlData;

	$.ajax({
			url: "filter_teams.xsl",
			dataType: "xml"

		}).fail(function() {
			document.write('2<span style="padding: 10px; background-color: orange; color: #fff; border-radius:5px">We are sorry, but we were unable to get data for you. Please, try again later.</span.');

		}).done(function(xsltData) {
			xsl2 = xsltData;

			xsltProcessor = new XSLTProcessor();
			xsltProcessor.importStylesheet(xsl2);

			seasonInfo = xsltProcessor.transformToFragment(xml2,document);

			$(seasonInfo).prepend('<option class="team" value="all">-Select team-</option><option class="matchdates" value="all">-Select date-</option>');

			var $contents = $(seasonInfo).contents();

			$('#team').html($contents.filter('option.team'));
			$('#matchdates').html($contents.filter('option.matchdates'));
			$('#special').html($contents.filter('table'));
			$('#special').prepend('<div id="modal"><span class="alert">Loading... Please wait.</span></div><span class="empty">There are no matches corresponding your selection of team and date. Please change your selection.</span>');
			$('.time').each(function() {
				var utc_time = $(this).text();
				var splited = utc_time.split(':');
				var utc_milisec = Date.UTC(2013,01,01,splited[0], splited[1]);
				var local_time = new Date(utc_milisec);
				$(this).text(local_time.toLocaleTimeString());

			});
			// COUNT RESULT TABLES FOR USE IN FILTRATION (for showing error messege "no results in your selection")
			tableCount = $('.resultTable').length;

			// ON INFO BUTTON CLICK - LOAD XSL AND DISPLAY DETAILS
			$('button').click(function() {
				callAwesomeModalDiv(this);
			});
		});
	});
}
// PRELOAD THE DETAILS XSL SO THE TRANSFORMATION CAN HAPPEN

function callAwesomeModalDiv(object) {
	$('button').removeClass('active');
	$(object).addClass('active');

	if ($('#'+object.value).text()) {
		$('.modal:not(#'+object.value+')').hide();
		$('#'+object.value).toggle(300);
	}
	else {
		$('.modal').hide(300);
		$(object).after('<div class="modal" style="display:none" id="'+object.value+'">Loading detailed info, please wait...</div>');
		$('#'+object.value).show(300);
		//Change the value of first variable in detailsXsl document from "xxx" to <objec.value>(match_id of clicked row).
		detailsXsl.getElementsByTagName('variable')[0].childNodes[0].nodeValue = object.value;
		//Process changed xsl document
		xsltProcessor = new XSLTProcessor();
		xsltProcessor.importStylesheet(detailsXsl);
		filteredDetails = xsltProcessor.transformToFragment(xml2,document);
		$('#'+object.value).html(filteredDetails);
	}
}