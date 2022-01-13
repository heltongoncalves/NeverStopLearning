function textToSpeech( text, lang, callback ){
    var u = new SpeechSynthesisUtterance();
    u.text = text;
    u.lang = lang; //'de'; //'en-US';
 
    u.onend = function () {
        if (callback) {
            callback();
        }
    };
 
    u.onerror = function (e) {
        if (callback) {
            callback(e);
        }
    };
 
    speechSynthesis.speak(u);
}
