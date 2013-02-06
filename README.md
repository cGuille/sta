sta
===

A JS module to run [State Transition Systems](http://en.wikipedia.org/wiki/State_transition_system) in a NodeJS or browser environment.
See [test.js](https://github.com/cGuille/sta/blob/master/test.js) if you are looking for a code sample.

[even-sta.json](https://github.com/cGuille/sta/blob/master/even-sta.json) is a file representing an STA which has the following properties:
  - valid symbols: 'a', 'b';
  - accepted words: those composed of an even number of symbols;
  - sample set of accepted words: "", "aa", "ab", "aaba"…
  - sample set of rejected words: "a", "aaa", "aba", "aab"…

Please consider that this code has not been fully tested.

TODO:
  - Comments;
  - Error handling;
  - Add a functionality to check whether a loaded STA is consistent or not.


Try it
======

If you have a NodeJS environment, you can clone the repo and run the sample script:

    git clone https://github.com/cGuille/sta.git
    cd sta
    node test.js

Otherwise, once you have cloned the repo, you can open the sample file [test.html](https://github.com/cGuille/sta/blob/master/test.html) in any recent browser and look into the console to see the output.
