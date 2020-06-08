const path = require('path');
const fs = require('fs');

module.exports = {
  create(req, res) {
    try {
      const { student, subject, type, value } = req.body;

      const data = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, '..', 'data', 'grades.json'))
      );

      const newGrade = {
        id: data.nextId,
        student,
        subject,
        type,
        value,
        timestamp: new Date(),
      };

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
};
