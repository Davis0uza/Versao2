const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const User = require('../models/User');

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
// Rota GET para listar users
router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Rota POST para adicionar user
router.post('/', async (req, res) => {
  try {
    const { nome, datanasc, telemovel, email, password, id_tipo, nif, morada } = req.body;
    const novoUsuario = await User.create({
      nome,
      datanasc,
      telemovel,
      email,
      password,
      id_tipo,
      nif,
      morada,
      fotoperfil: null,
      id_ticket: null,
      id_gestor: null
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    res.status(500).json({ error: 'Erro ao adicionar usuário' });
  }
});

// Rota para atualizar o tipo de utilizador de um usuário
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { id_tipo } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.id_tipo = id_tipo;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tipo de utilizador' });
  }
});

// Rota para atualizar usuário incluindo foto de perfil
router.put('/editar/:id', upload.single('fotoperfil'), async (req, res) => {
  const { id } = req.params;
  const { nome, datanasc, telemovel, email, id_tipo, nif, morada } = req.body;
  const fotoperfil = req.file ? req.file.filename : null;
  
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.nome = nome;
      user.datanasc = datanasc;
      user.telemovel = telemovel;
      user.email = email;
      user.id_tipo = id_tipo;
      user.nif = nif;
      user.morada = morada;
      if (fotoperfil) user.fotoperfil = fotoperfil;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Rota DELETE para remover user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({ where: { id_user: id } });
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover usuário:", error);
    res.status(500).send({ error: 'Erro ao remover usuário' });
  }
});

module.exports = router;
