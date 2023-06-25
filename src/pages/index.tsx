'use client'
import { useState, useEffect } from 'react';
import useSWR, { Fetcher } from 'swr';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import TabelaPergunta1 from '../components/perguntas/pergunta1/table';
import TabelaPergunta2 from '../components/perguntas/pergunta2/table';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const fetcher: Fetcher<any, string> = (url: string) => axios.get(url).then((res) => res.data);
const apiURL = process.env.NEXT_PUBLIC_API_URL;

const IndexPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<any | string>("");
  const [tableData, setTableData] = useState<any | null>([]);
  const [startDate, setStartDate] = useState(new Date());

  const questions = [
    { id: 1, text: 'Quais são as distribuidoras de energia elétrica registradas no conjunto de dados?' },
    { id: 2, text: 'Quais são as datas de início e fim da vigência das tarifas para cada distribuidora?' },
    { id: 3, text: 'Quais são as classes de unidades consumidoras definidas na Resolução Normativa nº 1000/2021?' },
    { id: 4, text: 'Quais são as modalidades tarifárias disponíveis e a quantidade de registros separados por data?' },
    { id: 5, text: 'Qual é o valor da Tarifa de Uso do Sistema de Distribuição (TUSD) para cada distribuidora e quais são as distribuidoras que mais pagam o TUSD?' },
    { id: 6, text: 'Quais são os postos tarifários definidos e a quantidade de tarifas registrada para cada um deles?' },
    { id: 7, text: 'Quais são os subgrupos tarifários disponíveis e quais são os critérios de aplicação para cada um deles?' },
    { id: 8, text: 'Quais são as unidades consumidoras que mais consumiram em períodos de 6 meses?' },
    { id: 9, text: 'Quais são as resoluções homologatórias registradas e qual é o número e data de cada uma delas?' },
    { id: 10, text: 'Quais são os agentes regulados pela ANEEL, mostrando também a quantidade tarifada por cada um aos consumidores?' },
    // Adicione mais perguntas conforme necessário
  ];

  // adicionar as URL's para as respectivas perguntas
  const URLs: any = {
    '1': "empresas",
    '2': "tarifas/vigenciaempresas/2010-01-01/2011-12-12",
    '3': "tarifas/descclasse"
  };
  // dados mockados apenas para visualização
  const tableDataMock = [
    {
      id: 'Teste',
      fk_numcnpjdistribuidora: '000000000000000',
    },
  ];

  useEffect(() => {
    if (!selectedQuestion)
      return;
    const loadData = async () => {
      console.log(selectedQuestion);
      const { data } = await axios.get(`${apiURL}${URLs[selectedQuestion]}`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: false,
      });

      setTableData(data);

    }
    loadData();
  }, [selectedQuestion]);

  const handleQuestionChange = async (event: any): Promise<void> => {
    setSelectedQuestion(event.target.value);
  };

  const renderTable = (question: string): any => {
    switch (parseInt(question)) {
      case 1:
        return <TabelaPergunta1 data={tableData} />
      case 2:
        return <TabelaPergunta2 data={tableData} />
      default:
        return <div>Selecione uma pergunta para exibir os dados</div>
    }
  }
  // const [value, onChange] = useState(new Date());
  return (
    <>
      <Row className="justify-content-center align-items-center">
        <Col className="d-flex mt-4">
          <Col>
            <h4>Escolha uma pergunta:</h4>
            <Form.Select aria-label="Selecione uma pergunta" value={selectedQuestion} onChange={handleQuestionChange}>
              <option value="">Selecione uma pergunta</option>
              {questions.map((question) => (
                <option key={question.id} value={question.id}>
                  {question.text}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <h4 className="mx-2">Filtro por data: </h4>
            <Form.Group className="mb-3 d-flex" controlId="exampleForm.ControlInput1">
              <Col className="d-flex flex-column mx-2">
                <DatePicker className="form-control" name="initDate" selected={startDate} onChange={(date: any) => setStartDate(date)} />
                <Form.Label>Data de início</Form.Label>
              </Col>

              <Col className="d-flex flex-column mx-2">
                <DatePicker className="form-control" name="initDate" selected={startDate} onChange={(date: any) => setStartDate(date)} />
                <Form.Label>Data final</Form.Label>
              </Col>
            </Form.Group>
          </Col>
        </Col>
        {/* <Col>
          <label>Data de início</label>
          <DatePicker selected={startDate} onChange={(date: any) => setStartDate(date)} />
        </Col> */}
      </Row>
      <Row>
        {selectedQuestion && tableData.length > 0 ? (
          renderTable(selectedQuestion)
        ) :
          <Row className="d-flex justify-content-center">
            <Col>
              <h4 className="text-center">Selecione uma pergunta para exibir os dados</h4>
            </Col>
          </Row>}
      </Row>
    </>
  );
};

export default IndexPage;