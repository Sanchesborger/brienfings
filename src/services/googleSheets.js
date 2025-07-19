// Serviço para integração com Google Sheets
class GoogleSheetsService {
  constructor() {
    // URL do Google Apps Script que você vai criar
    this.scriptUrl = 'https://script.google.com/macros/s/AKfycbzGTVtsM5oplVVRgSj8IfdP351zZVfm7yStejqN0QZ6KWJDd511tpdrEp99v8qJs6nT/exec';
  }

  // Enviar briefing para Google Sheets
  async saveBriefing(briefingData) {
    try {
      const response = await fetch(this.scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'saveBriefing',
          data: briefingData
        })
      });

      // Como usamos no-cors, não podemos ler a resposta
      // Mas podemos assumir que foi enviado com sucesso
      return { success: true };
    } catch (error) {
      console.error('Erro ao salvar no Google Sheets:', error);
      return { success: false, error: error.message };
    }
  }

  // Buscar briefings do Google Sheets (opcional)
  async getBriefings() {
    try {
      const response = await fetch(`${this.scriptUrl}?action=getBriefings`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar briefings:', error);
      return [];
    }
  }

  // Configurar URL do script
  setScriptUrl(url) {
    this.scriptUrl = url;
  }
}

export default new GoogleSheetsService();