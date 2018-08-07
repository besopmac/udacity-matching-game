// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js\\app.js":[function(require,module,exports) {
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// collecting all cards on board
var board = document.getElementsByClassName('card');
var cards = [].concat(_toConsumableArray(board));

// getting all cards on the deck
var deck = document.querySelector('.deck');

// init moves variables
var moves = void 0;
var counter = document.querySelector('.moves');

// getting the stars icons and rank list
var stars = document.querySelectorAll('.fa-star');
var starsList = document.querySelectorAll('.stars li');

// getting the matched cards
var matchedCards = document.getElementsByClassName('match');

// the clock variables
var second = 0,
    minute = 0,
    hour = 0;
var timer = document.querySelector('.clock');
var interval = void 0;

// init the congratulations modal and get the close button
var modal = document.getElementById('congrats-modal');
var close = document.querySelector('.close');

// openedCards init
var openedCards = [];

// randomize cards position
function shuffle(array) {
    var control = array.length,
        tempValue = void 0,
        index = void 0;

    while (control !== 0) {
        index = Math.floor(Math.random() * control);
        control -= 1;
        tempValue = array[control];
        array[control] = array[index];
        array[index] = tempValue;
    }

    return array;
}

// shuffle cards when page is refreshed
document.body.onload = start();

// function to start and reset the board
function start() {
    // shuffle cards
    cards = shuffle(cards);

    // clear all classes from each card and append it on deck
    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = '';
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove('show', 'open', 'match', 'disabled');
    }

    // reset moves
    moves = 0;
    counter.innerHTML = moves + ' moves';

    // reset rating
    for (var _i = 0; _i < stars.length; _i++) {
        stars[_i].style.color = '#ffd700';
        stars[_i].style.visibility = 'visible';
    }

    // reset timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector('.clock');
    timer.innerHTML = minute + 'm ' + second + 's';
    clearInterval(interval);
}

// displayCard is a function to change the card's states
var displayCard = function displayCard() {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
};

// adding opened cards to a list and check if they are match or not
function cardOpen() {
    openedCards.push(this);

    var len = openedCards.length;

    if (len === 2) {
        addCounter();
        if (openedCards[0].dataset.type === openedCards[1].dataset.type) {
            matched();
        } else {
            unmatched();
        }
    }
}

// when the cards data-type match
function matched() {
    openedCards[0].classList.add('match', 'disabled');
    openedCards[1].classList.add('match', 'disabled');
    openedCards[0].classList.remove('show', 'open');
    openedCards[1].classList.remove('show', 'open');
    openedCards = [];
}

// when the cards data-type don't match
function unmatched() {
    openedCards[0].classList.add('unmatched');
    openedCards[1].classList.add('unmatched');

    disable();
    setTimeout(function () {
        openedCards[0].classList.remove('show', 'open', 'unmatched');
        openedCards[1].classList.remove('show', 'open', 'unmatched');
        enable();
        openedCards = [];
    }, 1000);
}

// disable cards by 1 second
function disable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled');
    });
}

// (r)enable cards and disable the matched cards
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCards.length; i++) {
            matchedCards[i].classList.add('disabled');
        }
    });
}

// counting the player's moves
function addCounter() {
    moves++;
    counter.innerHTML = moves + ' move' + (moves >= 2 ? 's' : '');

    // starting the timer counter
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;

        startClock();
    }

    // starting the rating logic
    if (moves > 8 && moves < 12) {
        for (var i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = 'collapse';
            }
        }
    } else if (moves > 13) {
        for (var _i2 = 0; _i2 < 3; _i2++) {
            if (_i2 > 0) {
                stars[_i2].style.visibility = 'collapse';
            }
        }
    }
}

// the clock function
function startClock() {
    interval = setInterval(function () {
        timer.innerHTML = minute + 'm ' + second + 's';
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

// when all cards match, congrats the player
function congrats() {
    if (matchedCards.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // bring the congrats modal
        modal.classList.add('show');

        // init star rating
        var starRate = document.querySelector('.stars').innerHTML;

        // shows move, rating and time on modal
        document.getElementById('finalMove').innerHTML = moves;
        document.getElementById('starRate').innerHTML = starRate;
        document.getElementById('totalTime').innerHTML = finalTime;

        // close button on modal
        closeModal();
    };
}

// closeModal and playAgain functions
function closeModal() {
    close.addEventListener('click', function (e) {
        modal.classList.remove('show');
        start();
    });
}

function playAgain() {
    modal.classList.remove('show');
    start();
}

// looping and adding event listeners to each card
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener('click', displayCard);
    card.addEventListener('click', cardOpen);
    card.addEventListener('click', congrats);
};
},{}],"..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '52472' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","js\\app.js"], null)
//# sourceMappingURL=/app.853fa3f8.map