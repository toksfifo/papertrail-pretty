var messages = document.querySelectorAll('.event.colorized');
var eventList = document.getElementById('event_list');

if (eventList) {
  var observer = new MutationObserver((mutations) => {
    for (var i = 0; i < mutations.length; i++) {
      var mutation = mutations[i];
      var newNodes = mutation.addedNodes;
      if (newNodes && newNodes.length > 0) {
        for (var j = 0; j < newNodes.length; j++) {
          var listItem = newNodes[j]
          if (listItem.nodeName !== 'LI') {
            continue;
          }
          var expandButton = createExpandButton();
          // if doesn't already have button
          listItem.insertBefore(expandButton, listItem.firstChild);
        }
      }
    }
  });

  var config = { childList: true }

  observer.observe(eventList, config)
}

for (var i = 0; i < messages.length; i++) {
  var message = messages[i];
  var expandButton = createExpandButton();
  message.insertBefore(expandButton, message.firstChild);
}

// comment
function createExpandButton() {
  var expandButton = document.createElement('button');
  expandButton.innerHTML = '+';
  expandButton.className += ' expand';
  expandButton.addEventListener('click', (e) => {
    expandMessage(e.target.parentNode);
  });
  return expandButton;
}

// comment
function expandMessage(messageParent) {
  var messageClass = 'message';
  var beautifyOptions = { indent_size: 2};
  var message;

  // Get message
  for (var i = 0; i < messageParent.childNodes.length; i++) {
    var child = messageParent.childNodes[i];
    if (child.className && child.className.indexOf(messageClass) > -1) {
      message = child;
      break;
    }
  }

  // Message is already expanded
  if (!message) {
    return;
  }

  // Replace message
  var newMessage = document.createElement('pre');
  var beautifulMessage = js_beautify(message.innerText, beautifyOptions);
  newMessage.innerHTML = beautifulMessage;
  messageParent.replaceChild(newMessage, message);

  // Highlight
  newMessage.className += ' ruby';
  hljs.highlightBlock(newMessage);
}