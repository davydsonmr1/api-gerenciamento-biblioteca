# Aluno: Davydson Maciel Rafael 
# Trabalho do Curso de Desenvolvimento de Sistemas - 27/10/2025

# Funcionamento da API
A API tem rotas para cadastrar e listar as coisas da biblioteca, como fiz pra gerenciar isso:

# users
GET /api/authors - Lista todos os usuarios.
POST /api/users - Cadastra um usuário novo.
# authors
GET /api/authors - Lista todos os autores.
POST /api/authors - Cadastra um autor novo.
# books
POST /api/books - Cadastra um livro novo (tem que passar o ID de um autor que já existe).
GET /api/books - Lista todos os livros.
# loan
POST /api/loans - Faz um empréstimo. Você precisa mandar o bookId (ID do livro) e o userId (ID do usuário).
A API cuida de verificar se o livro está disponível ou não antes de emprestar.


# Regra de Negócio do empréstimo

Quando alguém tenta pegar um livro, a API verifica duas coisas:
O livro está disponível? (O campo isAvailable é true?)
Ou, se ele não estiver disponível (isAvailable é false), a data de devolução (expectedReturnDate) já passou? (Tipo, se alguém já devia ter devolvido o livro antes de hoje).
Se uma dessas duas coisas for verdade, o empréstimo funciona. 

A API vai:
Mudar o isAvailable do livro para false.
Calcular uma nova data de devolução para 3 dias no futuro (expectedReturnDate).
Salvar o livro com esses dados novos.
Criar um novo registro na coleção "Loans" com o nome do usuário, nome do livro e as datas.

Se o livro estiver emprestado e a data de devolução ainda não passou, a API retorna um erro falando que o livro não está disponível.