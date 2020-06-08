class Grade {
  constructor(id, student, subject, type, value) {
    {
      this.id = id;
      this.student = student;
      this.subject = subject;
      this.type = type;
      this.value = value;
      this.timestamp = new Date();
    }
  }
}
module.exports = Grade;
