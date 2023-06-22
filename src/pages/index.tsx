'use client'
import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import TabelaPergunta1 from '../components/pergunta1/table';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);


const IndexPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>("");

  const questions = [
    { id: 1, text: 'Pergunta 1' },
    { id: 2, text: 'Pergunta 2' },
    { id: 3, text: 'Pergunta 3' },
    { id: 4, text: 'Pergunta 4' },
    { id: 5, text: 'Pergunta 5' },
    // Adicione mais perguntas conforme necessário
  ];

  // dados mockados apenas para visualização
  const tableDataMock = [
    {
      id: 'Teste',
      subgrupo: 'A2',
    },
  ];

  const { data: tableData } = useSWR(
    selectedQuestion ? `/api/data/${selectedQuestion}` : null,
    fetcher
  );

  const handleQuestionChange = (event: any): void => {
    setSelectedQuestion(event.target.value);
  };

  const renderTable = (question: string): any => {
    switch (parseInt(question)) {
      case 1:
        return <TabelaPergunta1 data={tableDataMock} />
      case 2:
        return <TabelaPergunta1 data={tableDataMock} />
      default:
        return <div>Selecione uma pergunta para exibir os dados</div>
    }
  }

  return (

    <div>
      <h1 className="my-3">Escolha uma pergunta:</h1>
      <Form.Select aria-label="Selecione uma pergunta" value={selectedQuestion} onChange={handleQuestionChange}>
        <option value="">Selecione uma pergunta</option>
        {questions.map((question) => (
          <option key={question.id} value={question.id}>
            {question.text}
          </option>
        ))}
      </Form.Select>

      {selectedQuestion && tableDataMock.length > 0 ? (
        renderTable(selectedQuestion)
      ) : <div>Selecione uma pergunta para exibir os dados</div>}
    </div>
  );
};

export default IndexPage;