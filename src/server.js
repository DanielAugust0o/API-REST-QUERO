import express from 'express';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

// Função para formatar valores como moeda brasileira
const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Função para calcular a porcentagem de desconto
const calculateDiscount = (fullPrice, offeredPrice) => {
  const discount = ((fullPrice - offeredPrice) / fullPrice) * 100;
  return `${Math.round(discount)}%`;
};

// Função para formatar os níveis de curso
const formatLevel = (level) => {
  const levels = {
    bacharelado: 'Graduação (bacharelado)',
    tecnologo: 'Graduação (tecnólogo) ',
    licenciatura: 'Graduação (licenciatura)'
  };
  return levels[level] || level;
};

// Função para formatar as modalidades
const formatModalidade = (modalidade) => {
  const modalidades = {
    presencial: 'Presencial',
    ead: 'EaD'
  };
  return modalidades[modalidade] || modalidade;
};

// Carregar ofertas do arquivo data.json
const getOffers = () => {
  try {
    const data = fs.readFileSync('data.json', 'utf-8');
    const parsedData = JSON.parse(data);
    return parsedData.offers || []; // Acessa a chave "offers"
  } catch (err) {
    console.error('Erro ao ler o arquivo data.json:', err);
    return [];
  }
};

// Endpoint para listar todas as ofertas
app.get('/api/scholarships', (req, res) => {
  const offers = getOffers().map(offer => {
    return {
      curso: offer.courseName, // Alterado para courseName
      instituicao: offer.iesName, // Alterado para iesName
      modalidade: formatModalidade(offer.kind), // Alterado para kind
      level: formatLevel(offer.level),
      fullPrice: formatCurrency(offer.fullPrice),
      offeredPrice: formatCurrency(offer.offeredPrice),
      desconto: calculateDiscount(offer.fullPrice, offer.offeredPrice),
      rating: offer.rating, // Incluído rating
      logo: offer.iesLogo // Incluído iesLogo
    };
  });

  res.json(offers);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
