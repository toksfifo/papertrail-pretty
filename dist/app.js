'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var buttonClass = 'pp-button';
var buttonExpandClass = 'pp-expand';
var buttonContractClass = 'pp-contract';
var buttonExpandText = '+';
var buttonContractText = '-';
var messageClass = 'message';
var hiddenClass = 'pp-hidden';
var beautifyConfig = { indent_size: 2 };
var language = 'ruby';
var eventListId = 'event_list';
var listItemSelector = '.event.colorized';
var mutationConfig = { childList: true };
var listItemNodeName = 'LI';

// ListItem

var ListItem = function () {
  function ListItem(node) {
    _classCallCheck(this, ListItem);

    this.node = node;
    this.message = null;
    this.prettyMessage = null;
    this.expandButton = null;
    this.contractButton = null;
    this.addButtons();
    this.setDefaultButtonState();
  }

  _createClass(ListItem, [{
    key: 'setDefaultButtonState',
    value: function setDefaultButtonState() {
      this.expandButton.show();
      this.contractButton.hide();
    }
  }, {
    key: 'addButtons',
    value: function addButtons() {
      this.expandButton = new ExpandButton(this.expandPretty.bind(this));
      this.contractButton = new ContractButton(this.contractPretty.bind(this));
      this.node.insertBefore(this.expandButton.node, this.node.firstChild);
      this.node.insertBefore(this.contractButton.node, this.node.firstChild);
    }
  }, {
    key: 'expandPretty',
    value: function expandPretty() {
      this.ensureMessages();
      this.message.classList.add(hiddenClass);
      this.prettyMessage.classList.remove(hiddenClass);
      this.expandButton.hide();
      this.contractButton.show();
    }
  }, {
    key: 'contractPretty',
    value: function contractPretty() {
      this.ensureMessages();
      this.message.classList.remove(hiddenClass);
      this.prettyMessage.classList.add(hiddenClass);
      this.expandButton.show();
      this.contractButton.hide();
    }
  }, {
    key: 'ensureMessages',
    value: function ensureMessages() {
      if (!this.message || !this.prettyMessage) {
        this.getMessage();
        this.getPrettyMessage();
      }
    }
  }, {
    key: 'getMessage',
    value: function getMessage() {
      for (var i = 0; i < this.node.childNodes.length; i++) {
        var child = this.node.childNodes[i];
        if (child.classList && child.classList.contains(messageClass)) {
          var message = child;
          this.message = child;
          return message;
          break;
        }
      }
      return null;
    }
  }, {
    key: 'getPrettyMessage',
    value: function getPrettyMessage() {
      var prettyMessage = document.createElement('pre');
      var beautifulMessage = js_beautify(this.message.innerText, beautifyConfig);
      prettyMessage.innerHTML = beautifulMessage;
      prettyMessage.classList.add(language);
      hljs.highlightBlock(prettyMessage);
      this.prettyMessage = prettyMessage;
      this.node.insertBefore(this.prettyMessage, this.message);
      return prettyMessage;
    }
  }]);

  return ListItem;
}();

// Button


var Button = function () {
  function Button(text, cssClass, onClick) {
    _classCallCheck(this, Button);

    this.node = document.createElement('button');
    this.node.innerHTML = text;
    this.node.classList.add(buttonClass);
    this.node.classList.add(cssClass);
    this.node.addEventListener('click', onClick);
  }

  _createClass(Button, [{
    key: 'show',
    value: function show() {
      this.node.classList.remove(hiddenClass);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.node.classList.add(hiddenClass);
    }
  }]);

  return Button;
}();

// ExpandButton


var ExpandButton = function (_Button) {
  _inherits(ExpandButton, _Button);

  function ExpandButton(onClick) {
    _classCallCheck(this, ExpandButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ExpandButton).call(this, buttonExpandText, buttonExpandClass, onClick));
  }

  return ExpandButton;
}(Button);

// ContractButton


var ContractButton = function (_Button2) {
  _inherits(ContractButton, _Button2);

  function ContractButton(onClick) {
    _classCallCheck(this, ContractButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ContractButton).call(this, buttonContractText, buttonContractClass, onClick));
  }

  return ContractButton;
}(Button);

// View


var View = function () {
  function View() {
    _classCallCheck(this, View);

    this.eventList = document.getElementById(eventListId);
    this.listItems = document.querySelectorAll(listItemSelector);
  }

  _createClass(View, [{
    key: 'init',
    value: function init() {
      if (this.eventList) {
        this.initListItems();
        this.watchListItems();
      }
    }
  }, {
    key: 'initListItems',
    value: function initListItems() {
      for (var i = 0; i < this.listItems.length; i++) {
        var node = this.listItems[i];
        new ListItem(node);
      }
    }
  }, {
    key: 'watchListItems',
    value: function watchListItems() {
      var observer = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var mutation = mutations[i];
          var newNodes = mutation.addedNodes;
          if (newNodes && newNodes.length > 0) {
            for (var j = 0; j < newNodes.length; j++) {
              var node = newNodes[j];
              if (node.nodeName !== listItemNodeName) {
                continue;
              }
              new ListItem(node);
            }
          }
        }
      });
      observer.observe(this.eventList, mutationConfig);
    }
  }]);

  return View;
}();

new View().init();