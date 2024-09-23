import express from 'express';

const app = express();


// Função para formatar valores como moeda brasileira
const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  // Função para calcular a porcentagem de desconto
  const calculateDiscount = (fullPrice, offeredPrice) => {
    const discount = ((fullPrice - offeredPrice) / fullPrice) * 100;
    return `${Math.round(discount)}% `;
  };
  
  // Função para formatar os níveis de curso
  const formatLevel = (level) => {
    const levels = {
      bacharelado: 'Graduação (bacharelado)',
      tecnologo: 'Graduação (tecnólogo)',
      licenciatura: 'Graduação (licenciatura)'
    };
    return levels[level] || level;
  };
  
  // Função para formatar as modalidades
  const formatModalidade = (modalidade) => {
    const modalidades = {
      presencial: 'Presencial ',
      ead: 'EaD '
    };
    return modalidades[modalidade] || modalidade;
  };
  
  // Carregar ofertas do arquivo data.json
  const getOffers = () => {
    const data = fs.readFileSync('data.json');
    return JSON.parse(data);
  };
  
  // Endpoint para listar todas as ofertas
  app.get('/api/scholarships', (req, res) => {
    const offers = getOffers().map(offer => {
      return {
        id: offer.id,
        curso: offer.courseName, 
        instituicao: offer.iesName, 
        modalidade: formatModalidade(offer.kind), 
        level: formatLevel(offer.level),
        fullPrice: formatCurrency(offer.fullPrice),
        offeredPrice: formatCurrency(offer.offeredPrice),
        desconto: calculateDiscount(offer.fullPrice, offer.offeredPrice)
      };
    });
  
    res.json(offers);
  });
  
  // Servidor
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
  


export default app