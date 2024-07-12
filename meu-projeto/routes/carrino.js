const express = require('express');
const router = express.Router();
const Carrino = require('../models/carrino');
const Sequelize = require('sequelize');


// Rota GET para listar todos os carrinhos
router.post('/', async (req, res) => {
  try {
    const { id_user, produtos } = req.body; // produtos é um array de objetos { nome, preco }
    const produtosFormatados = produtos.map(produto => `${produto.nome} - ${produto.preco}`).join(', ');

    console.log('Recebido id_user:', id_user);
    console.log('Recebido produtos:', produtosFormatados);

    const novoCarrinho = await Carrino.create({
      id_user,
      data: new Date(),
      produtos: produtosFormatados
    });
    res.status(201).json(novoCarrinho);
  } catch (error) {
    console.error("Erro ao adicionar item ao carrinho:", error);
    res.status(500).json({ error: 'Erro ao adicionar item ao carrinho' });
  }
});


// Rota GET para listar todos os carrinhos
router.get('/all', async (req, res) => {
  try {
    const carrinhos = await Carrino.findAll();
    res.json(carrinhos);
  } catch (error) {
    console.error('Erro ao buscar carrinhos:', error);
    res.status(500).json({ error: 'Erro ao buscar carrinhos' });
  }
});

// Rota GET para listar carrinhos por usuário
router.get('/user/:id_user', async (req, res) => {
  const { id_user } = req.params;
  try {
    console.log("Buscando carrinhos para o usuário:", id_user); // Adicionar log
    const carrinhos = await Carrino.findAll({ where: { id_user } });
    console.log("Carrinhos encontrados:", carrinhos); // Adicionar log
    res.json(carrinhos);
  } catch (error) {
    console.error("Erro ao buscar carrinhos por usuário:", error);
    res.status(500).json({ error: 'Erro ao buscar carrinhos por usuário' });
  }
});

// Rota POST para adicionar itens ao carrinho
router.post('/', async (req, res) => {
  try {
    const { id_user, produtos } = req.body;
    console.log('Recebido id_user:', id_user);
    console.log('Recebido produtos:', produtos);
    const novoCarrinho = await Carrino.create({
      id_user,
      data: new Date(),
      produtos
    });
    res.status(201).json(novoCarrinho);
  } catch (error) {
    console.error("Erro ao adicionar item ao carrinho:", error);
    res.status(500).json({ error: 'Erro ao adicionar item ao carrinho' });
  }
});

// Rota DELETE para remover carrinho
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Carrino.destroy({ where: { id_carrinho: id } });
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error);
    res.status(500).send({ error: 'Erro ao remover item do carrinho' });
  }
});

// Obter dados de vendas
router.get('/vendas', async (req, res) => {
  try {
    const carrinhos = await Carrino.findAll({
      attributes: ['id_carrinho', 'id_user', 'data', 'produtos'],
      where: {
        produtos: {
          [Sequelize.Op.ne]: null
        }
      }
    });

    const vendasPorDia = {};

    carrinhos.forEach((carrinho) => {
      const { data, produtos } = carrinho;
      const dia = new Date(data).toISOString().split('T')[0];

      const produtosList = produtos.split(', ');

      produtosList.forEach((produto) => {
        const [nome, preco] = produto.split(' - ');
        const precoNumber = parseFloat(preco);

        if (!vendasPorDia[dia]) {
          vendasPorDia[dia] = {
            totalVendas: 0,
            totalVendidos: 0
          };
        }

        vendasPorDia[dia].totalVendas += precoNumber;
        vendasPorDia[dia].totalVendidos += 1;
      });
    });

    const vendas = Object.keys(vendasPorDia).map((dia) => ({
      dia,
      totalVendas: vendasPorDia[dia].totalVendas,
      totalVendidos: vendasPorDia[dia].totalVendidos
    }));

    res.json(vendas);
  } catch (error) {
    console.error('Erro ao obter dados de vendas:', error);
    res.status(500).send('Erro ao obter dados de vendas');
  }
});

// Rota GET para obter o produto mais vendido
router.get('/produto-mais-vendido', async (req, res) => {
  try {
    const produtos = await Carrino.findAll({
      attributes: ['produtos'],
    });

    const produtosVendidos = {};

    produtos.forEach(carrinho => {
      const itens = carrinho.produtos.split(', ');
      itens.forEach(item => {
        const [nome] = item.split(' - ');
        if (produtosVendidos[nome]) {
          produtosVendidos[nome]++;
        } else {
          produtosVendidos[nome] = 1;
        }
      });
    });

    const produtoMaisVendido = Object.entries(produtosVendidos).reduce((acc, [nome, quantidade]) => {
      if (!acc || quantidade > acc.quantidade) {
        return { nome, quantidade };
      }
      return acc;
    }, null);

    res.json(produtoMaisVendido);
  } catch (error) {
    console.error('Erro ao buscar produto mais vendido:', error);
    res.status(500).json({ error: 'Erro ao buscar produto mais vendido' });
  }
});

module.exports = router;
