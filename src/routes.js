import { Router } from 'express';

import AlunoController from './app/controllers/AlunoController';
import DisciplinaController from './app/controllers/DisciplinaController';
import AlunoDisciplinaController from './app/controllers/AlunoDisciplinaController';

const routes = new Router();

//Aluno
routes.get('/alunos', AlunoController.getAll);
routes.post('/aluno', AlunoController.create);
routes.delete('/aluno/:matricula', AlunoController.delete);
routes.put('/aluno/:matricula', AlunoController.update);

//Disciplina
routes.get('/disciplinas', DisciplinaController.getAll);
routes.post('/disciplina', DisciplinaController.create);
routes.delete('/disciplina/:codigoDisciplina', DisciplinaController.delete);
routes.put('/disciplina/:codigoDisciplina', DisciplinaController.update);

//Aluno-Disciplina
routes.get('/disciplinasDoAluno/:matriculaAluno', AlunoDisciplinaController.getStudentDisciplines);

export default routes;