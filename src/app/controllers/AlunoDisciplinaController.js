const db = require('../../database')

class AlunoDisciplinaController {
  getStudentDisciplines (req, res) {
    const { matriculaAluno } = req.params

    const queryText = `SELECT * FROM aluno_disciplina WHERE matricula_aluno = $1`
    const queryValues = [matriculaAluno];

    db.query(queryText, queryValues, (error, results) => {
      if (error) {
        res.status(400).json({error: error})
      }
      res.status(200).json(results.rows)
    })
  }
 }

export default new AlunoDisciplinaController();