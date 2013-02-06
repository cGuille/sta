// STA stands for State Transition System
var _MODULE_NAME_ = 'sta';

(function (exports) {
    'use strict';

    exports.STA = STA;
    exports.STAFileManager = STAFileManager;

    function STA(data) {
        this.symbols = data.symbols;
        this.states = data.states;
        this.initialState = data.initialState;
        this.finalStates = data.finalStates;
        this.transitions = data.transitions;
        this.sortedTransitions = sortTransitions(this.transitions);
        this.state = this.initialState;
    }
    function sortTransitions(transitions) {
        var sorted = {};
        transitions.forEach(function (transition) {
            if (!sorted[transition.currentState]) {
                sorted[transition.currentState] = {};
            }
            transition.symbolRead.forEach(function (symbol) {
                sorted[transition.currentState][symbol] = transition.nextState;
            });
        });

        return sorted;
    }
    STA.prototype.reset = function() {
        this.state = this.initialState;
    };
    STA.prototype.accept = function() {
        return this.finalStates && this.finalStates.indexOf(this.state) !== -1;
    };
    STA.prototype.isValidSymbol = function(symbol) {
        return this.symbols && this.symbols.indexOf(symbol) !== -1;
    };
    STA.prototype.isValidWord = function(word) {
        return word.split('').every(this.isValidSymbol.bind(this));
    };
    STA.prototype.readSymbol = function(symbol) {
        var newState = this.sortedTransitions[this.state][symbol];
        console.log('read "' + symbol + '": ' + this.state + ' > ' + newState);
        this.state = newState;
    };
    STA.prototype.readWord = function(word) {
        word.split('').forEach(this.readSymbol.bind(this));
    };
    STA.prototype.toSTAFile = function() {
        return new STAFile({
            data: {
                symbols: this.symbols,
                states: this.states,
                initialState: this.initialState,
                finalStates: this.finalStates,
                transitions: this.transitions,
            }
        });
    };

    function STAFile(args) {
        this.data = args.data;
        this.filepath = args.filepath;
    }
    STAFile.prototype.toString = function() {
        return JSON.stringify(this.data);
    };
    STAFile.prototype.newSTA = function() {
        return new STA(this.data);
    };

    function STAFileManager() {}
    STAFileManager.prototype.loadFromData = function(data, filepath) {
        return new STAFile({ filepath: filepath, data: data });
    };

    // Following functions are only available in node
    if (typeof window === 'undefined') {
        STAFileManager.prototype.loadFromFile = function(filepath) {
            var rawData = require('fs').readFileSync(filepath);
            return new STAFile({ filepath: filepath, data: JSON.parse(rawData) });
        };

        STAFileManager.prototype.write = function(staFile) {
            if (!staFile.filepath) {
                throw new Error('No file path specified');
            }
            return require('fs').writeFileSync(staFile.filepath, JSON.stringify(staFile.data));
        };
    }
}(typeof exports === 'undefined' ? this[_MODULE_NAME_] = {} : exports));
