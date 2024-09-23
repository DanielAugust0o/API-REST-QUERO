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
    tecnologo: 'Graduação (tecnólogo)',
    licenciatura: 'Graduação (licenciatura)',
  };
  return levels[level] || level;
};

// Função para formatar as modalidades
const formatModalidade = (modalidade) => {
  const modalidades = {
    presencial: 'Presencial',
    ead: 'EaD',
  };
  return modalidades[modalidade] || modalidade;
};

// Carregar ofertas do arquivo data.json
const getOffers = () => {
  try {
    const data = fs.readFileSync('data.json', 'utf-8');
    const parsedData = JSON.parse(data);
    return parsedData.offers || [];
  } catch (err) {
    console.error('Erro ao ler o arquivo data.json:', err);
    return [];
  }
};

// Endpoint para listar todas as ofertas
app.get('/api/scholarships', (req, res) => {
  const offers = getOffers().map((offer) => ({
    id: offer.id,
    curso: offer.courseName,
    instituicao: offer.iesName,
    modalidade: formatModalidade(offer.kind),
    level: formatLevel(offer.level),
    fullPrice: formatCurrency(offer.fullPrice),
    offeredPrice: formatCurrency(offer.offeredPrice),
    desconto: calculateDiscount(offer.fullPrice, offer.offeredPrice),
  }));

  res.json(offers);
});

// Endpoint para filtrar ofertas
app.get('/api/scholarships/filter', (req, res) => {
  const kind = req.query.kind;
  const level = req.query.level;

  const offers = getOffers().map((offer) => ({
    ...offer,
    modalidade: formatModalidade(offer.kind),
    level: formatLevel(offer.level),
    fullPrice: formatCurrency(offer.fullPrice),
    offeredPrice: formatCurrency(offer.offeredPrice),
    desconto: calculateDiscount(offer.fullPrice, offer.offeredPrice),
  }));

  // Se nenhum parâmetro for fornecido, retornar erro
  if (!kind && !level) {
    return res.status(400).json({ error: 'Por favor, forneça pelo menos uma modalidade ou nível.' });
  }

  const filteredOffers = offers.filter((offer) => {
    const kindMatch = kind ? offer.kind.toLowerCase() === kind.toLowerCase() : true;
    const levelMatch = level ? offer.level.toLowerCase() === level.toLowerCase() : true;
    return kindMatch && levelMatch;
  });

  if (filteredOffers.length === 0) {
    return res.status(404).json({ message: 'Nenhuma bolsa encontrada para os critérios especificados.' });
  }

  res.json(filteredOffers);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
