(function () {
  "use strict";

  function byId(id) {
    return document.getElementById(id);
  }

  function hasClass(el, className) {
    return el && (" " + el.className + " ").indexOf(" " + className + " ") > -1;
  }

  function addClass(el, className) {
    if (!el || hasClass(el, className)) { return; }
    el.className = (el.className + " " + className).replace(/^\s+|\s+$/g, "");
  }

  function removeClass(el, className) {
    if (!el) { return; }
    var regex = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
    el.className = el.className.replace(regex, " ").replace(/^\s+|\s+$/g, "");
  }

  function toggleClass(el, className) {
    if (hasClass(el, className)) {
      removeClass(el, className);
      return false;
    }
    addClass(el, className);
    return true;
  }

  function setCurrentYear() {
    var items = document.getElementsByClassName("current-year");
    var year = new Date().getFullYear();
    var i;
    for (i = 0; i < items.length; i += 1) {
      items[i].innerHTML = year;
    }
  }

  function initNavigation() {
    var toggle = byId("navToggle");
    var nav = byId("mainNav");
    var dropdownButtons = document.getElementsByClassName("dropdown-toggle");
    var i;

    if (toggle && nav) {
      toggle.onclick = function () {
        var open = toggleClass(nav, "is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.innerHTML = open ? "✕" : "☰";
      };
    }

    for (i = 0; i < dropdownButtons.length; i += 1) {
      dropdownButtons[i].onclick = function (event) {
        var parent = event.currentTarget ? event.currentTarget.parentNode : this.parentNode;
        var open = toggleClass(parent, "is-open");
        this.setAttribute("aria-expanded", open ? "true" : "false");
      };
    }

    document.onclick = function (event) {
      var target = event.target || event.srcElement;
      var current = target;
      var insideDropdown = false;
      while (current && current !== document) {
        if (hasClass(current, "dropdown")) {
          insideDropdown = true;
          break;
        }
        current = current.parentNode;
      }
      if (!insideDropdown) {
        var dropdowns = document.getElementsByClassName("dropdown");
        for (i = 0; i < dropdowns.length; i += 1) {
          removeClass(dropdowns[i], "is-open");
        }
      }
    };
  }

  function initTheme() {
    var button = byId("themeToggle");
    var saved;
    try {
      saved = window.localStorage.getItem("rona-theme");
    } catch (error) {
      saved = null;
    }

    if (saved === "dark") {
      addClass(document.body, "dark-mode");
    }

    function refreshIcon() {
      if (!button) { return; }
      button.innerHTML = hasClass(document.body, "dark-mode") ? "☀️" : "🌙";
      button.setAttribute("aria-label", hasClass(document.body, "dark-mode") ? "Aktifkan mode terang" : "Aktifkan mode gelap");
    }

    refreshIcon();

    if (button) {
      button.onclick = function () {
        var dark = toggleClass(document.body, "dark-mode");
        try {
          window.localStorage.setItem("rona-theme", dark ? "dark" : "light");
        } catch (error) {
          /* Local storage is optional. */
        }
        refreshIcon();
      };
    }
  }

  function initTypingEffect() {
    var target = byId("typeText");
    var phrases = [
      "Jejak sejarah yang hidup.",
      "Ragam rasa dalam satu meja.",
      "Seni, bahasa, dan tradisi yang berwarna.",
      "Malaysia: harmoni dalam keberagaman."
    ];
    var phraseIndex = 0;
    var letterIndex = 0;
    var deleting = false;

    if (!target) { return; }

    function type() {
      var current = phrases[phraseIndex];
      if (deleting) {
        letterIndex -= 1;
      } else {
        letterIndex += 1;
      }

      target.innerHTML = current.substring(0, letterIndex);

      if (!deleting && letterIndex === current.length) {
        deleting = true;
        window.setTimeout(type, 1500);
        return;
      }

      if (deleting && letterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }

      window.setTimeout(type, deleting ? 38 : 72);
    }

    type();
  }

  function initReveal() {
    var items = document.getElementsByClassName("reveal");
    var i;

    function revealVisible() {
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      for (i = 0; i < items.length; i += 1) {
        if (items[i].getBoundingClientRect().top < viewportHeight - 70) {
          addClass(items[i], "is-visible");
        }
      }
    }

    revealVisible();
    if (window.addEventListener) {
      window.addEventListener("scroll", revealVisible, false);
      window.addEventListener("resize", revealVisible, false);
    } else if (window.attachEvent) {
      window.attachEvent("onscroll", revealVisible);
    }
  }

  function initBackToTop() {
    var button = byId("backToTop");
    if (!button) { return; }

    function update() {
      var top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (top > 420) {
        addClass(button, "is-visible");
      } else {
        removeClass(button, "is-visible");
      }
    }

    button.onclick = function () {
      if (window.scrollTo) {
        try {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
          window.scrollTo(0, 0);
        }
      }
    };

    update();
    if (window.addEventListener) {
      window.addEventListener("scroll", update, false);
    } else if (window.attachEvent) {
      window.attachEvent("onscroll", update);
    }
  }

  function initRandomFacts() {
    var button = byId("randomFactButton");
    var text = byId("randomFactText");
    var lastIndex = -1;

    if (!button || !text || typeof RONA_FACTS === "undefined") { return; }

    button.onclick = function () {
      var index = Math.floor(Math.random() * RONA_FACTS.length);
      if (RONA_FACTS.length > 1 && index === lastIndex) {
        index = (index + 1) % RONA_FACTS.length;
      }
      lastIndex = index;
      text.innerHTML = RONA_FACTS[index];
      addClass(text, "is-changing");
      window.setTimeout(function () { removeClass(text, "is-changing"); }, 250);
    };
  }

  function initFilters() {
    var filterButtons = document.getElementsByClassName("filter-btn");
    var i;

    for (i = 0; i < filterButtons.length; i += 1) {
      filterButtons[i].onclick = function () {
        var targetSelector = this.getAttribute("data-target");
        var category = this.getAttribute("data-filter");
        var container = byId(targetSelector);
        var siblings = this.parentNode.getElementsByClassName("filter-btn");
        var items;
        var j;

        if (!container) { return; }
        items = container.children;

        for (j = 0; j < siblings.length; j += 1) {
          removeClass(siblings[j], "active");
        }
        addClass(this, "active");

        for (j = 0; j < items.length; j += 1) {
          if (category === "all" || items[j].getAttribute("data-category") === category) {
            removeClass(items[j], "is-hidden");
          } else {
            addClass(items[j], "is-hidden");
          }
        }
      };
    }
  }

  function initGalleryModal() {
    var modal = byId("galleryModal");
    var close = byId("modalClose");
    var image = byId("modalImage");
    var title = byId("modalTitle");
    var text = byId("modalText");
    var buttons = document.getElementsByClassName("gallery-open");
    var i;

    if (!modal) { return; }

    function openModal(button) {
      image.setAttribute("src", button.getAttribute("data-image"));
      image.setAttribute("width","525px");
      image.setAttribute("height","400px");
      image.setAttribute("alt", button.getAttribute("data-title"));
      title.innerHTML = button.getAttribute("data-title");
      text.innerHTML = button.getAttribute("data-description");
      addClass(modal, "is-open");
      modal.setAttribute("aria-hidden", "false");
      if (close) { close.focus(); }
    }

    function closeModal() {
      removeClass(modal, "is-open");
      modal.setAttribute("aria-hidden", "true");
    }

    for (i = 0; i < buttons.length; i += 1) {
      buttons[i].onclick = function () { openModal(this); };
    }

    if (close) { close.onclick = closeModal; }
    modal.onclick = function (event) {
      var target = event.target || event.srcElement;
      if (target === modal) { closeModal(); }
    };

    document.onkeydown = function (event) {
      event = event || window.event;
      if (event.key === "Escape" || event.keyCode === 27) {
        closeModal();
      }
    };
  }

  function initFoodRandomizer() {
    var button = byId("randomFoodButton");
    var cards = document.getElementsByClassName("food-card");
    if (!button || !cards.length) { return; }

    button.onclick = function () {
      var visible = [];
      var i;
      for (i = 0; i < cards.length; i += 1) {
        if (!hasClass(cards[i], "is-hidden")) {
          visible.push(cards[i]);
          removeClass(cards[i], "selected-food");
          cards[i].style.outline = "none";
        }
      }
      if (!visible.length) { return; }
      var selected = visible[Math.floor(Math.random() * visible.length)];
      selected.style.outline = "5px solid #f4b942";
      selected.scrollIntoView ? selected.scrollIntoView({ behavior: "smooth", block: "center" }) : null;
      window.setTimeout(function () { selected.style.outline = "none"; }, 2200);
    };
  }

  function initPhraseExplorer() {
    var category = byId("phraseCategory");
    var next = byId("nextPhrase");
    var speak = byId("speakPhrase");
    var main = byId("phraseMain");
    var meaning = byId("phraseMeaning");
    var note = byId("phraseNote");
    var index = 0;

    if (!category || typeof RONA_PHRASES === "undefined") { return; }

    function render() {
      var items = RONA_PHRASES[category.value];
      if (!items || !items.length) { return; }
      if (index >= items.length) { index = 0; }
      main.innerHTML = items[index].malay;
      meaning.innerHTML = items[index].meaning;
      note.innerHTML = items[index].note;
    }

    category.onchange = function () {
      index = 0;
      render();
    };

    if (next) {
      next.onclick = function () {
        var items = RONA_PHRASES[category.value];
        index = (index + 1) % items.length;
        render();
      };
    }

    if (speak) {
      speak.onclick = function () {
        if (window.speechSynthesis && window.SpeechSynthesisUtterance) {
          var utterance = new SpeechSynthesisUtterance(main.textContent || main.innerText);
          utterance.lang = "ms-MY";
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);
        } else {
          window.alert("Fitur suara belum didukung oleh browser ini.");
        }
      };
    }

    render();
  }

  function initQuiz() {
    var panel = byId("quizPanel");
    var question = byId("quizQuestion");
    var options = byId("quizOptions");
    var next = byId("quizNext");
    var counter = byId("quizCounter");
    var scoreLabel = byId("quizScore");
    var progress = byId("quizProgressBar");
    var result = byId("quizResult");
    var resultScore = byId("resultScore");
    var resultMessage = byId("resultMessage");
    var restart = byId("quizRestart");
    var current = 0;
    var score = 0;
    var selected = null;

    if (!panel || typeof RONA_QUIZ === "undefined") { return; }

    function renderQuestion() {
      var item = RONA_QUIZ[current];
      var i;
      selected = null;
      question.innerHTML = item.question;
      options.innerHTML = "";
      counter.innerHTML = "Soal " + (current + 1) + " / " + RONA_QUIZ.length;
      scoreLabel.innerHTML = "Skor: " + score;
      progress.style.width = ((current / RONA_QUIZ.length) * 100) + "%";
      next.disabled = true;
      next.innerHTML = current === RONA_QUIZ.length - 1 ? "Lihat Hasil" : "Soal Berikutnya";

      for (i = 0; i < item.options.length; i += 1) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "quiz-option";
        button.setAttribute("data-index", i);
        button.innerHTML = String.fromCharCode(65 + i) + ". " + item.options[i];
        button.onclick = function () {
          var all = options.getElementsByClassName("quiz-option");
          var j;
          for (j = 0; j < all.length; j += 1) {
            removeClass(all[j], "selected");
          }
          addClass(this, "selected");
          selected = parseInt(this.getAttribute("data-index"), 10);
          next.disabled = false;
        };
        options.appendChild(button);
      }
    }

    function showResult() {
      var percentage = Math.round((score / RONA_QUIZ.length) * 100);
      progress.style.width = "100%";
      panel.style.display = "none";
      addClass(result, "is-visible");
      resultScore.innerHTML = percentage + "%";

      if (percentage >= 88) {
        resultMessage.innerHTML = "Cemerlang! Pengetahuan budayamu sangat kuat.";
      } else if (percentage >= 63) {
        resultMessage.innerHTML = "Bagus! Tinggal jelajahi beberapa bagian lagi.";
      } else {
        resultMessage.innerHTML = "Awal yang baik. Baca kembali halaman sejarah, warisan, dan kuliner lalu coba lagi.";
      }
    }

    next.onclick = function () {
      if (selected === null) { return; }
      if (selected === RONA_QUIZ[current].answer) {
        score += 1;
      }
      current += 1;
      if (current >= RONA_QUIZ.length) {
        showResult();
      } else {
        renderQuestion();
      }
    };

    if (restart) {
      restart.onclick = function () {
        current = 0;
        score = 0;
        selected = null;
        result.className = "quiz-result";
        panel.style.display = "block";
        renderQuestion();
      };
    }

    renderQuestion();
  }

  function initVoting() {
    var container = byId("voteGrid");
    var reset = byId("resetVotes");
    var storageKey = "rona-votes";
    var votedKey = "rona-voted";
    var counts = {};
    var voted = false;

    if (!container || typeof RONA_VOTES === "undefined") { return; }

    try {
      counts = JSON.parse(window.localStorage.getItem(storageKey) || "{}") || {};
      voted = window.localStorage.getItem(votedKey) === "yes";
    } catch (error) {
      counts = {};
    }

    function totalVotes() {
      var total = 0;
      var i;
      for (i = 0; i < RONA_VOTES.length; i += 1) {
        total += counts[RONA_VOTES[i].id] || 0;
      }
      return total;
    }

    function save() {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(counts));
        window.localStorage.setItem(votedKey, voted ? "yes" : "no");
      } catch (error) {
        /* Demo remains usable in memory. */
      }
    }

    function render() {
      var total = totalVotes();
      var i;
      container.innerHTML = "";
      for (i = 0; i < RONA_VOTES.length; i += 1) {
        var item = RONA_VOTES[i];
        var count = counts[item.id] || 0;
        var percent = total ? Math.round((count / total) * 100) : 0;
        var card = document.createElement("div");
        card.className = "vote-card";
        card.innerHTML =
          "<div class='card-icon' aria-hidden='true'>" + item.icon + "</div>" +
          "<h3>" + item.label + "</h3>" +
          "<span class='vote-count'>" + count + " suara</span>" +
          "<div class='vote-bar' aria-label='" + percent + " persen'><span style='width:" + percent + "%'></span></div>" +
          "<button class='btn btn-primary btn-small vote-button' type='button' data-vote='" + item.id + "'" + (voted ? " disabled" : "") + ">" + (voted ? "Sudah memilih" : "Pilih") + "</button>";
        container.appendChild(card);
      }

      var buttons = container.getElementsByClassName("vote-button");
      for (i = 0; i < buttons.length; i += 1) {
        buttons[i].onclick = function () {
          var id = this.getAttribute("data-vote");
          if (voted) {
            window.alert("Satu perangkat hanya dapat memberi satu suara pada demo ini.");
            return;
          }
          counts[id] = (counts[id] || 0) + 1;
          voted = true;
          save();
          render();
        };
      }
    }

    if (reset) {
      reset.onclick = function () {
        counts = {};
        voted = false;
        save();
        render();
      };
    }

    render();
  }

  function initFeedbackForm() {
    var form = byId("feedbackForm");
    var message = byId("formMessage");
    if (!form) { return; }

    function setError(id, text) {
      var target = byId(id + "Error");
      if (target) { target.innerHTML = text || ""; }
    }

    form.onsubmit = function (event) {
      event = event || window.event;
      if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }

      var name = byId("visitorName").value.replace(/^\s+|\s+$/g, "");
      var email = byId("visitorEmail").value.replace(/^\s+|\s+$/g, "");
      var topic = byId("visitorTopic").value;
      var comment = byId("visitorComment").value.replace(/^\s+|\s+$/g, "");
      var valid = true;
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      setError("visitorName", "");
      setError("visitorEmail", "");
      setError("visitorTopic", "");
      setError("visitorComment", "");
      message.className = "form-message";
      message.innerHTML = "";

      if (name.length < 3) {
        setError("visitorName", "Nama minimal 3 karakter.");
        valid = false;
      }
      if (!emailPattern.test(email)) {
        setError("visitorEmail", "Masukkan alamat email yang valid.");
        valid = false;
      }
      if (!topic) {
        setError("visitorTopic", "Pilih topik favorit.");
        valid = false;
      }
      if (comment.length < 10) {
        setError("visitorComment", "Komentar minimal 10 karakter.");
        valid = false;
      }

      if (valid) {
        message.className = "form-message success";
        message.innerHTML = "Terima kasih, " + name + "! Form demo berhasil divalidasi. Data tidak dikirim ke server.";
        form.reset();
      } else {
        message.className = "form-message error";
        message.innerHTML = "Masih ada bagian yang perlu diperbaiki.";
      }
      return false;
    };
  }

  function initSearch() {
    var input = byId("siteSearch");
    var output = byId("searchOutput");
    if (!input || !output) { return; }

    var items = [
      { label: "Sejarah Malaysia", url: "sejarah.html", keywords: "sejarah merdeka melaka 1957 1963" },
      { label: "Warisan dan Seni", url: "warisan.html", keywords: "warisan seni mak yong songket kompang rumah" },
      { label: "Kuliner Malaysia", url: "kuliner.html", keywords: "kuliner nasi lemak roti canai satay laksa teh tarik" },
      { label: "Bahasa Melayu", url: "bahasa.html", keywords: "bahasa frasa sapaan melayu" },
      { label: "Galeri Budaya", url: "galeri.html", keywords: "galeri gambar budaya" },
      { label: "Kuis dan Voting", url: "interaktif.html", keywords: "kuis voting form interaktif" }
    ];

    function renderSearch() {
      var query = input.value.toLowerCase().replace(/^\s+|\s+$/g, "");
      var matches = [];
      var i;
      output.innerHTML = "";
      if (query.length < 2) {
        output.innerHTML = "<p class='muted'>Ketik minimal 2 karakter.</p>";
        return;
      }
      for (i = 0; i < items.length; i += 1) {
        if ((items[i].label + " " + items[i].keywords).toLowerCase().indexOf(query) > -1) {
          matches.push(items[i]);
        }
      }
      if (!matches.length) {
        output.innerHTML = "<p class='muted'>Tidak ada hasil. Coba kata kunci lain.</p>";
        return;
      }
      var list = document.createElement("ul");
      list.className = "check-list";
      for (i = 0; i < matches.length; i += 1) {
        var li = document.createElement("li");
        li.innerHTML = "<a href='" + matches[i].url + "'><strong>" + matches[i].label + "</strong></a>";
        list.appendChild(li);
      }
      output.appendChild(list);
    }

    input.onkeyup = renderSearch;
    input.onchange = renderSearch;
  }

  function initAll() {
    setCurrentYear();
    initNavigation();
    initTheme();
    initTypingEffect();
    initReveal();
    initBackToTop();
    initRandomFacts();
    initFilters();
    initGalleryModal();
    initFoodRandomizer();
    initPhraseExplorer();
    initQuiz();
    initVoting();
    initFeedbackForm();
    initSearch();
  }

  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", initAll, false);
  } else {
    window.attachEvent("onload", initAll);
  }
}());
