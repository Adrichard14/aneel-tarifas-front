
import { Table as CustomTable } from 'react-bootstrap';
import { Row, Col } from "react-bootstrap";

export default function Table({ data, isLoading }: any) {
  const { data_vigencia } = data;
  return (
    <>
      {data_vigencia ?.length && (<>
        <CustomTable striped bordered hover className="my-4">
          <thead>
            <tr>
              <th>CNPJ Distribuidora</th>
              <th>Data inicio da vigência</th>
              <th>Data Fim vigência</th>
              {/* Adicione mais cabeçalhos de coluna conforme necessário */}
            </tr>
          </thead>
          <tbody>
            {data_vigencia?.map((row: any) => (
              <tr key={row.id}>
                <td>{row.numcnpjdistribuidora}</td>
                <td>{row.datiniciovigencia}</td>
                <td>{row.datfimvigencia}</td>
                {/* Adicione mais células de dados conforme necessário */}
              </tr>
            ))}
          </tbody>
        </CustomTable></>)}
    </>
  )
}