function doPost(e) {
  try {
    // Recebe os dados do formulário
    var empresa = e.parameter.empresa;
    var telefone = e.parameter.telefone;
    var cnpj = e.parameter.cnpj;
    var endereco = e.parameter.endereco;
    var bairro = e.parameter.bairro;
    var local = e.parameter.local;
    var data = e.parameter.data;
    var desc1 = e.parameter.desc1; // Descrição da foto
    var foto1 = e.parameter.foto1; // Você precisará adicionar tratamento para imagens

    // Abrir template de documento do Google Docs
    var templateId = '1YXTBC31irI_zKA38V2UOsfGywoKE5_mCFs2jeKysf34'; // Substitua pelo ID do seu documento de template
    var doc = DocumentApp.openById(templateId);
    var body = doc.getBody();

    // Substitui os placeholders com os dados do formulário
    body.replaceText('{{empresa}}', empresa);
    body.replaceText('{{telefone}}', telefone);
    body.replaceText('{{cnpj}}', cnpj);
    body.replaceText('{{endereco}}', endereco);
    body.replaceText('{{bairro}}', bairro);
    body.replaceText('{{local}}', local);
    body.replaceText('{{data}}', data);
    body.replaceText('{{desc1}}', desc1);

    // Para inserir a imagem
    if (foto1) {
      // Caso a imagem venha de um upload ou Google Drive, trate a inserção dela aqui
      var img = DriveApp.getFileById(foto1).getBlob();
      body.appendImage(img);
    }

    // Gera o PDF
    var pdfBlob = doc.getAs('application/pdf');
    
    // Salva no Google Drive
    var folderId = '1dm6g-raNdqMUJgkvLsAy2vO4HSGOlDWD'; // Substitua pelo ID da pasta no Drive
    var folder = DriveApp.getFolderById(folderId);
    var pdfFile = folder.createFile(pdfBlob);
    
    // Envia o PDF por email
    MailApp.sendEmail({
      to: e.parameter.email,
      subject: 'Seu PDF Gerado',
      body: 'Aqui está o PDF gerado com as suas informações.',
      attachments: [pdfBlob]
    });

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message })).setMimeType(ContentService.MimeType.JSON);
  }
}
