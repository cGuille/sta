(function (undefined) {
    'use strict';

    var STA = window.sta.STA,
        sta = null;

    function dataChanged() {
        sta = null;
    }

    document.addEventListener('DOMContentLoaded', function () {
        (function () {
            function getSelectedValues () {
                var i, len,
                    selectedValues = [],
                    options = this.options;

                for (i = 0, len = options.length; i < len; ++i) {
                    if (options[i].selected) {
                        selectedValues.push(options[i].value); 
                    }
                }

                return selectedValues;
            }

            var i, len,
                selects = document.getElementsByTagName('select');
            for (i = 0, len = selects.length; i < len; ++i) {
                selects[i].getSelectedValues = getSelectedValues;
            }
        }());

        (function newSymbol() {
            window.symbols = [];

            var newSymbolInput = document.getElementById('new-symbol'),
                symbolsList = document.getElementById('symbols'),
                transitionSymbols = document.getElementById('transition-symbols');

            function addSymbol(symbol) {
                if (window.symbols.indexOf(symbol) !== -1) {
                    return;
                }
                window.symbols.push(symbol);

                var liElt = document.createElement('li');
                liElt.textContent = symbol;
                symbolsList.appendChild(liElt);

                var optionElt = document.createElement('option');
                optionElt.value = symbol; 
                optionElt.textContent = symbol; 
                transitionSymbols.appendChild(optionElt);

                dataChanged();
            }

            document.getElementById('btn-new-symbol').addEventListener('click', function () {
                if (newSymbolInput.value) {
                    addSymbol(newSymbolInput.value);
                    newSymbolInput.value = '';
                }
            });
        }());

        (function newState() {
            window.states = [];

            var newStateInput = document.getElementById('new-state'),
                statesList = document.getElementById('states'),
                chooseInitialState = document.getElementById('choose-initial-state'),
                initialStateElt = document.getElementById('initial-state'),
                chooseFinalState = document.getElementById('choose-final-state'),
                transitionInStates = document.getElementById('transition-in-state'),
                transitionOutStates = document.getElementById('transition-out-state');

            function addState(state) {
                if (window.states.indexOf(state) !== -1) {
                    return;
                }
                window.states.push(state);

                var liElt = document.createElement('li');
                liElt.textContent = state;
                statesList.appendChild(liElt);

                var optionElt = document.createElement('option');
                optionElt.value = state; 
                optionElt.textContent = state; 

                chooseInitialState.appendChild(optionElt.cloneNode(true));
                chooseFinalState.appendChild(optionElt.cloneNode(true));
                transitionInStates.appendChild(optionElt.cloneNode(true));
                transitionOutStates.appendChild(optionElt.cloneNode(true));

                dataChanged();
            }

            document.getElementById('btn-new-state').addEventListener('click', function () {
                if (newStateInput.value) {
                    addState(newStateInput.value);
                    newStateInput.value = '';
                }
            });
        }());

        (function newTransition() {
            window.transitions = [];

            var transitionsList = document.getElementById('transitions'),
                transitionSymbols = document.getElementById('transition-symbols'),
                transitionInState = document.getElementById('transition-in-state'),
                transitionOutState = document.getElementById('transition-out-state');

            function addTransition(transition) {
                window.transitions.push(transition);

                var liElt = document.createElement('li');
                liElt.textContent = transition.currentState + ' - (' + transition.symbolRead.join('|') + ') -> ' + transition.nextState;
                transitionsList.appendChild(liElt);

                dataChanged();
            }

            document.getElementById('btn-new-transition').addEventListener('click', function () {
                if (!transitionInState.value || !transitionOutState.value || !transitionSymbols.value) {
                    return;
                }
                var transition = {};
                transition.currentState = transitionInState.value;
                transition.nextState = transitionOutState.value;
                transition.symbolRead = transitionSymbols.getSelectedValues();

                addTransition(transition);
            });
        }());

        (function testWord() {
            var resultElt= document.getElementById('result'),
                timeout = null,
                wordInput = document.getElementById('word'),
                chooseInitialState = document.getElementById('choose-initial-state'),
                chooseFinalState = document.getElementById('choose-final-state');

            function getStaParams() {
                var params = {};

                params.symbols = window.symbols;
                params.states = window.states;
                params.transitions = window.transitions;
                params.initialState = chooseInitialState.value;
                params.finalStates = chooseFinalState.getSelectedValues();

                return params;
            }

            wordInput.addEventListener('keyup', function () {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                timeout = window.setTimeout(function () {
                    if (sta === null) {
                        sta = new STA(getStaParams());
                    }
                    sta.reset();

                    var word = wordInput.value;
                    resultElt.innerHTML = 'Handling "' + word + '"<br />Is this word valid? ' + (sta.isValidWord(word) ? 'Yes !' : 'No.') + '<br />';
                    sta.readWord(word);
                    resultElt.innerHTML += 'Is this word accepted? ' + (sta.accept() ? 'Yes !' : 'No.');
                }, 200);
            });
        }());

        (function exportSTA() {
            var dumpZone = document.getElementById('dump');

            document.getElementById('btn-to-json').addEventListener('click', function () {
                if (!sta) {
                    alert('Aucun automate n\'a été généré.');
                    return;
                }
                dumpZone.textContent = sta.toSTAFile().toString();
            });
        }());
    });
}());
