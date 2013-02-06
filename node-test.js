(function (undefined) {
    'use strict';

    var sta = typeof require !== 'undefined' ? require('./sta') : window.sta,
        STA = sta.STA,
        STAFileManager = sta.STAFileManager;

    var manager = new STAFileManager(),
        evenSta = manager.loadFromFile('even-sta.json').newSTA(),
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
