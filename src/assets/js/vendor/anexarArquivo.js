/// Script que monta área de upload de arquivo com opções drag drop e print screen.

/******************************************
 * Dropzone (Plugin responsável por montar a região de anexar arquivos com recurso de drag drop)
 * Por padrão o plugin procura qualquer elemento html com a classe dropzone e monta a área.
 * Desabilitamos o autodiscover para montar as configurações customizadas.
 ******************************************/
Dropzone.autoDiscover = false;

var areaAnexarArquivo = new Dropzone("div.dropzone", {
    url: "/salvarArquivo.aspx",
    maxFiles: 1,
    // Permite somente anexar um arquivo. Portanto ao tentar anexar outro arquivo o antigo é removido.
    maxfilesexceeded: function(file) {
        this.removeAllFiles();
        this.addFile(file);
    },
    uploadMultiple: true,
    addRemoveLinks: true, // Adiciona link para remover / cancelar upload.
    dictDefaultMessage: 'Dê um print na tela e cole ou clique para anexar um arquivo.',
    dictFallbackMessage: 'Seu navegador não suporta arrastar e soltar para anexar arquivos.',
    dictFallbackText: 'Por favor, use o formulário abaixo para anexar seu arquivo.',
    dictInvalidFileType: 'Não é permitido anexar este tipo de arquivo.',
    dictResponseError: 'Error ao enviar o arquivo. ID {{statusCode}}',
    dictCancelUpload: 'Cancelar upload',
    dictCancelUploadConfirmation: 'Deseja realmente cancelar o upload?',
    dictRemoveFile: 'Remover arquivo',
    dictMaxFilesExceeded: 'É permitido anexar um arquivo.',
    success: function (file, result) {
    }
});



/***********************
 * Print screen Chrome *
 ***********************/
function pasteHandler(e) {
    if (e.clipboardData) {
        // Obtem os itens que estão na áre de tranferência.
        var items = e.clipboardData.items;

        if (items) {
            // Pecorre cada item da área de tranferência até encontrar uma imagem (Print screen).
            for (var i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") !== -1) {
                    
                    // Obtem a imagem (Objeto Blob)
                    var file = items[i].getAsFile();
                    file.lastModifiedDate = new Date(); // Adiciona data de modificação do arquivo.
                    file.name = 'printScreen.' + file.type.split('/').pop(); // Adicona nome do arquivo.

                    // Adicona a imagem para realizar o upload no dropZone.
                    areaAnexarArquivo.addFile(file);
                }
            }
        }
    }
}

/* Escuta a função colar (ctrl + v) do navegador. Chama a função que captura o print e manda para o dropzone 
   para realizar o upload da imagem. */
window.addEventListener("paste", pasteHandler);



/********************************************
 * Print screen Firefox e Internet Explorer *
 ********************************************/

/**
 * Converte imagem Base64 para Blob
 * @param imagemBase64
 * @return Objeto Blob
 */
function base64ToBlob(imagemBase64) {
    // Converte base64/URLEnconded para dados binários brutos.
    var byteString;
    if (imagemBase64.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(imagemBase64.split(',')[1]);
    } else {
        byteString = unescape(imagemBase64.split(',')[1]);
    }

    var mimeString = imagemBase64.split(',')[0].split(':')[1].split(';')[0];

    // Trancreve os bytes da seqüência de caracteres para uma matriz tipificada.
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}

document.onkeydown = function (e) { return on_keyboard_action(e); }
document.onkeyup = function (e) { return on_keyboardup_action(e); }
var ctrl_pressed = false;
var k;

function on_keyboard_action(event) {
    k = event.keyCode;
    //ctrl
    if (k == 17) {
        if (ctrl_pressed == false) {
            ctrl_pressed = true;
        }

        if (!window.Clipboard) {
            pasteCatcher.focus();
        }
    }
}
function on_keyboardup_action(event) {
    //ctrl
    if (k == 17) {
        ctrl_pressed = false;
        document.focus();
    }
}

var pasteCatcher;
if (!window.Clipboard) {
    pasteCatcher = document.createElement("div");
    pasteCatcher.setAttribute("id", "area-copypaste-firefox-explorer");
    pasteCatcher.setAttribute("contenteditable", "");
    //pasteCatcher.style.cssText = 'opacity:0;position:fixed;top:0px;left:0px;';
    pasteCatcher.style.marginLeft = "-20px";
    document.body.appendChild(pasteCatcher);
    pasteCatcher.focus();
    /*document.addEventListener("click", function () {
        pasteCatcher.focus();
    });*/

    document.getElementById('area-copypaste-firefox-explorer').addEventListener('DOMSubtreeModified', function () {
        if (pasteCatcher.children.length == 1) {
            const img = pasteCatcher.firstElementChild.src;
            pasteCatcher.innerHTML = '';

            var blob = base64ToBlob(img);
            blob.name = 'printScreen.' + blob.type.split('/').pop();
            areaAnexarArquivo.addFile(blob);

            
        }
    }, false);
}