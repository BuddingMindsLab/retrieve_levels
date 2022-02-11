/**************************************************** Helper Functions ****************************************************/

// score update html display
function feedback_fxn(responses, missed, last, practice, practice_length) {
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
        if (last == true) {
            html += 'Fantastic work!<br><br> Your final level is: '
        } else {
            html += 'Level: ';
        }
        if (score>=0 && score<45){
            html += 'Pluto'
            html += '<br><div class="col">\
                    <img src="https://buddingmindslab.github.io/retrieve_levels/resources/img/instructions/reward_screen_1.png"></img>\
                </div><br>'
         } else if (score>=45 && score<90) {
            html += 'Neptune'
            html += '<br><div class="col">\
                    <img src="https://buddingmindslab.github.io/retrieve_levels/resources/img/instructions/reward_screen_2.png"></img>\
                </div><br>'
        } else if (score>=90 && score<135) {
            html += 'Uranus'
            html += '<br><div class="col">\
                    <img src="https://buddingmindslab.github.io/retrieve_levels/resources/img/instructions/reward_screen_3.png"></img>\
                </div><br>'
        } else if (score>=135 && score<180) {
            html += 'Saturn'
            html += '<br><div class="col">\
                    <img src="https://buddingmindslab.github.io/retrieve_levels/resources/img/instructions/reward_screen_4.png"></img>\
                </div><br>'
            if (last) {
                html += 'You will recieve a bonus of $2!<br><br>';
            } else {
                html += 'You will recieve a bonus of $1!<br><br>';
            }
        } else if (score>=180 && score<225) {
            html += 'Jupiter'
            html += '<br><div class="col">\
                    <img src="https://buddingmindslab.github.io/retrieve_levels/resources/img/instructions/reward_screen_5.png"></img>\
                </div><br>'
        } else if (score>=225 && score<270) {
            html += 'Mars'
            html += '<br><div class="col">\
                    <img src="https://buddingmindslab.github.io/retrieve_levels/resources/img/instructions/reward_screen_6.png"></img>\
                </div><br>'
        } else if (score>=270) {
            html += 'EARTH!'
            html += '<br><div class="col">\
                    <img src="https://buddingmindslab.github.io/retrieve_levels/resources/img/instructions/reward_screen_7.png"></img>\
                </div><br>'
        }
        
    }

    // if respond to less than 50% with arrow keys, give reminder
    if (last) {
        if (score/max_score >= 1) {
            html += 'You will recieve a bonus of $3!<br><br>';
        } 
    } else {
        html += 'Missed '+missed+' trials.<br><br>';
        if (keypress_data.map(a=>a=='arrowright'||a=='arrowleft').filter(Boolean).length < Math.round(responses.length*0.5)) {
            html += 'Make sure to respond using the arrow keys on your keyboard.<br><br>';
        } else {
            if (score < Math.round(responses.length*0.5)) {
                html += 'Remember to pick the item that was paired with the object during the <b>LEARNING</b> game.<br><br>'; 
            } else {
                html += 'Good job!<br>';
            }
        }
    }
    

    if (practice) {
        html += 'Press <i>Next</i> to start the real game!<br><br>';
    } else if (last) {
        html += '<br><br>You have almost completed the experiment. Now you will be directed to a brief survey on your experience.<br>\
        You will receive compensation only after completing the survey.<br><br>';
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
                <div id="leftChoice" class="col" style="border-style: solid; border-width: thick; border-color: white;">\
                    <img style="width:'+img_size+'%" src="'+choices[0]+'"><br><br>\
                    <img class="';
        if (choices[0]==A) { html += 'corr"'; }
        else { html += 'inc"'; }
        html += ' id="leftFdb" style="width:'+img_size/2+'%; visibility: hidden;" src="';
        if (choices[0]==A) { html +='resources/img/instructions/check.png'} 
        else { html += 'resources/img/instructions/ex.png' }
        html += '">\
                </div>\
                <div id="rightChoice" class="col" style="border-style: solid; border-width: thick; border-color: white;">\
                    <img style="width:'+img_size+'%" src="'+choices[1]+'"><br><br>\
                    <img class="';
        if (choices[1]==A) { html += 'corr"'; }
        else { html += 'inc"'; }
        html += ' id="rightFdb" style="width:'+img_size/2+'%; visibility: hidden;" src="';
        if (choices[1]==A) { html +='resources/img/instructions/check.png'} 
        else { html += 'resources/img/instructions/ex.png' }        
        html += '">\
                </div>\
            </div>';

    // General questions (show word options)
    } else {
        A_foil =  lure;
        choices = jsPsych.randomization.shuffle([A_category,A_foil]);
        html += '<div class="row" style="height: '+img_size+'%;">\
                <div id="leftChoice" class="col" style="border-style: solid; border-width: thick; border-color: white;">\
                    <br><br><br><br>\
                    <p style="font-size: 90px; text-transform: uppercase;">'+choices[0]+'</p>\
                    <br><br><br><br>\
                    <img class="';
        if (choices[0]==A_category) { html += 'corr"'; }
        else { html += 'inc"'; }
        html += ' id="leftFdb" style="width:'+img_size/2+'%; visibility: hidden;" src="';
        if (choices[0]==A_category) { html +='resources/img/instructions/check.png'} 
        else { html += 'resources/img/instructions/ex.png' }
        html += '">\
                </div>\
                <div><p style="font-size: 100px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></div>\
                <div id="rightChoice" class="col" style="border-style: solid; border-width: thick; border-color: white;">\
                    <br><br><br><br>\
                    <p style="font-size: 90px; text-transform: uppercase;">'+choices[1]+'</p>\
                    <br><br><br><br>\
                    <img class="';
        if (choices[1]==A_category) { html += 'corr"'; }
        else { html += 'inc"'; }
        html += ' id="rightFdb" style="width:'+img_size/2+'%; visibility: hidden;" src="';
        if (choices[1]==A_category) { html +='resources/img/instructions/check.png'} 
        else { html += 'resources/img/instructions/ex.png' }        
        html += '">\
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

function send_data() {
    var end_time = new Date();
    var duration = ((end_time - start_time)/60000).toFixed(2);

    // organize data into sections
    var subject_id = jsPsych.data.get().filter([{exp_section: 'subjectid_survey'}]).values()[0].response.subject_id;
    var age = jsPsych.data.get().filter([{exp_section: 'subjectid_survey'}]).values()[0].response.age;


    var training_responses1 = jsPsych.data.get().filter([{exp_section: 'training_test_practice'}]);
    var training_data1 = {'phase': 'training_practice', 'data': training_responses1.values()};  
    console.log(training_data1);

    var training_responses2 = jsPsych.data.get().filter([{exp_section: 'training_test'}]);
    var training_data2 = {'phase': 'training', 'data': training_responses2.values()};  


    var retrieve1_responses1 = jsPsych.data.get().filter([{exp_section: 'retrieve1_practice'}]);
    var retrieve1_data1 = {'phase': 'retrieve1_practice', 'data': retrieve1_responses1.values()};

    var retrieve1_responses2 = jsPsych.data.get().filter([{exp_section: 'retrieve1'}]);
    var retrieve1_data2 = {'phase': 'retrieve1', 'data': retrieve1_responses2.values()};
    

    var retrieve2_responses1 = jsPsych.data.get().filter([{exp_section: 'retrieve2_practice'}]);
    var retrieve2_data1 = {'phase': 'retrieve2_practice', 'data': retrieve2_responses1.values()}; 

    var retrieve2_responses2 = jsPsych.data.get().filter([{exp_section: 'retrieve2'}]);
    var retrieve2_data2 = {'phase': 'retrieve2', 'data': retrieve2_responses2.values()};

    var retrieve2_q = jsPsych.data.get().filter([{exp_section: 'r2_instruction_quiz'}]);
    var retrieve2_quiz = {'phase': 'retrieve2_quiz', 'data': retrieve2_q.values()};

    var survey = jsPsych.data.get().filter([{exp_section: 'survey'}]);
    var survey_data = {'phase': 'survey', 'data': survey.values()};

    
    var pairs_data = {'phase': 'pairs', 'data': pairs};
    var seq_data = {'phase': 'sequences', 'data': retrieve_sequences};

    // data to save in json file
    var data = {
        experiment: "retrieve_levels",
        repo: "buddingmindslab.github.io",
        subject: subject_id,
        duration: duration,
        date: Date(),
        group: exp_type,
        age: age,
        data: [
            training_data1,
            training_data2,
            retrieve1_data1,
            retrieve1_data2,
            retrieve2_data1,
            retrieve2_quiz,
            retrieve2_data2,
            survey_data,
            pairs_data,
            seq_data
        ]
    }
    
    // send data to savejs
    var xhr = new XMLHttpRequest();
    xhr.open('POST','https://savejs.netlify.app/.netlify/functions/savejs');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.onload = function(){
        if(xhr.status==200){
            var response=JSON.parse(xhr.responseText);
            console.log(response.success);
        }
        else {
            console.log("failed to send data");
        }
    };
    xhr.send(JSON.stringify(data));
    console.log("success sending data");
}