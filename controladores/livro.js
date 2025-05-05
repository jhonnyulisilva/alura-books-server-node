const { getTodosLivros, getLivroById, insereLivro, modificaLivro, deletaLivro } = require('../servicos/livro');

function getLivros (req, res) {
    try {
        const livros = getTodosLivros();
        res.status(200).json(livros);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar livros' });
    }
}

function getLivro (req, res) {
    const id = req.params.id;
    try {
        const livro = getLivroById(id);
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.status(200).json(livro);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar livro' });
    }
}

function postLivro (req, res) {
    try {
        const livro = req.body;
        insereLivro(livro);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar livro' });
    }
    res.status(201).json({ message: 'Livro inserido com sucesso' });
}

function patchLivro (req, res) {
    try {
        const livro = req.body;
        const id = req.params.id;
        const livroExistente = getLivroById(id);
        if (!livroExistente) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        modificaLivro(livro, id);
        res.status(200).json({ message: 'Livro atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar livro' });
    }
}

function deleteLivro (req, res) {
    const id = req.params.id;
    try {
        const livro = getLivroById(id);
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        deletaLivro(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar livro' });
    }
}

module.exports = {
    getLivros,
    getLivro,
    postLivro,
    patchLivro,
    deleteLivro
};