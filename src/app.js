const buttonClass = 'pp-button';
const buttonExpandClass = 'pp-expand';
const buttonContractClass = 'pp-contract';
const buttonExpandText = '+';
const buttonContractText = '-';
const messageClass = 'message';
const hiddenClass = 'pp-hidden';
const beautifyConfig = { indent_size: 2 };
const language = 'ruby';
const eventListId = 'event_list';
const listItemSelector = '.event.colorized';
const mutationConfig = { childList: true };
const listItemNodeName = 'LI';

// ListItem
class ListItem {
  constructor(node) {
    this.node = node;
    this.message = null;
    this.prettyMessage = null;
    this.expandButton = null;
    this.contractButton = null;
    this.addButtons();
    this.setDefaultButtonState();
  }

  setDefaultButtonState() {
    this.expandButton.show();
    this.contractButton.hide();
  }

  addButtons() {
    this.expandButton = new ExpandButton(this.expandPretty.bind(this));
    this.contractButton = new ContractButton(this.contractPretty.bind(this));
    this.node.insertBefore(this.expandButton.node, this.node.firstChild);
    this.node.insertBefore(this.contractButton.node, this.node.firstChild);
  }

  expandPretty() {
    this.ensureMessages();
    this.message.classList.add(hiddenClass);
    this.prettyMessage.classList.remove(hiddenClass);
    this.expandButton.hide();
    this.contractButton.show();
  }

  contractPretty() {
    this.ensureMessages();
    this.message.classList.remove(hiddenClass);
    this.prettyMessage.classList.add(hiddenClass);
    this.expandButton.show();
    this.contractButton.hide();
  }

  ensureMessages() {
    if (!this.message || !this.prettyMessage) {
      this.getMessage();
      this.getPrettyMessage();
    }
  }

  getMessage() {
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

  getPrettyMessage() {
    var prettyMessage = document.createElement('pre');

    // Beautify
    var beautifulMessage = js_beautify(this.message.innerText, beautifyConfig);
    prettyMessage.innerHTML = beautifulMessage;

    // Highlight
    prettyMessage.classList.add(language);
    hljs.highlightBlock(prettyMessage);

    this.prettyMessage = prettyMessage;
    this.node.insertBefore(this.prettyMessage, this.message);
    return prettyMessage;
  }

}

// Button
class Button {
  constructor(text, cssClass, onClick) {
    this.node = document.createElement('button');
    this.node.innerHTML = text;
    this.node.classList.add(buttonClass);
    this.node.classList.add(cssClass);
    this.node.addEventListener('click', onClick);
  }

  show() {
    this.node.classList.remove(hiddenClass);
  }

  hide() {
    this.node.classList.add(hiddenClass);
  }
}

// ExpandButton
class ExpandButton extends Button {
  constructor(onClick) {
    super(buttonExpandText, buttonExpandClass, onClick);
  }
}

// ContractButton
class ContractButton extends Button {
  constructor(onClick) {
    super(buttonContractText, buttonContractClass, onClick);
  }
}

// View
class View {
  constructor() {
    this.eventList = document.getElementById(eventListId);
    this.listItems = document.querySelectorAll(listItemSelector);
  }

  init() {
    if (this.eventList) {
      this.initListItems();
      this.watchListItems();
    }
  }

  initListItems() {
    for (var i = 0; i < this.listItems.length; i++) {
      var node = this.listItems[i];
      new ListItem(node);
    }
  }

  watchListItems() {
    var observer = new MutationObserver((mutations) => {
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

    // Watch the list of events for changes and create a new ListItem for new
    // events.
    observer.observe(this.eventList, mutationConfig);
  }

}

new View().init();