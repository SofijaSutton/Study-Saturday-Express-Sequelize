const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');


router.get('/', async (req, res, next) => {
    try {
      const tests = await Test.findAll()
      res.send(tests)
    } catch (error) {
      next(error)
    }
  })

router.get('/:id', async (req, res, next) => {
    try {
      let test = await Test.findByPk(req.params.id)
      if (test) {
        res.send(test)
      } else {
        res.status(404).send('Test not found')
      }
    } catch (error) {
      next(error)
    }
})  

router.post('/student/:studentId', async (req, res, next) => {
    //find student with re.params
    try {
      let student = await Student.findByPk(req.params.studentId)
    //create new test based on req.body
      let test = await Test.create(req.body)
          //associate studentId with created Test
     await test.setStudent(student)
        
      res.status(201).send(test)
    } catch (err) {
      next(err)
    }
  })

router.delete('/:id', async (req, res, next) => {
    try {
      await Test.destroy({ where: { id: req.params.id } })
      res.status(204).send('Test Destroyed')
    } catch (err) {
      next(err)
    }
})

module.exports = router;
