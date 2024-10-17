function doPost(e) {
  try {
    // Recebe os dados do formulário
    var empresa = e.parameter.empresa;
    var telefone = e.parameter.telefone;
    var cnpj = e.parameter.cnpj;
    var endereco = e.parameter.endereco;
    var bairro = e.parameter.bairro;
    var local = e.parameter.local;

    // Obtém a pasta "Empresas" pelo ID
    var parentFolder = DriveApp.getFolderById('1V-x4hnLxS94rP1wFk78VVOyjqrKJNVZ_');
    
    // Cria uma nova subpasta com o nome da empresa dentro da pasta "Empresas"
    var folder = parentFolder.createFolder(empresa);
    
    // Salva as informações em um arquivo de texto dentro da subpasta
    var info = "Empresa: " + empresa + "\nTelefone: " + telefone + "\nCNPJ: " + cnpj + "\nEndereço: " + endereco + "\nBairro: " + bairro + "\nLocal: " + local;
    folder.createFile('informacoes.txt', info, MimeType.PLAIN_TEXT);
    
    // Salva a imagem dentro da subpasta
    var blob = e.parameter.file; // Obtém o arquivo de imagem
    folder.createFile(blob).setName('imagem.jpg'); // Salva a imagem com o nome 'imagem.jpg'

    // Retorna sucesso
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Retorna erro
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
