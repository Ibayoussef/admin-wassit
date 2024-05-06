import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFormData,
  createCategory,
  createQuestion,
  createAnswer,
  updateQuestion,
  deleteCategory,
  deleteAnswer,
  deleteQuestion,
  updateCategory,
} from '../store/slices/questionsSlice';
import {
  Box,
  Button,
  List,
  Stack,
  Paper,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FormData() {
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.formdata);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newQuestion, setNewQuestion] = useState({ text: '', categoryId: '' });
  const [newAnswer, setNewAnswer] = useState({ text: '', price: '', questionId: '' });

  useEffect(() => {
    dispatch(getFormData());
  }, [dispatch]);

  const handleCreateCategory = () => {
    dispatch(createCategory({ name: newCategoryName }));
    setNewCategoryName('');
  };

  const handleCreateQuestion = (categoryId) => {
    dispatch(createQuestion({
      categoryId: categoryId,
      question: newQuestion.text,
      ar: newQuestion.ar,
      fr: newQuestion.fr
    }));
    setNewQuestion({ text: '', categoryId: '' });
  };

  const handleCreateAnswer = (questionId) => {
    dispatch(createAnswer({
      questionId: questionId,
      answer: newAnswer.text,
      price: newAnswer.price,
      ar: newAnswer.ar,
      fr: newAnswer.fr
    }));
    setNewAnswer({ text: '', price: '', questionId: '' });
  };

  const renderQuestions = (questions) => questions.map(question => (
    <Accordion key={question.id}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{question.fr} / {question.ar}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {question.answers.map(answer => (
          <Typography key={answer.id}>
            {answer.fr} / {answer.ar} - {answer.price}dhs
          </Typography>
        ))}
        <Button color="primary" onClick={() => handleCreateAnswer(question.id)}>
          Add Answer
        </Button>
      </AccordionDetails>
    </Accordion>
  ));

  return (
    <Paper elevation={3} sx={{ maxWidth: '800px', margin: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Form Data Management
      </Typography>
      <TextField
        label="New Category Name"
        value={newCategoryName}
        onChange={e => setNewCategoryName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleCreateCategory} color="primary">
        Create Category
      </Button>
      <List>
        {formData.map(category => (
          <Accordion key={category.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{category.fr} / {category.ar}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {renderQuestions(category.questions)}
              <TextField
                label="New Question"
                value={newQuestion.text}
                onChange={e => setNewQuestion({ ...newQuestion, text: e.target.value, categoryId: category.id })}
                fullWidth
                margin="normal"
              />
              <Button onClick={() => handleCreateQuestion(category.id)} color="primary">
                Add Question
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Paper>
  );
}

export default FormData;
