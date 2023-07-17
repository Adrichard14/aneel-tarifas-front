'use client'
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import useTableData from '../hooks/useTableData';
import useRenderTable from '../hooks/useRenderTable';
import questions from '../utils/questions';
import "react-datepicker/dist/react-datepicker.css";
import { Question } from '../types/question';

const IndexPage = () => {
  const { tableData, isLoading, handleQuestionChange, showDateFilter, loadData, selectedQuestion, startDate, setStartDate, setEndDate, endDate } = useTableData();

  const handleSubmit = async (): Promise<void> => {
    await loadData();
  }

  const renderTable = (question: string): any => {
    return useRenderTable(question, tableData);
  }
  return (
    <>
      <Row className="justify-content-center align-items-center">
        <Col className="d-flex mt-4 flex-wrap flex-lg-row flex-column">
          <Col className="pe-2" >
            <h4 className="mt-3">Escolha uma pergunta:</h4>
            <Form.Select aria-label="Selecione uma pergunta" value={selectedQuestion} onChange={handleQuestionChange}>
              <option value="">Selecione uma pergunta</option>
              {questions.map((question: Question) => (
                <option key={question.id} value={question.id}>
                  {question.text}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col className="mt-3">
            <h4>Filtro por data: <button type="button" className="btn btn-link p-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Algumas perguntas não possuem filtro por data, nesses casos a seleção de data será bloqueada!">
              ?
            </button></h4>
            <Form.Group className="d-flex" controlId="exampleForm.ControlInput1">
              <Col className="d-flex flex-column me-2">
                <DatePicker className="form-control" name="startDate" disabled={!showDateFilter} selected={startDate} onChange={(date: any) => setStartDate(date)} />
                <Form.Label>Data de início</Form.Label>
              </Col>

              <Col className="d-flex flex-column">
                <DatePicker className="form-control" name="endDate" disabled={!showDateFilter} selected={endDate} onChange={(date: any) => setEndDate(date)} />
                <Form.Label>Data final</Form.Label>
              </Col>
            </Form.Group>
            <Col className="d-flex justify-content-end">
              <button onClick={() => handleSubmit()} disabled={isLoading} className="btn btn-primary">
                {isLoading ? <>
                  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  Carregando...
                </> : 'Buscar'}
              </button>
            </Col>
          </Col>
        </Col>
      </Row>
      <Row>
        {selectedQuestion && tableData.length > 0 && !isLoading ? (
          renderTable(selectedQuestion)
        ) :
          <Row className="d-flex justify-content-center">
            <Col>
              <h4 className="text-center">{isLoading ? 'Carregando...' : 'Selecione uma pergunta para exibir os dados'}</h4>
            </Col>
          </Row>}
      </Row>
    </>
  );
};

export default IndexPage;
