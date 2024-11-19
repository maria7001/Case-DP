document.addEventListener('DOMContentLoaded', function () {
  
  var contatoLink = document.querySelector('.menu-lista-link.menu-lista-contato');
  var downloadLink = document.querySelector('.menu-lista-link.menu-lista-download');
  var verMaisBotoes = document.querySelectorAll('.card-montadoras');

  if (contatoLink) {
    contatoLink.addEventListener('click', function() { sendGAEvent('entre_em_contato', 'menu'); });
  }

  if (downloadLink) {
    downloadLink.addEventListener('click', function() { sendGAEvent('download_pdf', 'menu'); });
  }

   verMaisBotoes.forEach(button => {
    button.addEventListener('click', () => {
      const cardElement = button.closest('.card-montadoras');
      const conteudo = cardElement ? cardElement.getAttribute('data-name') : null;
      if (conteudo) {
        sendGAEvent(conteudo, 'ver_mais');
      }
    });
  });

  
  var form = document.querySelector('form');
  if (form) {
    var formElements = form.elements;
    var formStarted = {};

    Array.from(formElements).forEach(function(element) {
      element.addEventListener('focus', function () {
        if (!formStarted[element.name]) {
          formStarted[element.name] = true;
          sendFormStartEvent(form);
        }
      }, { once: true });
    });
  }
});


function sendGAEvent(elementName, elementGroup) {
  gtag('event', 'click', {
    'page_location': window.location.href,
    'element_name': elementName,
    'element_group': elementGroup
  });
}

function sendFormStartEvent(form) {
  gtag('event', 'form_start', {
    'page_location': window.location.href,
    'form_id': form.id,
    'form_name': form.name,
    'form_destination': form.action
  });
}

function sendFormSubmitEvent(form) {
  gtag('event', 'form_submit', {
    'page_location': window.location.href,
    'form_id': form.id,
    'form_name': form.name,
    'form_destination': form.action,
    'form_submit_text': form.querySelector('[type="submit"]').innerText
  });
}

function sendFormSuccessViewEvent(form) {
  gtag('event', 'view_form_success', {
    'page_location': window.location.href,
    'form_id': form.id,
    'form_name': form.name
  });
}
