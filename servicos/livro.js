const fs = require('fs');

function getTodosLivros () {
    return JSON.parse(fs.readFileSync('./livros.json'));
}

function getLivroById (id) {
    return JSON.parse(fs.readFileSync('./livros.json'))
        .find(livro => livro.id === id);
};

function insereLivro (livro) {
    const livros = JSON.parse(fs.readFileSync('./livros.json'));
    if(!livro) {   
        return res.status(400).json({ error: 'Livro não pode ser vazio' });
    }
    const novaListaDeLivros = [...livros, livro];
    fs.writeFileSync('./livros.json', JSON.stringify(novaListaDeLivros));
}

function modificaLivro (livro, id) {
    let livros = JSON.parse(fs.readFileSync('./livros.json'));
    const index = livros.findIndex(livro => livro.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Livro não encontrado' });
    }
    livros[index] = { ...livros[index], ...livro };
    fs.writeFileSync('./livros.json', JSON.stringify(livros));
}

function deletaLivro (id) {
    let livros = JSON.parse(fs.readFileSync('./livros.json'));
    const index = livros.findIndex(livro => livro.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Livro não encontrado' });
    }
    livros.splice(index, 1);
    fs.writeFileSync('./livros.json', JSON.stringify(livros));
}

module.exports = {
    getTodosLivros,
    getLivroById,
    insereLivro,
    modificaLivro,
    deletaLivro
};