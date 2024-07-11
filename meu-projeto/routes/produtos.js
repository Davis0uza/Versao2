const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Produto = require('../models/produto');
const Versao = require('../models/versao');
const multer = require('multer');
const Sequelize = require('sequelize'); // Certifique-se de importar o Sequelize

// Certifique-se de que o diretório 'src/uploads' existe no backend
const uploadDir = path.join(__dirname, '../src/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/', async (req, res) => {
  const { nome, descricao, preco, id_categoria, versao } = req.body;
  let transaction;

  try {
    // Inicia uma transação
    transaction = await Produto.sequelize.transaction();

    // Primeiro, cria o produto com um id_versao temporário
    const novoProduto = await Produto.create({
      nome,
      descricao,
      preco,
      id_categoria,
      id_versao: 1, // id_versao temporário
      id_gestor: null,
      Iddlc: null
    }, { transaction });

    // Cria a versão associada ao produto
    const novaVersao = await Versao.create({
      nome: versao,
      id_produto: novoProduto.id_produto
    }, { transaction });

    // Atualiza o produto com o id_versao correto
    await novoProduto.update({
      id_versao: novaVersao.id_versao
    }, { transaction });

    // Confirma a transação
    await transaction.commit();

    // Recupera o produto atualizado para retorno
    const produtoAtualizado = await Produto.findByPk(novoProduto.id_produto);
    res.status(201).json(produtoAtualizado);
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Erro ao adicionar produto:', error);
    res.status(500).json({ error: 'Erro ao adicionar produto' });
  }
});


// Rota GET para listar todos os produtos
router.get('/all', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
});

// Rota PUT para editar produto
router.put('/edit/:id', upload.single('fotoproduto'), async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, id_categoria, id_versao } = req.body;
  const fotoproduto = req.file ? req.file.filename : null;
  
  try {
    const produto = await Produto.findByPk(id);
    if (produto) {
      produto.nome = nome;
      produto.descricao = descricao;
      produto.preco = preco;
      produto.id_categoria = id_categoria;
      produto.id_versao = id_versao;
      if (fotoproduto) produto.fotoproduto = fotoproduto;
      await produto.save();
      res.json(produto);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});


// Rota GET para listar DLCs
router.get('/dlcs', async (req, res) => {
  try {
    const dlcs = await Produto.findAll({ where: { Iddlc: { [Sequelize.Op.ne]: null } } });
    res.json(dlcs);
  } catch (error) {
    console.error('Erro ao listar DLCs:', error);
    res.status(500).json({ error: 'Erro ao listar DLCs' });
  }
});

// Rota GET para listar produtos não DLCs
router.get('/nondlcs', async (req, res) => {
  try {
    const nondlcs = await Produto.findAll({ where: { Iddlc: null } });
    res.json(nondlcs);
  } catch (error) {
    console.error('Erro ao listar produtos não DLCs:', error);
    res.status(500).json({ error: 'Erro ao listar produtos não DLCs' });
  }
});

// Rota POST para adicionar produto e versão
router.post('/', async (req, res) => {
  const { nome, descricao, preco, id_categoria, versao } = req.body;
  let transaction;
  try {
    // Inicia uma transação
    transaction = await Produto.sequelize.transaction();

    // Primeiro, cria o produto sem o id_versao
    const novoProduto = await Produto.create({
      nome,
      descricao,
      preco,
      id_categoria,
      id_versao: null, // Inicialmente sem versão
      id_gestor: null,
      Iddlc: null
    }, { transaction });

    // Depois, cria a versão associada ao produto
    const novaVersao = await Versao.create({
      nome: versao,
      id_produto: novoProduto.id_produto
    }, { transaction });

    // Atualiza o produto com o id_versao criado
    await Produto.update(
      { id_versao: novaVersao.id_versao },
      { where: { id_produto: novoProduto.id_produto }, transaction }
    );

    // Confirma a transação
    await transaction.commit();

    // Recupera o produto atualizado para retorno
    const produtoAtualizado = await Produto.findByPk(novoProduto.id_produto);
    res.status(201).json(produtoAtualizado);
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Erro ao adicionar produto:', error);
    res.status(500).json({ error: 'Erro ao adicionar produto' });
  }
});


// Rota POST para adicionar estoque a um produto existente
router.post('/addStock', async (req, res) => {
  const { id_produto, quantidade } = req.body;
  try {
    const produto = await Produto.findByPk(id_produto);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    for (let i = 0; i < quantidade; i++) {
      await Produto.create({
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        id_categoria: produto.id_categoria,
        id_versao: produto.id_versao,
        id_gestor: null,
        Iddlc: produto.Iddlc
      });
    }
    
    res.status(200).json({ message: 'Stock adicionado com sucesso' });
  } catch (error) {
    console.error('Erro ao adicionar estoque:', error);
    res.status(500).json({ error: 'Erro ao adicionar estoque' });
  }
});

// Rota GET para listar produtos sem id_gestor
router.get('/sem-gestor', async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      where: { id_gestor: null },
      attributes: [
        'nome',
        'descricao',
        'preco',
        'id_categoria',
        [Sequelize.fn('COUNT', Sequelize.col('id_produto')), 'quantidade']
      ],
      group: ['nome', 'descricao', 'preco', 'id_categoria']
    });
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos sem gestor:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos sem gestor' });
  }
});

// Rota UPDATE para atualizar id_gestor do produto selecionado
router.put('/update-gestor', async (req, res) => {
  const { id, id_gestor } = req.body;
  console.log('Recebido id:', id);
  console.log('Recebido id_gestor:', id_gestor);
  try {
    await Produto.update({ id_gestor }, { where: { id_produto: id } });
    res.status(200).json({ message: 'Gestor atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar gestor dos produtos:', error);
    res.status(500).json({ error: 'Erro ao atualizar gestor dos produtos' });
  }
});

// Rota GET para listar produtos por id_gestor
router.get('/gestor/:id_gestor', async (req, res) => {
  const { id_gestor } = req.params;
  try {
    const produtos = await Produto.findAll({ where: { id_gestor } });
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos do gestor:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos do gestor' });
  }
});

// Rota DELETE para remover produto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Produto.destroy({ where: { id_produto: id } });
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao remover produto:', error);
    res.status(500).send({ error: 'Erro ao remover produto' });
  }
});

// Rota PUT para atualizar o produto com a versão
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { id_versao } = req.body;
  try {
    await Produto.update({ id_versao }, { where: { id_produto: id } });
    res.status(200).json({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});


module.exports = router;
