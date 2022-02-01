/**************************************************** Helper Functions ****************************************************/

// score update html display
function feedback_fxn(responses, last, practice, practice_length) {
    var html = '';
    var max_score = 270; // total possible is 384, but reach earth at 70% (269)

    if (practice) {
        responses = responses.slice(responses.length-practice_length, responses.length);
        //max_score = responses.length;
    }

    var keypress_data = responses.map(a=>a.response);
    var score = responses.map(a=>a.correct).filter(Boolean).length;

    if (practice) {
        html += 'Practice Score: ';
        html += Math.round((score/responses.length)*100,1) +'%<br><br>';
    } else {
        html += 'Level: ';
        if (score>=0 && score<45){
            html += 'Pluto'
         } else if (score>=45 && score<90) {
            html += 'Neptune'
        } else if (score>=90 && score<135) {
            html += 'Uranus'
        } else if (score>=135 && score<180) {
            html += 'Saturn'
        } else if (score>=180 && score<225) {
            html += 'Jupiter'
        } else if (score>=225 && score<270) {
            html += 'Mars'
        } else if (score>=270) {
            html += 'EARTH!'
        }
        html += '<br><div class="col">\
                    <img style="width:'+img_size+'%" src="retrieve_levels/resources/img/instructions/reward_screen.png"></img>\
                </div><br>'
    }

    // if respond to less than 50% with arrow keys, give reminder
    if (keypress_data.map(a=>a=='arrowright'||a=='arrowleft').filter(Boolean).length < Math.round(responses.length*0.5)) {
        html += 'Make sure to respond using the arrow keys on your keyboard.<br><br>';
    } else {
        if (score < Math.round(responses.length*0.5)) {
            html += 'Remember to pick the item that was paired with the object during the <b>LEARNING</b> game.<br><br>'; 
        } else {
            html += 'Good job!<br>';
        }
    }

    if (practice) {
        html += 'Press <i>Next</i> to start the real game!<br><br>';
    } else if (last) {
        html += 'Press <i>Next</i> to go on to the next game!<br><br>';
    } else {
        html += 'Press <i>Next</i> to continue the game!<br><br>';
    }
    
    return html;
}

// AFC question html display
var A_foil = '';
var choices = [];
function AFC_display(A, B, A_category, question, lure, training) {

    var html = '';

    if (training) {
        // B cue at top
        html += '<div class="row">\
                    <div class="col">\
                        <img style="width:'+img_size/2+'%" src="'+B+'">\
                    </div>\
                </div>';
    }

    // Specific and neutral questions(show image options)
    if (question != 'general'){
        if (lure.substring(lure.length - 4) != '.jpg') {
            A_foil= pairs.filter(a=>a.lures.A_item == lure)[0].A; // get lure image name from label (e.g. "Ap1" -> "apple6.jpg")
        } else {
            A_foil= lure;
        }
        choices = jsPsych.randomization.shuffle([A,A_foil]);
        html += '<div class="row">\
                <div id="leftChoice" class="col ';
        if (choices[0]==A) { html += 'corr"'; }
        else { html += 'inc"'; }
        html += ' style="border-style: solid; border-width: thick; border-color: white;">\
                    <img style="width:'+img_size+'%" src="'+choices[0]+'">\
                </div>\
                <div id="rightChoice" class="col ';
        if (choices[1]==A) { html += 'corr"'; }
        else { html += 'inc"'; }
        html += ' style="border-style: solid; border-width: thick; border-color: white;">\
                    <img style="width:'+img_size+'%" src="'+choices[1]+'">\
                </div>\
            </div>';

    // General questions (show word options)
    } else {
        A_foil =  lure;
        choices = jsPsych.randomization.shuffle([A_category,A_foil]);
        html += '<div class="row" style="height: '+img_size+'%;">\
                <div id="leftChoice" class="col ';
        if (choices[0]==A_category) { html += 'corr"'; }
        else { html += 'inc"'; }
        html += '" style="border-style: solid; border-width: thick; border-color: white;">\
                    <br><br><br><br>\
                    <p style="font-size: 90px; text-transform: uppercase;">'+choices[0]+'</p>\
                    <br><br><br><br>\
                </div>\
                <div><p style="font-size: 100px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></div>\
                <div id="rightChoice" class="col ';
        if (choices[1]==A_category) { html += 'corr"'; }
        else { html += 'inc"'; }        
        html += '" style="border-style: solid; border-width: thick; border-color: white;">\
                    <br><br><br><br>\
                    <p style="font-size: 90px; text-transform: uppercase;">'+choices[1]+'</p>\
                    <br><br><br><br>\
                </div>\
            </div>';
    }
        
    // audio files (for feedback)
    html += '<audio controls muted hidden id="correctAudio">\
                <source src="'+pos_feedback_aud+'" type="audio/wav">\
                Your browser does not support the audio element.\
            </audio>\
            <audio controls muted hidden id="incorrectAudio">\
                <source src="'+neg_feedback_aud+'" type="audio/wav">\
                Your browser does not support the audio element.\
            </audio>';

    return html;
}

// return if response was correct or not
function is_correct(data) {
    var correct = false;
    if (data.question == 'general') {
        if( ( (data.response == 'arrowright') && choices[1]==data.A_category)
            || ( (data.response == 'arrowleft') && choices[0]==data.A_category) ){ 
            correct = true;
        } 
    } else {
        if( ( (data.response == 'arrowright') && choices[1]==data.A_item)
            || ( (data.response == 'arrowleft') && choices[0]==data.A_item) ){ 
            correct = true;
        } 
    }
    return correct;
}