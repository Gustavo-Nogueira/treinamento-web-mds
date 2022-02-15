const db = require('../../database')

class AlunoController {

  getAll(req, res) {
    db.query(`SELECT * FROM aluno`, (error, results) => {
      if (error) {
        res.status(400).json({error: error})
      }
      res.status(200).json(results.rows)
    })
  }

  create(req, res) {
    const { matricula, nome, dataNascimento, sexo, cpf } = req.body

    const queryText = `INSERT INTO aluno(matricula,nome,datanascimento,sexo,cpf) VALUES ($1,$2,$3,$4,$5) RETURNING *`
    const queryValues = [matricula, nome, dataNascimento, sexo, cpf];
    
    db.query(queryText, queryValues, (error, results) => {
      if (error) {
        res.status(400).json({error: error})
      }
      res.status(201).json({success: 'Aluno cadastrado com sucesso!'})
    })
  }
  
  update(req, res) {
    const { matricula } = req.params
    const { nome, dataNascimento, sexo, cpf } = req.body

    const queryText = `UPDATE aluno SET nome=$1, datanascimento=$2, sexo=$3, cpf=$4 WHERE matricula=$5`
    const queryValues = [nome, dataNascimento, sexo, cpf, matricula];
    
    db.query(queryText, queryValues, (error, results) => {
      if (error) {
        res.status(400).json({error: error})
      } else {
        res.status(200).json({success: 'Dados do aluno atualizados com sucesso!'})
      }
    })
  }

  delete(req, res) {
    const { matricula } = req.params

    const queryText = `DELETE FROM aluno WHERE matricula = $1`
    const queryValues = [matricula];
    
    db.query(queryText, queryValues, (error, results) => {
      if (error) {
        res.status(400).json({error: error})
      }
      res.status(200).json({success: 'Aluno deletado com sucesso!'})
    })
  }
}

export default new AlunoController();