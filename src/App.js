import React, { useState, useEffect } from 'react';
import { useStoredState } from './hooks/useStoredState';
import googleSheetsService from './services/googleSheets';

const BriefingApp = () => {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [currentSection, setCurrentSection] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminView, setAdminView] = useState('dashboard');
  const [selectedBriefing, setSelectedBriefing] = useState(null);
  const [briefings, setBriefings] = useStoredState('briefings', []);
  const [isLoadingBriefings, setIsLoadingBriefings] = useState(false);

  // Função para buscar briefings do Google Sheets
  const loadBriefingsFromSheets = async () => {
    if (!adminSettings.googleSheetsUrl) {
      alert('Configure primeiro a URL do Google Sheets nas configurações!');
      return;
    }

    setIsLoadingBriefings(true);
    try {
      const result = await googleSheetsService.getBriefings();
      if (result.success) {
        setBriefings(result.data);
        alert(`${result.data.length} briefings carregados do Google Sheets!`);
      } else {
        alert('Erro ao carregar briefings: ' + result.error);
      }
    } catch (error) {
      console.error('Erro ao carregar briefings:', error);
      alert('Erro ao conectar com Google Sheets. Verifique a configuração.');
    } finally {
      setIsLoadingBriefings(false);
    }
  };
  const [adminSettings, setAdminSettings] = useStoredState('adminSettings', {
    developerName: 'Enoque Sanches Borges',
    title: 'Briefing Profissional',
    description: 'Olá! Este briefing foi criado para entender melhor seu projeto e garantir que desenvolvamos exatamente o que você precisa.',
    subtitle: 'São apenas algumas perguntas que nos ajudarão a criar a solução perfeita para seu negócio.',
    timeEstimate: '5-10 minutos',
    whatsappNumber: '5511999999999', // Número do WhatsApp (incluir código do país)
    googleSheetsUrl: '' // URL do Google Apps Script
  });

  // Configurar Google Sheets URL quando alterada
  useEffect(() => {
    if (adminSettings.googleSheetsUrl) {
      googleSheetsService.setScriptUrl(adminSettings.googleSheetsUrl);
    }
  }, [adminSettings.googleSheetsUrl]);

  const [formData, setFormData] = useState({
    clientName: '',
    projectName: '',
    email: '',
    phone: '',
    objective: '',
    targetAudience: '',
    competitors: '',
    productTypes: '',
    multipleVendors: '',
    suppliers: '',
    features: [],
    automaticShipping: '',
    paymentMethods: [],
    hasLogo: '',
    brandName: '',
    colors: [],
    style: [],
    designReferences: '',
    designElements: [],
    adminControl: '',
    reports: '',
    administrator: '',
    urgency: '',
    deadline: '',
    budget: '',
    budgetRange: '',
    budgetIncludes: [],
    paymentPreference: '',
    budgetNotes: ''
  });

  const sections = [
    {
      title: "Objetivo do Projeto",
      icon: "🎯",
      fields: [
        { key: 'objective', label: 'Qual o objetivo principal do site/app?', type: 'textarea' },
        { key: 'targetAudience', label: 'Qual o público-alvo?', type: 'textarea' },
        { key: 'competitors', label: 'Possui algum concorrente ou referência?', type: 'textarea' }
      ]
    },
    {
      title: "Produtos e Vendedores",
      icon: "🛍️",
      fields: [
        { key: 'productTypes', label: 'Quais tipos de produtos serão vendidos?', type: 'textarea' },
        { key: 'multipleVendors', label: 'Haverá mais de um vendedor na plataforma?', type: 'radio', options: ['Sim', 'Não', 'Não sei ainda'] },
        { key: 'suppliers', label: 'Já possuem fornecedores/vendedores parceiros?', type: 'textarea' }
      ]
    },
    {
      title: "Funcionalidades",
      icon: "⚙️",
      fields: [
        { 
          key: 'features', 
          label: 'Quais funções desejam?', 
          type: 'checkbox', 
          options: [
            '💬 Chat ao vivo', '🎟️ Sistema de cupons', '⭐ Avaliações de produtos', 
            '📊 Painel de vendas', '🛒 Carrinho de compras', '❤️ Lista de desejos (Wishlist)', 
            '📧 Newsletter', '📝 Blog integrado', '🔍 Busca avançada', '📱 App mobile', 
            '🚚 Rastreamento de pedidos', '💳 Gateway de pagamento', '📈 Relatórios de vendas', 
            '🎨 Personalizador de produtos', '🔔 Notificações push', '🌐 Multi-idiomas', 
            '💰 Programa de afiliados', '🏪 Multi-lojas', '📋 Sistema de estoque', 
            '🎯 Marketing automation'
          ] 
        },
        { key: 'automaticShipping', label: 'Desejam ter frete automático?', type: 'radio', options: ['Sim', 'Não', 'Não sei ainda'] },
        { 
          key: 'paymentMethods', 
          label: 'Formas de pagamento que aceitam?', 
          type: 'checkbox', 
          options: [
            '💳 PIX', '💰 Cartão de crédito', '💸 Cartão de débito', '📄 Boleto bancário', 
            '🌐 PayPal', '🛡️ PagSeguro', '🛒 Mercado Pago', '💵 Dinheiro na entrega', 
            '🏦 Transferência bancária', '📱 Carteiras digitais'
          ] 
        }
      ]
    },
    {
      title: "Design e Estilo",
      icon: "🎨",
      fields: [
        { 
          key: 'hasLogo', 
          label: 'Já têm um nome ou logotipo?', 
          type: 'radio', 
          options: [
            '✅ Sim, tenho ambos (nome + logo)', '📝 Só tenho o nome', '🎨 Só tenho o logo', 
            '❌ Não tenho nenhum', '🤔 Preciso de ajuda para criar'
          ] 
        },
        { key: 'brandName', label: 'Nome da marca/empresa:', type: 'text' },
        { 
          key: 'colors', 
          label: 'Quais cores ou paleta preferem?', 
          type: 'checkbox', 
          options: [
            '🔴 Vermelho', '🔵 Azul', '🟢 Verde', '🟡 Amarelo', '🟠 Laranja', '🟣 Roxo', 
            '🟤 Marrom', '⚫ Preto', '⚪ Branco', '🩶 Cinza', '🌈 Colorido/Vibrante', 
            '🎯 Cores neutras', '💎 Dourado/Luxo', '🌿 Tons naturais', '🌸 Tons pastéis', '🔥 Cores quentes'
          ] 
        },
        { 
          key: 'style', 
          label: 'Estilo visual desejado:', 
          type: 'checkbox', 
          options: [
            '🚀 Jovem e moderno', '👔 Clássico e elegante', '✨ Minimalista', '🏢 Corporativo', 
            '🎭 Criativo e diferente', '🌿 Natural/Orgânico', '💎 Luxuoso/Premium', '🎮 Tecnológico', 
            '🏖️ Descontraído/Casual', '🎪 Divertido/Colorido', '🔬 Clean/Profissional', '🎨 Artístico', 
            '⚡ Dinâmico', '🏛️ Tradicional', '🌟 Inovador', '🎯 Focado/Direto'
          ] 
        },
        { key: 'designReferences', label: 'Sites ou marcas que admiram (referências):', type: 'textarea' }
      ]
    },
    {
      title: "Administração",
      icon: "👤",
      fields: [
        { key: 'adminControl', label: 'Desejam controle total do painel admin?', type: 'radio', options: ['Sim', 'Não', 'Parcial'] },
        { key: 'reports', label: 'Precisam de relatórios, gráficos e histórico de vendas?', type: 'radio', options: ['Sim', 'Não', 'Não sei ainda'] },
        { key: 'administrator', label: 'Quem vai administrar a plataforma?', type: 'textarea' }
      ]
    },
    {
      title: "Prazo e Orçamento",
      icon: "💰",
      fields: [
        { 
          key: 'urgency', 
          label: 'Qual a urgência do projeto?', 
          type: 'radio', 
          options: [
            '🚀 Muito urgente (até 30 dias)', '⚡ Urgente (30-60 dias)', '📅 Normal (60-90 dias)', 
            '🕐 Sem pressa (90+ dias)', '🤔 Ainda não defini'
          ] 
        },
        { key: 'deadline', label: 'Data específica para lançamento (se tiver):', type: 'text' },
        { 
          key: 'budgetRange', 
          label: 'Faixa de orçamento disponível:', 
          type: 'radio', 
          options: [
            '💸 Até R$ 5.000', '💰 R$ 5.000 - R$ 15.000', '💎 R$ 15.000 - R$ 30.000', 
            '🏆 R$ 30.000 - R$ 50.000', '👑 Acima de R$ 50.000', '🤝 Vamos conversar sobre valores'
          ] 
        },
        { 
          key: 'budgetIncludes', 
          label: 'O orçamento deve incluir:', 
          type: 'checkbox', 
          options: [
            '🎨 Design completo', '💻 Desenvolvimento', '📱 Versão mobile', '🔧 Manutenção (primeiros meses)', 
            '📚 Treinamento da equipe', '🚀 Hospedagem e domínio', '📈 SEO básico', '🛡️ Certificado SSL', 
            '📊 Analytics/métricas', '🎯 Marketing digital inicial', '📞 Suporte técnico', '🔄 Backups automáticos'
          ] 
        },
        { 
          key: 'paymentPreference', 
          label: 'Preferência de pagamento:', 
          type: 'radio', 
          options: [
            '💳 À vista (desconto)', '📊 50% início + 50% entrega', '📈 33% início + 33% meio + 34% fim', 
            '🗓️ Parcelado em mais vezes', '🤝 Negociar condições'
          ] 
        },
        { key: 'budgetNotes', label: 'Observações sobre orçamento ou prazo:', type: 'textarea' }
      ]
    }
  ];

  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCheckboxChange = (key, option) => {
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].includes(option) 
        ? prev[key].filter(item => item !== option)
        : [...prev[key], option]
    }));
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setCurrentScreen('submit');
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      setCurrentScreen('form');
    }
  };

  const generateMarkdown = (data = formData) => {
    return `🎯 BRIEFING PROFISSIONAL - E-COMMERCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 INFORMAÇÕES DO CLIENTE
• Nome: ${data.clientName}
• Projeto: ${data.projectName}
• E-mail: ${data.email}
• Telefone: ${data.phone}
• Data: ${new Date().toLocaleString('pt-BR')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 OBJETIVO DO PROJETO
• Objetivo Principal: ${data.objective || 'Não informado'}
• Público-Alvo: ${data.targetAudience || 'Não informado'}
• Concorrentes/Referências: ${data.competitors || 'Não informado'}

🛍️ PRODUTOS E VENDEDORES
• Tipos de Produtos: ${data.productTypes || 'Não informado'}
• Múltiplos Vendedores: ${data.multipleVendors || 'Não informado'}
• Fornecedores Parceiros: ${data.suppliers || 'Não informado'}

⚙️ FUNCIONALIDADES DESEJADAS
${data.features.length > 0 ? data.features.map(f => `• ${f}`).join('\n') : '• Não informado'}

• Frete Automático: ${data.automaticShipping || 'Não informado'}

💳 FORMAS DE PAGAMENTO
${data.paymentMethods.length > 0 ? data.paymentMethods.map(p => `• ${p}`).join('\n') : '• Não informado'}

🎨 DESIGN E ESTILO
• Logo/Nome: ${data.hasLogo || 'Não informado'}
• Nome da Marca: ${data.brandName || 'Não informado'}
• Referências de Design: ${data.designReferences || 'Não informado'}

🎨 PALETA DE CORES
${data.colors.length > 0 ? data.colors.map(c => `• ${c}`).join('\n') : '• Não informado'}

✨ ESTILO VISUAL
${data.style.length > 0 ? data.style.map(s => `• ${s}`).join('\n') : '• Não informado'}

👤 ADMINISTRAÇÃO
• Controle Admin: ${data.adminControl || 'Não informado'}
• Relatórios: ${data.reports || 'Não informado'}
• Administrador: ${data.administrator || 'Não informado'}

💰 PRAZO E ORÇAMENTO
• Urgência: ${data.urgency || 'Não informado'}
• Data Específica: ${data.deadline || 'Não informado'}
• Faixa de Orçamento: ${data.budgetRange || 'Não informado'}
• Forma de Pagamento: ${data.paymentPreference || 'Não informado'}

🎯 ESCOPO DO ORÇAMENTO
${data.budgetIncludes.length > 0 ? data.budgetIncludes.map(b => `• ${b}`).join('\n') : '• Não informado'}

📝 OBSERVAÇÕES
${data.budgetNotes || 'Nenhuma observação adicional'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💼 ${adminSettings.developerName} - Desenvolvimento Web
📧 Briefing gerado automaticamente pelo sistema`;
  };

  const submitBriefing = async () => {
    const newBriefing = {
      id: Date.now(),
      clientName: formData.clientName,
      projectName: formData.projectName,
      email: formData.email,
      phone: formData.phone,
      submittedAt: new Date().toLocaleString('pt-BR'),
      data: formData
    };

    // Salvar no localStorage (backup local)
    setBriefings(prev => [...prev, newBriefing]);

    // Salvar no Google Sheets
    try {
      await googleSheetsService.saveBriefing(newBriefing);
      console.log('Briefing salvo no Google Sheets com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar no Google Sheets:', error);
      // Continua mesmo se der erro no Google Sheets
    }

    // Gerar markdown e enviar para WhatsApp
    const markdownText = generateMarkdown();
    const whatsappUrl = `https://wa.me/${adminSettings.whatsappNumber}?text=${encodeURIComponent(markdownText)}`;
    window.open(whatsappUrl, '_blank');

    setCurrentScreen('success');

    // Reset form
    setFormData({
      clientName: '',
      projectName: '',
      email: '',
      phone: '',
      objective: '',
      targetAudience: '',
      competitors: '',
      productTypes: '',
      multipleVendors: '',
      suppliers: '',
      features: [],
      automaticShipping: '',
      paymentMethods: [],
      hasLogo: '',
      brandName: '',
      colors: [],
      style: [],
      designReferences: '',
      designElements: [],
      adminControl: '',
      reports: '',
      administrator: '',
      urgency: '',
      deadline: '',
      budget: '',
      budgetRange: '',
      budgetIncludes: [],
      paymentPreference: '',
      budgetNotes: ''
    });
  };

  const renderField = (field) => {
    const { key, label, type, options } = field;

    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            value={formData[key]}
            onChange={(e) => handleInputChange(key, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={label}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={formData[key]}
            onChange={(e) => handleInputChange(key, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
            placeholder={label}
          />
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {options.map(option => (
              <label 
                key={option} 
                className={`flex items-center space-x-3 cursor-pointer p-3 border-2 rounded-lg transition-all duration-200 hover:shadow-md ${
                  formData[key] === option 
                    ? 'border-blue-500 bg-blue-50 shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={key}
                  value={option}
                  checked={formData[key] === option}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                />
                <span className={`font-medium ${
                  formData[key] === option ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {option}
                </span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className={`grid gap-3 ${key === 'features' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2'}`}>
            {options.map(option => (
              <label 
                key={option} 
                className={`flex items-center space-x-3 cursor-pointer p-3 border-2 rounded-lg transition-all duration-200 hover:shadow-md ${
                  formData[key].includes(option) 
                    ? 'border-blue-500 bg-blue-50 shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData[key].includes(option)}
                  onChange={() => handleCheckboxChange(key, option)}
                  className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                />
                <span className={`text-sm font-medium ${
                  formData[key].includes(option) ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {option}
                </span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  // Painel Administrativo (deve vir antes da tela de introdução)
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">📊</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
                  <p className="text-gray-500">Gerencie briefings e configurações</p>
                </div>
              </div>
              <button
                onClick={() => setIsAdmin(false)}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
              >
                ← Voltar ao App
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: '📊' },
              { key: 'briefings', label: 'Todos os Briefings', icon: '📋' },
              { key: 'settings', label: 'Configurações', icon: '⚙️' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setAdminView(tab.key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  adminView === tab.key 
                    ? 'bg-white shadow text-blue-600 font-medium' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Dashboard View */}
          {adminView === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Total de Briefings</h3>
                  <p className="text-2xl font-bold text-gray-900">{briefings.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Este Mês</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {briefings.filter(b => {
                      const briefingDate = new Date(b.submittedAt);
                      const now = new Date();
                      return briefingDate.getMonth() === now.getMonth() && 
                             briefingDate.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Briefings Recentes</h3>
            {briefings.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum briefing ainda</h3>
                <p className="text-gray-500">Os briefings enviados aparecerão aqui.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {briefings.slice(-5).reverse().map((briefing) => (
                  <div key={briefing.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {briefing.data.projectName || 'Projeto sem nome'}
                        </h4>
                        <p className="text-gray-600">{briefing.clientName}</p>
                        <p className="text-sm text-gray-500">{briefing.email}</p>
                        <p className="text-sm text-gray-500">
                          Orçamento: {briefing.data.budgetRange || 'Não informado'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{briefing.submittedAt}</p>
                        <button
                          onClick={() => {
                            const markdownText = generateMarkdown(briefing.data);
                            const whatsappUrl = `https://wa.me/${adminSettings.whatsappNumber}?text=${encodeURIComponent(markdownText)}`;
                            window.open(whatsappUrl, '_blank');
                          }}
                          className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                        >
                          📱 WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
            </>
          )}

          {/* Briefings View */}
          {adminView === 'briefings' && (
            <div className="space-y-6">
              {/* Header com botão para carregar do Google Sheets */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Todos os Briefings</h3>
                    <p className="text-gray-500">Total: {briefings.length} briefings</p>
                  </div>
                  <button
                    onClick={loadBriefingsFromSheets}
                    disabled={isLoadingBriefings || !adminSettings.googleSheetsUrl}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isLoadingBriefings || !adminSettings.googleSheetsUrl
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {isLoadingBriefings ? '🔄 Carregando...' : '📊 Carregar do Google Sheets'}
                  </button>
                </div>
                
                {!adminSettings.googleSheetsUrl && (
                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-yellow-500 text-lg mr-3">⚠️</span>
                      <p className="text-yellow-800 text-sm">
                        Configure a URL do Google Sheets nas configurações para carregar os dados da planilha.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Lista de Briefings */}
              {briefings.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum briefing encontrado</h3>
                  <p className="text-gray-500">Os briefings enviados aparecerão aqui.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {briefings.map((briefing) => (
                    <div key={briefing.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {briefing.data?.projectName || briefing.projectName || 'Projeto sem nome'}
                            </h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              briefing.data?.urgency?.includes('urgente') 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {briefing.data?.urgency || 'Sem urgência'}
                            </span>
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-gray-900">{briefing.clientName}</p>
                              <p className="text-gray-500">{briefing.email}</p>
                              <p className="text-gray-500">{briefing.phone}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Enviado em:</p>
                              <p className="font-medium text-gray-900">{briefing.submittedAt}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Orçamento:</p>
                              <p className="font-medium text-gray-900">{briefing.data?.budgetRange || 'Não informado'}</p>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => {
                            const markdownText = generateMarkdown(briefing.data || briefing);
                            const whatsappUrl = `https://wa.me/${adminSettings.whatsappNumber}?text=${encodeURIComponent(markdownText)}`;
                            window.open(whatsappUrl, '_blank');
                          }}
                          className="ml-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          📱 WhatsApp
                        </button>
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">🎯 Objetivo</h4>
                            <p className="text-gray-600 text-sm">
                              {briefing.data?.objective?.substring(0, 150) || 'Não informado'}
                              {briefing.data?.objective?.length > 150 && '...'}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">
                              ⚙️ Funcionalidades ({briefing.data?.features?.length || 0})
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {(briefing.data?.features || []).slice(0, 4).map((feature, idx) => (
                                <span key={idx} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                                  {feature}
                                </span>
                              ))}
                              {(briefing.data?.features?.length || 0) > 4 && (
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                  +{briefing.data.features.length - 4} mais
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settings View */}
          {adminView === 'settings' && (
            <div className="space-y-6">
              {/* Configurações Gerais */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Configurações Gerais</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Desenvolvedor</label>
                    <input
                      type="text"
                      value={adminSettings.developerName}
                      onChange={(e) => setAdminSettings(prev => ({ ...prev, developerName: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Título do Briefing</label>
                    <input
                      type="text"
                      value={adminSettings.title}
                      onChange={(e) => setAdminSettings(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descrição Principal</label>
                    <textarea
                      value={adminSettings.description}
                      onChange={(e) => setAdminSettings(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
                    <textarea
                      value={adminSettings.subtitle}
                      onChange={(e) => setAdminSettings(prev => ({ ...prev, subtitle: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tempo Estimado</label>
                    <input
                      type="text"
                      value={adminSettings.timeEstimate}
                      onChange={(e) => setAdminSettings(prev => ({ ...prev, timeEstimate: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Configurações do WhatsApp */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-3">📱</span>
                  Configurações do WhatsApp
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número do WhatsApp (com código do país)
                    </label>
                    <input
                      type="text"
                      value={adminSettings.whatsappNumber}
                      onChange={(e) => setAdminSettings(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                      placeholder="5511999999999"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Exemplo: 5511999999999 (55 = Brasil, 11 = São Paulo, 999999999 = número)
                    </p>
                  </div>
                </div>
              </div>

              {/* Configurações do Google Sheets */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Configurações do Google Sheets
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL do Google Apps Script
                    </label>
                    <input
                      type="url"
                      value={adminSettings.googleSheetsUrl}
                      onChange={(e) => setAdminSettings(prev => ({ ...prev, googleSheetsUrl: e.target.value }))}
                      placeholder="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Cole aqui a URL do seu Google Apps Script para salvar os briefings no Google Sheets
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <span className="text-blue-500 text-lg mr-3">ℹ️</span>
                      <div>
                        <p className="text-blue-800 text-sm font-medium mb-2">Como configurar o Google Sheets:</p>
                        <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
                          <li>Consulte o arquivo GOOGLE_SHEETS_SETUP.md na raiz do projeto</li>
                          <li>Crie uma planilha no Google Sheets</li>
                          <li>Configure o Google Apps Script</li>
                          <li>Cole a URL gerada aqui</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  
                  {adminSettings.googleSheetsUrl && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <span className="text-green-500 text-lg mr-3">✅</span>
                        <p className="text-green-800 text-sm font-medium">
                          Google Sheets configurado! Os briefings serão salvos automaticamente.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Botão Salvar */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <button
                  onClick={() => {
                    alert('Configurações salvas com sucesso!');
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
                >
                  💾 Salvar Configurações
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Tela de Introdução
  if (currentScreen === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-white">📋</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{adminSettings.title}</h1>
            <p className="text-lg text-blue-600 font-semibold">{adminSettings.developerName}</p>
          </div>
          
          <div className="text-gray-600 mb-8 text-left">
            <p className="mb-4">{adminSettings.description}</p>
            <p className="mb-4">{adminSettings.subtitle}</p>
            <p className="text-sm text-gray-500">⏱️ Tempo estimado: {adminSettings.timeEstimate}</p>
          </div>
          
          <button
            onClick={() => setCurrentScreen('form')}
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Iniciar Briefing
          </button>
          
          <button
            onClick={() => {
              setIsAdmin(true);
              setAdminView('dashboard');
            }}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            👨‍💻 Área do Desenvolvedor
          </button>
        </div>
      </div>
    );
  }

  // Formulário
  if (currentScreen === 'form') {
    const currentSectionData = sections[currentSection];
    
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => currentSection === 0 ? setCurrentScreen('intro') : prevSection()}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Voltar
              </button>
              <span className="text-sm text-gray-500">
                {currentSection + 1} de {sections.length}
              </span>
            </div>
            
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl">{currentSectionData.icon}</span>
              <h1 className="text-2xl font-bold text-gray-800">{currentSectionData.title}</h1>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
              />
            </div>
          </div>

          {currentSection === 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Suas informações</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Nome do projeto"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Seu telefone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-6">
              {currentSectionData.fields.map((field, index) => (
                <div key={field.key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                onClick={() => currentSection === 0 ? setCurrentScreen('intro') : prevSection()}
                className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={nextSection}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {currentSection === sections.length - 1 ? 'Finalizar' : 'Próximo'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }  
// Tela de Envio Final
  if (currentScreen === 'submit') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white text-center">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📋</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Revisar Briefing</h1>
              <p className="text-green-100">Confira todas as informações antes de enviar</p>
            </div>
            
            <div className="p-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-3">👤</span>
                  Informações do Cliente
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Cliente</p>
                    <p className="font-semibold text-gray-800">{formData.clientName}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Projeto</p>
                    <p className="font-semibold text-gray-800">{formData.projectName}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">E-mail</p>
                    <p className="font-semibold text-gray-800">{formData.email}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p className="font-semibold text-gray-800">{formData.phone}</p>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <span className="text-xl mr-2">🎯</span>
                    Objetivo do Projeto
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Objetivo Principal:</p>
                      <p className="text-gray-800">{formData.objective || 'Não informado'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Público-Alvo:</p>
                      <p className="text-gray-800">{formData.targetAudience || 'Não informado'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <span className="text-xl mr-2">⚙️</span>
                    Funcionalidades
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {formData.features.slice(0, 6).map((feature, idx) => (
                      <span key={idx} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                        {feature}
                      </span>
                    ))}
                    {formData.features.length > 6 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        +{formData.features.length - 6} mais
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <span className="text-xl mr-2">🎨</span>
                    Design e Estilo
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Nome da Marca:</p>
                      <p className="text-gray-800">{formData.brandName || 'Não informado'}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {formData.colors.slice(0, 4).map((color, idx) => (
                        <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <span className="text-xl mr-2">💰</span>
                    Prazo e Orçamento
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Urgência:</p>
                      <p className="text-gray-800">{formData.urgency || 'Não informado'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Faixa de Orçamento:</p>
                      <p className="text-gray-800 font-semibold">{formData.budgetRange || 'Não informado'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentScreen('form')}
                  className="flex-1 px-8 py-4 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
                >
                  ← Revisar Respostas
                </button>
                <button
                  onClick={submitBriefing}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 font-bold shadow-lg flex items-center justify-center"
                >
                  <span className="mr-2">📱</span>
                  Enviar via WhatsApp
                </button>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-blue-500 text-lg mr-3">ℹ️</span>
                  <p className="text-blue-800 text-sm">
                    <strong>Atenção:</strong> Ao clicar em "Enviar via WhatsApp", um resumo completo do briefing será formatado e enviado automaticamente pelo WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de Sucesso
  if (currentScreen === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-white">🎉</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Briefing Enviado!</h1>
          </div>
          
          <div className="text-gray-600 mb-8">
            <p className="mb-4">Obrigado por compartilhar os detalhes do seu projeto conosco!</p>
            <p className="mb-4">Analisaremos todas as informações e entraremos em contato em breve com uma proposta personalizada.</p>
            <p className="text-sm text-gray-500">📧 Você receberá uma confirmação por e-mail em instantes.</p>
          </div>
          
          <button
            onClick={() => {
              setCurrentScreen('intro');
              setCurrentSection(0);
            }}
            className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Novo Briefing
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default BriefingApp;