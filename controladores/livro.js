function getLivros (req, res) {
    try {
        const livros = []; // Adicionar logica para buscar livros no banco de dados
        res.status(200).json(livros);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar livros' });
    }
}

module.exports = {
    getLivros
};