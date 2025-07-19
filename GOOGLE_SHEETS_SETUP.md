# Configuração do Google Sheets como Banco de Dados

## Passo 1: Criar a Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha chamada "Briefings E-commerce"
3. Na primeira linha (cabeçalhos), adicione as seguintes colunas:

```
A1: ID
B1: Data/Hora
C1: Nome do Cliente
D1: Nome do Projeto
E1: Email
F1: Telefone
G1: Objetivo
H1: Público-Alvo
I1: Concorrentes
J1: Tipos de Produtos
K1: Múltiplos Vendedores
L1: Fornecedores
M1: Funcionalidades
N1: Frete Automático
O1: Formas de Pagamento
P1: Logo/Nome
Q1: Nome da Marca
R1: Cores
S1: Estilo Visual
T1: Referências Design
U1: Controle Admin
V1: Relatórios
W1: Administrador
X1: Urgência
Y1: Data Específica
Z1: Faixa Orçamento
AA1: Escopo Orçamento
AB1: Forma Pagamento
AC1: Observações
```

## Passo 2: Criar o Google Apps Script

1. Na planilha, vá em **Extensões > Apps Script**
2. Substitua o código padrão pelo código abaixo:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'saveBriefing') {
      return saveBriefing(data.data);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: 'Ação não reconhecida'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getBriefings') {
      return getBriefings();
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: 'Ação não reconhecida'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function saveBriefing(briefingData) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Preparar os dados para inserir na planilha
    const row = [
      briefingData.id || new Date().getTime(),
      briefingData.submittedAt || new Date().toLocaleString('pt-BR'),
      briefingData.clientName || '',
      briefingData.data.projectName || '',
      briefingData.email || '',
      briefingData.phone || '',
      briefingData.data.objective || '',
      briefingData.data.targetAudience || '',
      briefingData.data.competitors || '',
      briefingData.data.productTypes || '',
      briefingData.data.multipleVendors || '',
      briefingData.data.suppliers || '',
      (briefingData.data.features || []).join(', '),
      briefingData.data.automaticShipping || '',
      (briefingData.data.paymentMethods || []).join(', '),
      briefingData.data.hasLogo || '',
      briefingData.data.brandName || '',
      (briefingData.data.colors || []).join(', '),
      (briefingData.data.style || []).join(', '),
      briefingData.data.designReferences || '',
      briefingData.data.adminControl || '',
      briefingData.data.reports || '',
      briefingData.data.administrator || '',
      briefingData.data.urgency || '',
      briefingData.data.deadline || '',
      briefingData.data.budgetRange || '',
      (briefingData.data.budgetIncludes || []).join(', '),
      briefingData.data.paymentPreference || '',
      briefingData.data.budgetNotes || ''
    ];
    
    // Adicionar a linha na planilha
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Briefing salvo com sucesso!'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getBriefings() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Remover o cabeçalho
    const briefings = data.slice(1).map(row => ({
      id: row[0],
      submittedAt: row[1],
      clientName: row[2],
      projectName: row[3],
      email: row[4],
      phone: row[5],
      data: {
        objective: row[6],
        targetAudience: row[7],
        competitors: row[8],
        productTypes: row[9],
        multipleVendors: row[10],
        suppliers: row[11],
        features: row[12] ? row[12].split(', ') : [],
        automaticShipping: row[13],
        paymentMethods: row[14] ? row[14].split(', ') : [],
        hasLogo: row[15],
        brandName: row[16],
        colors: row[17] ? row[17].split(', ') : [],
        style: row[18] ? row[18].split(', ') : [],
        designReferences: row[19],
        adminControl: row[20],
        reports: row[21],
        administrator: row[22],
        urgency: row[23],
        deadline: row[24],
        budgetRange: row[25],
        budgetIncludes: row[26] ? row[26].split(', ') : [],
        paymentPreference: row[27],
        budgetNotes: row[28]
      }
    }));
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, data: briefings}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Passo 3: Configurar e Publicar

1. Clique em **Salvar** (ícone de disquete)
2. Clique em **Executar** para testar (autorize as permissões se solicitado)
3. Clique em **Implantar > Nova implantação**
4. Escolha o tipo: **Aplicativo da Web**
5. Configurações:
   - **Executar como**: Eu
   - **Quem tem acesso**: Qualquer pessoa
6. Clique em **Implantar**
7. **COPIE A URL** que aparece (algo como: `https://script.google.com/macros/s/ABC123.../exec`)

## Passo 4: Configurar no App

1. No arquivo `src/services/googleSheets.js`, substitua `YOUR_SCRIPT_ID` pela URL copiada
2. Ou configure via painel administrativo (implementaremos isso)

## Vantagens desta Solução

✅ **Gratuito**: Google Sheets é gratuito
✅ **Simples**: Fácil de configurar e usar
✅ **Visual**: Você pode ver os dados diretamente na planilha
✅ **Backup**: Google faz backup automático
✅ **Compartilhável**: Pode compartilhar a planilha com outros
✅ **Exportável**: Pode exportar para Excel, PDF, etc.
✅ **Sem servidor**: Não precisa de servidor próprio

## Limitações

⚠️ **Limite de requisições**: 100 requisições por 100 segundos por usuário
⚠️ **Tamanho**: Máximo 10 milhões de células por planilha
⚠️ **Velocidade**: Pode ser mais lento que bancos de dados tradicionais

Para este app de briefing, essas limitações não são um problema!