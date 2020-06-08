const path = require('path');
const fs = require('fs');

const Grade = require('../models/Grade');

module.exports = {
  create(req, res) {
    try {
      const { student, subject, type, value } = req.body;

      const data = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, '..', 'data', 'grades.json'))
      );

      const newGrade = new Grade(data.nextId, student, subject, type, value);

      const newData = {
        nextId: data.nextId + 1,
        grades: [...data.grades, newGrade],
      };

      fs.writeFile(
        path.resolve(__dirname, '..', 'data', 'grades.json'),
        JSON.stringify(newData),
        'utf8',
        (err) => {
          if (err) throw err;
        }
      );

      return res.status(201).json(newGrade);
    } catch (error) {
      console.log(error);
    }
  },

  update(req, res) {
    const { id } = req.params;
    const { student, subject, type, value } = req.body;

    const data = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '..', 'data', 'grades.json'))
    );

    const grade = data.grades.find((grade) => grade.id === +id);

    if (!grade) {
      return res.status(404).json({ error: 'Grade não encontrada' });
    }

    if (student) {
      grade.student = student;
    }

    if (subject) {
      grade.subject = subject;
    }
    if (type) {
      grade.type = type;
    }
    if (value) {
      grade.value = value;
    }

    fs.writeFile(
      path.resolve(__dirname, '..', 'data', 'grades.json'),
      JSON.stringify(data),
      'utf8',
      (err) => {
        if (err) throw err;
      }
    );

    return res.status(200).json(grade);
  },

  delete(req, res) {
    const { id } = req.params;

    const data = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '..', 'data', 'grades.json'))
    );

    const newGrades = data.grades.filter((grade) => grade.id !== +id);

    const newData = {
      nextId: data.nextId + 1,
      grades: newGrades,
    };

    fs.writeFile(
      path.resolve(__dirname, '..', 'data', 'grades.json'),
      JSON.stringify(newData),
      'utf8',
      (err) => {
        if (err) throw err;
      }
    );

    return res.json({ msg: 'Grade excluida com sucesso' });
  },
};
