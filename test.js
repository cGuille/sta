(function (undefined) {
    'use strict';

    var isNode = typeof require !== 'undefined';

    var sta = isNode ? require('./sta') : window.sta,
        STA = sta.STA,
        STAFileManager = sta.STAFileManager;

    var manager = new STAFileManager(),
        evenSta = isNode ? manager.loadFromFile('even-sta.json').newSTA() : new STA(
{"symbols":["a","b"],"states":["even","odd"],"initialState":"even","finalStates":["even"],"transitions":[{"currentState":"even","symbolRead":["a","b"],"nextState":"odd"},{"currentState":"odd","symbolRead":["a","b"],"nextState":"even"}]}),
        words = ['', 'a', 'b', 'aa', 'ab', 'ba', 'bb', 'aaa', 'aab', 'aba', 'abb', 'baa', 'bab', 'bba', 'bbb'];

    words.forEach(function (word) {
        evenSta.reset();
        console.log('Handling "' + word + '"');
        console.log('Is this word valid? ' + (evenSta.isValidWord(word) ? 'Yes !' : 'No.'));
        evenSta.readWord(word);
        console.log('Is this word accepted? ' + (evenSta.accept() ? 'Yes !' : 'No.'));
        console.log();
    });
}());
