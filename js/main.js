$(function(){
	$( 'audio' ).audioPlayer();
	var audio = document.getElementById("audio");
	var currentTime = 0;
	var musicTime = [];
	var musicLyrics = [];
    $.ajax({
        url : "lyrics.txt",
        dataType: "text",
    	success : function(data){
	    	var lines = data.split('\n');
			for(var i = 0;i < lines.length;i++){
				var minutes = parseInt(lines[i].substring(1,3));
				var seconds = parseFloat(lines[i].substring(4,6) + '.' + lines[i].substring(7,9));
				var time = minutes*60 + seconds;
				musicLyrics.push(lines[i].substring(10));
				musicTime.push(time);
			}
			audio.ontimeupdate = function(){
				currentTime = Math.round(audio.currentTime*100)/100;
				for (var j = 0; j < musicTime.length; j++){
					if(currentTime >=  musicTime[j] && (currentTime < musicTime[j+1] || musicLyrics[j+1] === undefined)){
						$("#lyrics").html(musicLyrics[j]);
					}
				}
			}
    	}
    });
});