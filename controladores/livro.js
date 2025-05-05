const { getTodosLivros } = require('../servicos/livro');

function getLivros (req, res) {
    try {
        const livros = getTodosLivros();
        res.status(200).json(livros);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar livros' });
    }
}

module.exports = {
    getLivros
};