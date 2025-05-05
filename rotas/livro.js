const { Router } = require('express');
const { getLivros } = require('../controladores/livro');

const router = Router();

router.get('/', getLivros);

router.post('/', (req, res) => {
    const livro = req.body;
    // Adicionar logica para salvar o livro no banco de dados
    res.status(201).json(livro);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const livroAtualizado = req.body;
    // Adicionar logica para atualizar o livro no banco de dados
    res.status(200).json({ id, ...livroAtualizado });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    // Adicionar logica para deletar o livro no banco de dados
    res.status(204).send();
});

module.exports = router;