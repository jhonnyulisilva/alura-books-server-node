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
        if(!Number(id)) {
            return res.status(422).json({ error: 'ID deve ser um número' });
        } else if (!livro) {
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
        
        // Lista de campos obrigatórios
        const camposObrigatorios = ['id', 'titulo', 'autor', 'ano_publicacao', 'genero'];

        // Verifica se todos os campos obrigatórios estão presentes e preenchidos
        const camposFaltando = camposObrigatorios
            .filter(campo => !livro[campo] || livro[campo].toString().trim() === '');
        if (camposFaltando.length > 0) {
            return res.status(400).json({ error: `Os seguintes campos estão faltando ou vazios: ${camposFaltando.join(', ')}` });
        }

        // Verifica se há campos extras no corpo da requisição
        const camposExtras = Object.keys(livro).filter(campo => !camposObrigatorios.includes(campo));
        if (camposExtras.length > 0) {
            return res.status(400).json({ error: `Os seguintes campos não são permitidos: ${camposExtras.join(', ')}` });
        }
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
        if(!Number(id)) {
            return res.status(422).json({ error: 'ID deve ser um número' });
        } else if (!livroExistente) {
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
        if(!Number(id)) {
            return res.status(422).json({ error: 'ID deve ser um número' });
        } else if (!livro) {
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