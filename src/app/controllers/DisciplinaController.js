const db = require('../../database')

class DisciplinaController {
  getAll(req, res) {
    db.query(`SELECT * FROM disciplina`, (error, results) => {
      if (error) {
        res.status(400).json({error: error})
      }
      res.status(200).json(results.rows)
    })
  }

  create(req, res) {
    const { codigoDisciplina, nome, cargaHoraria, periodo } = req.body

    const queryText = `INSERT INTO disciplina(codigodisciplina,nome,cargahoraria,periodo) VALUES ($1,$2,$3,$4) RETURNING *`
    const queryValues = [codigoDisciplina, nome, cargaHoraria, periodo];
    
    db.query(queryText, queryValues, (error, results) => {
      if (error) {
        res.status(400).json({error: error})
      }
      res.status(201).json({success: 'Disciplina cadastrada com sucesso!'})
    })
  }
  
  update(req, res) {
    const { codigoDisciplina } = req.params
    const { nome, cargaHoraria, periodo} = req.body

    const queryText = `UPDATE disciplina SET nome=$1, cargahoraria=$2, periodo=$3 WHERE codigodisciplina=$4`
    const queryValues = [nome, cargaHoraria, periodo, codigoDisciplina];
    
    db.query(queryText, queryValues, (error, results) => {
      if (error) {
        res.status(400).json({error: error})
      } else {
        res.status(200).json({success: 'Dados da disciplina atualizados com sucesso!'})
      }
    })
  }

  delete(req, res) {
    const { codigoDisciplina } = req.params

    const queryText = `DELETE FROM disciplina WHERE codigodisciplina = $1`
    const queryValues = [codigoDisciplina];
    
    db.query(queryText, queryValues, (error, results) => {
      if (error) {
        res.status(400).json({error: error})
      }
      res.status(200).json({success: 'Disciplina deletada com sucesso!'})
    })
  }
}

export default new DisciplinaController();