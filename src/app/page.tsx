'use client'
import { useState } from 'react';

const IndexPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const questions = [
    { id: 1, text: 'Pergunta 1' },
    { id: 2, text: 'Pergunta 2' },
    { id: 3, text: 'Pergunta 3' },
    // Adicione mais perguntas conforme necessário
  ];

  const tableData = [
    { id: 1, column1: 'Valor 1', column2: 'Valor 2' },
    { id: 2, column1: 'Valor 3', column2: 'Valor 4' },
    // Adicione mais linhas de dados conforme necessário
  ];

  const handleQuestionChange = (event) => {
    setSelectedQuestion(event.target.value);
  };

  return (
    <div>
      <h1>Escolha uma pergunta:</h1>
      <select value={selectedQuestion} onChange={handleQuestionChange}>
        <option value="">Selecione uma pergunta</option>
        {questions.map((question) => (
          <option key={question.id} value={question.id}>
            {question.text}
          </option>
        ))}
      </select>

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