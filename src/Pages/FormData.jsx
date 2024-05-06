import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFormData,
  createCategory,
  createAnswer,
  createQuestion,
  updateAnswer,
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
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState({ text: '', price: '' });

  useEffect(() => {
    dispatch(getFormData());
  }, [dispatch]);

  const handleDelete = (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };
  const handleDeleteQuestion = (categoryId, questionId) => {
    dispatch(deleteQuestion({ categoryId, questionId }));
  };
  const handleDeleteAnswer = (answerId) => {
    dispatch(deleteAnswer(answerId));
  };
  const handleEdit = (categoryId) => {
    dispatch(updateCategory({ categoryId, payload: { name: 'eqwe' } }));
  };

  const handleCreate = () => {
    if (newCategoryName) {
      dispatch(createCategory({ name: newCategoryName }));
      setNewCategoryName('');
    }
  };
  const handleAddQuestion = (categoryId) => {
    if (newQuestion) {
      dispatch(
        createQuestion({ payload: { question: newQuestion }, categoryId })
      );
      setNewQuestion('');
    }
  };
  const handleAddAnswer = (categoryId, questionId) => {
    if (newAnswer) {
      dispatch(
        createAnswer({
          payload: {
            answer: newAnswer?.text,
            price: parseInt(newAnswer?.price),
          },
          categoryId,
          questionId,
        })
      );
      setNewAnswer({ text: '', price: '' });
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: '800px', margin: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Form Data Management
      </Typography>
      <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        <Stack direction="row" sx={{ mb: 2 }} spacing={1}>
          <TextField
            label="New Category"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            variant="outlined"
            fullWidth
            size="small"
            sx={{ mr: 1 }}
          />
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleCreate}
          >
            Add
          </Button>
        </Stack>
        {/* Add new answer */}

        <List>
          {formData.map((category) => (
            <Accordion key={category.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{category.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TextField
                    label="Edit Category Name"
                    defaultValue={category.name}
                    variant="outlined"
                    fullWidth
                    sx={{ mr: 1 }}
                  />
                  <Button
                    onClick={() => handleEdit(category.id)}
                    variant="contained"
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </Button>
                </Box>
                <Stack direction="row" sx={{ mb: 2 }} spacing={1}>
                  <TextField
                    label="New Question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Button
                    size="small"
                    onClick={() => handleAddQuestion(category.id)}
                    variant="contained"
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    Add
                  </Button>
                </Stack>

                {category?.questions?.map((question) => (
                  <Accordion key={question.id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {/* Question Display */}
                      <Typography>{question.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack direction="row" sx={{ mb: 2 }} spacing={1}>
                        <TextField
                          label="New Answer"
                          value={newAnswer.text}
                          onChange={(e) =>
                            setNewAnswer((prev) => ({
                              ...prev,
                              text: e.target.value,
                            }))
                          }
                          variant="outlined"
                          fullWidth
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <TextField
                          label="Price"
                          size="small"
                          value={newAnswer.price}
                          onChange={(e) =>
                            setNewAnswer((prev) => ({
                              ...prev,
                              price: e.target.value,
                            }))
                          }
                          variant="outlined"
                          fullWidth
                          sx={{ mr: 1 }}
                        />
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleAddAnswer(category.id, question.id)
                          }
                          sx={{ mr: 1 }}
                        >
                          Add
                        </Button>
                      </Stack>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                      >
                        <TextField
                          label="Edit Question"
                          defaultValue={question.question}
                          variant="outlined"
                          fullWidth
                          sx={{ mr: 1 }}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() =>
                            handleDeleteQuestion(category.id, question.id)
                          }
                          color="error"
                        >
                          Delete
                        </Button>
                      </Box>
                      <Stack direction={'column'} gap={2}>
                        {question?.answers?.map((answer) => (
                          <Stack direction={'row'} gap={2} key={answer.id}>
                            {/* Answer Display and Edit UI */}

                            <TextField
                              label="Edit Answer"
                              size="small"
                              defaultValue={answer.answer}
                              variant="outlined"
                            />
                            <TextField
                              label="Edit Price"
                              size="small"
                              defaultValue={answer.price}
                              variant="outlined"
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              sx={{ mr: 1 }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              color="error"
                              onClick={() => handleDeleteAnswer(answer.id)}
                            >
                              Delete
                            </Button>
                          </Stack>
                        ))}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
      </Stack>
    </Paper>
  );
}

export default FormData;
