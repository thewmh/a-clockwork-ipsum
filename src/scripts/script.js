;(function() {
    
    var config = {
        selectors: {
          screenplay: 'screenplay',
          numInput: "numberOf",
          typeSelect: "typeOf",
          submit: "submit",
          copyTextButton: "copyText",
          logo: "logo",
        }
    }

    let screenplay,
        placeholder,
        characters,
        lines;

    let numberOf = document.getElementById('numberOf').value ? document.getElementById('numberOf').value : 3;
    let typeOf = document.querySelector('.option.selected').dataset.value;
    let btnText = document.getElementById('copyText').innerText;
    let numbersOnly = /^\d+$/;

    var init = (function () {
        getScreenplay();
        getElements();
        attachListeners();
    });

    var createElements = function createElements(lines) {
      let screenplay = document.getElementById('screenplay');
      screenplay.innerHTML = "";
      let max = lines.length;
      let type = typeOf;
      let perParagraph = 5;
      
      let generateParagraphs = (function() {
        for(let i = 0; i < numberOf; i++) {
          let newContent = document.createElement('p');
          for(let j = 0; j < perParagraph; j++) {
            let random = Math.floor(Math.random() * max);
            j < perParagraph - 1 ? newContent.append(`${lines[random].line} `) : newContent.append(`${lines[random].line}`);
          }
          screenplay.append(newContent);
        }
        
      });

      function generateSentences() {
        let newContent = document.createElement('p');
        for(let i = 0; i < numberOf; i++) {
          let random = Math.floor(Math.random() * max);
          i < numberOf - 1 ? newContent.append(`${lines[random].line} `) : newContent.append(`${lines[random].line}`);
        }
        screenplay.append(newContent);
      }

      function generateWords() {
        let regex = /[!"#$%&()*+,-./:;<=>?@[\]^_`{|}~]/g;
        let newContent = document.createElement('p');
        for(let i = 0; i < numberOf; i++) {
          let random = Math.floor(Math.random() * max);
          let str = lines[random].line.trim();
          let words = str.split(' ');
          let wordsLength = words.length;
          let wordsRandom = Math.floor(Math.random() * wordsLength);
          i < numberOf - 1 ? newContent.append(`${words[wordsRandom]} `) : newContent.append((`${words[wordsRandom]}`));
        }
        screenplay.append((newContent.innerText[0].toUpperCase() + newContent.innerText.slice(1)).replace(regex, '') + '.');
      }

      if (type == 'paragraphs') generateParagraphs();
      if (type == 'sentences') generateSentences();
      if (type == 'words') generateWords();
    };

    var copyText = function copyText(e) {
      let screenplay = document.getElementById('screenplay');
      let input = document.createElement('textarea');

      input.value = screenplay.textContent;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();

      e.target.innerText = "Text Copied";
    }

    var resetButtonText = function resetButtonText() {
      copyTextButton.innerText = btnText;
    }

    var getElements = (function() {
        screenplay = document.getElementById(config.selectors.screenplay);
        numInput = document.getElementById(config.selectors.numInput);
        typeSelect = document.getElementById(config.selectors.typeSelect);
        submit = document.getElementById(config.selectors.submit);
        copyTextButton = document.getElementById(config.selectors.copyTextButton);
        logo = document.getElementById(config.selectors.logo);
    });

    var attachListeners = function attachListeners() {

      logo.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
      });

      numInput.addEventListener('keyup', function() {
        numbersOnly.test(this.value) ?
        numberOf = this.value : this.value = '';
      });

      typeSelect.addEventListener('click', function() {
        this.querySelector('.select').classList.toggle('open');
      });

      typeSelect.addEventListener('keydown', function(e) {
        let isOpen = this.querySelector('.select').classList.contains('open');

        if((e.key == "Tab" || e.code == "Tab") && !isOpen) this.querySelector('.select').classList.toggle('open');
      });

      window.addEventListener('click', function(e) {
        typeSelect.querySelector('.select').classList.contains('open') && e.target.localName != "span" && e.target.className != "select--trigger" ? typeSelect.querySelector('.select').classList.remove('open') : null;
      });

      window.addEventListener('keyup', function(e) {
        typeSelect.querySelector('.select').classList.contains('open') && e.target.localName != "span" && e.target.className != "select--trigger" ? typeSelect.querySelector('.select').classList.remove('open') : null;
      });

      for (const option of document.querySelectorAll(".option")) {
        option.addEventListener('click', function(e) {
          if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.select').querySelector('.select--trigger span').textContent = this.textContent;
            typeOf = this.dataset.value;
          }
        });
        option.addEventListener('keyup', function(e) {
          if (!this.classList.contains('selected') && (e.key == "Enter" || e.code == "Enter")) {
            this.parentNode.querySelector('.option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.select').querySelector('.select--trigger span').textContent = this.textContent;
            this.closest('.select').classList.remove('open');
            typeOf = this.dataset.value;
          }
        });
      }

      submit.addEventListener('click', function(e) {
        e.preventDefault();
        
        createElements(lines);
        resetButtonText();
      });

      copyTextButton.addEventListener('click', function(e) {
        e.preventDefault();

        copyText(e);
      });
    }

    var loadScreenplay = async function loadScreenplay(el) {
      let response;
      const url = el.href ? el.href : el.src;
      response = await fetch(url)
      .then(res => res.json())
      .then(data => {return data});
      
      lines = response.lines;

      createElements(lines);
    }

    var getScreenplay = (function() {
      let screenplay = document.getElementsByClassName('screenplay');
      
      loadScreenplay(screenplay[0]);
    });

if (document.getElementById('screenplay')) {
    init();
}

})(document, window);
