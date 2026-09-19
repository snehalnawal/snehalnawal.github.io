// Snehal Nawal — progressive enhancement only. The page is complete without it.

// Paste your deployed Worker URL here to switch the answer engine on.
// Until it's set, the "ask about me" section stays hidden. See worker/README.md.
var WORKER_URL = "https://snehal-ask.apurvsingh28.workers.dev";

(function () {
  "use strict";

  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  var section = document.getElementById("ask");
  if (!section || !WORKER_URL) return; // stay hidden until a Worker is configured
  section.hidden = false;

  var form = document.getElementById("ask-form");
  var input = document.getElementById("ask-input");
  var send = form.querySelector(".ask-send");
  var chips = document.getElementById("ask-chips");
  var answerWrap = document.getElementById("ask-answer");
  var qEl = document.getElementById("ask-q");
  var aEl = document.getElementById("ask-a");
  var busy = false;

  function render(text, streaming) {
    aEl.className = "ask-a";
    aEl.textContent = text;
    if (streaming) {
      var caret = document.createElement("span");
      caret.className = "blink";
      caret.setAttribute("aria-hidden", "true");
      aEl.appendChild(caret);
    }
  }

  function showError(msg) {
    aEl.className = "ask-a is-error";
    aEl.textContent = msg;
  }

  function streamInto(body) {
    var reader = body.getReader();
    var decoder = new TextDecoder();
    var text = "";
    function pump() {
      return reader.read().then(function (r) {
        if (r.done) {
          render(text, false);
          return;
        }
        text += decoder.decode(r.value, { stream: true });
        render(text, true);
        return pump();
      });
    }
    return pump();
  }

  function ask(question) {
    question = (question || "").trim();
    if (!question || busy) return;
    busy = true;
    send.disabled = true;
    answerWrap.hidden = false;
    qEl.textContent = question;
    render("", true);
    answerWrap.scrollIntoView({ behavior: "smooth", block: "nearest" });

    fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: question })
    })
      .then(function (res) {
        if (res.status === 429) {
          showError("I'm getting a lot of questions right now. Try again in a bit, or email me at snehalnawal22@gmail.com.");
          return null;
        }
        if (!res.ok || !res.body) {
          showError("Something went wrong on my end. Email me at snehalnawal22@gmail.com and I'll answer myself.");
          return null;
        }
        return streamInto(res.body);
      })
      .catch(function () {
        showError("Couldn't reach the answer service just now. Email me at snehalnawal22@gmail.com.");
      })
      .then(function () {
        busy = false;
        send.disabled = false;
      });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    ask(input.value);
  });

  chips.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-q]");
    if (!btn) return;
    var q = btn.getAttribute("data-q");
    input.value = q;
    ask(q);
  });
})();
