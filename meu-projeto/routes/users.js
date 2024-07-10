const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key'; // Substitua por uma chave secreta real

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id_user, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'Lax' });
      res.json({ user });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: false, sameSite: 'Lax' });
  res.json({ message: 'Logged out successfully' });
});

router.get('/checkAuth', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    User.findByPk(decoded.id).then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }
      res.json({ user });
    });
  } catch (error) {
    res.status(401).json({ error: 'Not authenticated' });
  }
});


// Rota para registrar usuário
router.post('/register', async (req, res) => {
  try {
    const { nome, datanasc, telemovel, email, password, nif, morada } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const novoUsuario = await User.create({
      nome,
      datanasc,
      telemovel,
      email,
      password: hashedPassword, // Armazenar a senha hash
      id_tipo: 2, // Definindo id_tipo como "2" (cliente) por padrão
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
