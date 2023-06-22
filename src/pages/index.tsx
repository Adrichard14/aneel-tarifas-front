'use client'
import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const IndexPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState('');

  const questions = [
    { id: 1, text: 'Pergunta 1' },
    { id: 2, text: 'Pergunta 2' },
    { id: 3, text: 'Pergunta 3' },
    { id: 4, text: 'Pergunta 4' },
    { id: 5, text: 'Pergunta 5' },
    // Adicione mais perguntas conforme necessário
  ];

  const { data: tableData } = useSWR(
    selectedQuestion ? `/api/data/${selectedQuestion}` : null,
    fetcher
  );

  const handleQuestionChange = (event) => {
    setSelectedQuestion(event.target.value);
  };

  return (

    <div>
      <h1>Escolha uma pergunta:</h1>
      <Form.Select aria-label="Selecione uma pergunta" value={selectedQuestion} onChange={handleQuestionChange}>
        <option value="">Selecione uma pergunta</option>
        {questions.map((question) => (
          <option key={question.id} value={question.id}>
            {question.text}
          </option>
        ))}
      </Form.Select>


      {selectedQuestion && tableData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Coluna 1</th>
              <th>Coluna 2</th>
              {/* Adicione mais cabeçalhos de coluna conforme necessário */}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td>{row.column1}</td>
                <td>{row.column2}</td>
                {/* Adicione mais células de dados conforme necessário */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Selecione uma pergunta para exibir os dados</div>
      )}
    </div>
  );
};

export default IndexPage;