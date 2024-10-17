document.getElementById('pdfForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('file', document.getElementById('file').files[0]);
  
    const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
      method: 'POST',
      body: formData
    });
  
    const result = await response.json();
    if (result.success) {
      alert('PDF gerado com sucesso! Verifique seu email.');
    } else {
      alert('Houve um erro ao gerar o PDF. Tente novamente.');
    }
  });
  