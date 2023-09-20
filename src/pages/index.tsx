"use client";
import { useState, useEffect } from "react";
import React from "react";
import useSWR, { Fetcher } from "swr";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import moment from "moment";
import TabelaPergunta1 from "../components/perguntas/pergunta1/table";
import TabelaPergunta2 from "../components/perguntas/pergunta2/table";
import TablePergunta3 from "../components/perguntas/pergunta3/table";
import TablePergunta4 from "../components/perguntas/pergunta4/table";
import TablePergunta5 from "../components/perguntas/pergunta5/table";
import TablePergunta6 from "../components/perguntas/pergunta6/table";
import TablePergunta7 from "../components/perguntas/pergunta7/table";
import TablePergunta8 from "../components/perguntas/pergunta8/table";
import TablePergunta9 from "../components/perguntas/pergunta9/table";
import TablePergunta10 from "../components/perguntas/pergunta10/table";
import DatePicker from "react-datepicker";
import { useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const IndexPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<any | string>("");
  const [searchQuestion, setSearchQuestion] = useState<any | string>("");
  const [tableData, setTableData] = useState<any | null>();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activePage, setActivePage] = useState(0);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  // Adicionar aqui novas questões que irão utilizar o filtro por data
  const questionsWithDateFilter = ["2"];
  const [showDateFilter, setShowDateFilter] = useState<boolean>(true);

  const questions = [
    {
      id: 1,
      text: "Quais são as distribuidoras de energia elétrica registradas no conjunto de dados?",
    },
    {
      id: 2,
      text: "Quais são as datas de início e fim da vigência das tarifas para cada distribuidora?",
    },
    {
      id: 3,
      text: "Quais são as classes de unidades consumidoras definidas na Resolução Normativa nº 1000/2021?",
    },
    {
      id: 4,
      text: "Quais são as modalidades tarifárias disponíveis e a quantidade de registros separados por data?",
    },
    {
      id: 5,
      text: "Qual é o valor da Tarifa de Uso do Sistema de Distribuição (TUSD) para cada distribuidora e quais são as distribuidoras que mais pagam o TUSD?",
    },
    {
      id: 6,
      text: "Quais são os postos tarifários definidos e a quantidade de tarifas registrada para cada um deles?",
    },
    {
      id: 7,
      text: "Quais são os subgrupos tarifários disponíveis e quais são os critérios de aplicação para cada um deles?",
    },
    {
      id: 8,
      text: "Quais são as unidades consumidoras que mais consumiram em períodos de 6 meses?",
    },
    {
      id: 9,
      text: "Quais são as resoluções homologatórias registradas e qual é o número e data de cada uma delas?",
    },
    {
      id: 10,
      text: "Quais são os agentes regulados pela ANEEL, mostrando também a quantidade tarifada por cada um aos consumidores?",
    },
  ];

  // adicionar as URL's para as respectivas perguntas
  const URLs: any = {
    "1": "empresas",
    "2": "tarifas/vigenciaempresas", // /2010-01-01/2011-12-12
    "3": "tarifas/descclasse",
    "4": "tarifas/modalidadesregistro",
    "5": "tarifas/valortarifapordistribuidora",
    "6": "tarifas/numtarifasporposto",
    "7": "subgrupos",
    "8": "tarifas/unidadesconsumidoras",
    "9": "tarifas/resolucoes",
    "10": "tarifas/agentestarifas",
  };
  // dados mockados apenas para visualização

  const loadData = async (page = null): Promise<void> => {
    if (!selectedQuestion) return;
    setIsLoading(true);
    setTableData([]);
    const extraParams = showDateFilter
      ? `/${moment(startDate).format("YYYY-MM-DD")}/${moment(endDate).format(
        "YYYY-MM-DD"
      )}`
      : "";
    const pageConfig = page ? `?page=${page}` : '';
    const userCredentials = localStorage.getItem("user");
    const { token, uid, client } = JSON.parse(userCredentials || "{}");
    let questionURL = `${apiURL}${URLs[selectedQuestion]}${extraParams}${pageConfig}`;
    try {
      const { data } = await axios.get(questionURL, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "access-token": token,
          uid,
          client,
        },
        withCredentials: false,
      });
      setTableData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleQuestionChange = async (event: any): Promise<void> => {
    setSelectedQuestion(event.target.value);
    questionsWithDateFilter.indexOf(event.target.value) === -1
      ? setShowDateFilter(false)
      : setShowDateFilter(true);
  };

  const handleSubmit = async (): Promise<void> => {
    await loadData();
  };

  const renderTable = (question: string): any => {
    switch (parseInt(question)) {
      case 1:
        return <TabelaPergunta1 data={tableData || []} loadData={loadData} isLoading={isLoading} />;
      case 2:
        return <TabelaPergunta2 data={tableData || []} loadData={loadData} isLoading={isLoading} />;
      case 3:
        return <TablePergunta3 data={tableData || []} />;
      case 4:
        return <TablePergunta4 data={tableData || []} />;
      case 5:
        return <TablePergunta5 data={tableData || []} loadData={loadData} isLoading={isLoading} />;
      case 6:
        return <TablePergunta6 data={tableData || []} />;
      case 7:
        return <TablePergunta7 data={tableData || []} />;
      case 8:
        return <TablePergunta8 data={tableData || []} />;
      case 9:
        return <TablePergunta9 data={tableData || []} loadData={loadData} isLoading={isLoading} />;
      case 10:
        return <TablePergunta10 data={tableData || []} loadData={loadData} isLoading={isLoading} />;
      default:
        return <div>Selecione uma pergunta para exibir os dados</div>;
    }
  };
  const handlePageClick = (event: any) => {
    console.log(event.selected);
    loadData(event.selected);
  };

  return (
    <>
      <Row className="justify-content-center align-items-center">
        <Col className="d-flex mt-4 flex-wrap flex-lg-row flex-column">
          <Col className="pe-2">
            <h4 className="mt-3">Escolha uma pergunta:</h4>
            <Form.Select
              aria-label="Selecione uma pergunta"
              value={selectedQuestion}
              onChange={handleQuestionChange}
            >
              <option value="">Selecione uma pergunta</option>
              {questions.map((question) => (
                <option key={question.id} value={question.id}>
                  {question.text}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col className="mt-3">
            <h4>
              Filtro por data:{" "}
              <button
                type="button"
                className="btn btn-link p-0"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Algumas perguntas não possuem filtro por data, nesses casos a seleção de data será bloqueada!"
              >
                ?
              </button>
            </h4>
            <Form.Group
              className="d-flex"
              controlId="exampleForm.ControlInput1"
            >
              <Col className="d-flex flex-column me-2">
                <DatePicker
                  className="form-control"
                  name="startDate"
                  disabled={!showDateFilter}
                  selected={startDate}
                  onChange={(date: any) => setStartDate(date)}
                />
                <Form.Label>Data de início</Form.Label>
              </Col>

              <Col className="d-flex flex-column">
                <DatePicker
                  className="form-control"
                  name="endDate"
                  disabled={!showDateFilter}
                  selected={endDate}
                  onChange={(date: any) => setEndDate(date)}
                />
                <Form.Label>Data final</Form.Label>
              </Col>
            </Form.Group>
            <Col className="d-flex justify-content-end">
              <button
                onClick={() => handleSubmit()}
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Carregando...
                  </>
                ) : (
                  "Buscar"
                )}
              </button>
            </Col>
          </Col>
        </Col>
      </Row>
      <Row>
        {selectedQuestion ? (
          <div className="d-flex pagination">
            <ReactPaginate
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              activeLinkClassName="active"
              breakLabel="..."
              nextLabel=">>"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={tableData?.total_pages || 0}
              previousLabel="<<"
              renderOnZeroPageCount={null}
            />
          </div>
        ) : (<Row className="d-flex justify-content-center">
          <Col>
            <h4 className="text-center">
              {isLoading
                ? "Carregando..."
                : "Selecione uma pergunta para exibir os dados e clique em Buscar"}
            </h4>
          </Col>
        </Row>)
        }

        {
          selectedQuestion && (
            renderTable(selectedQuestion))
        }
      </Row>
    </>
  );
};

export default IndexPage;
