
import { Table as CustomTable } from 'react-bootstrap';
import { Row, Col } from "react-bootstrap";

export default function Table({ data, isLoading }: any) {
  const { agentes } = data;
  return (
    <>
      {agentes?.length && (<>
        <CustomTable striped bordered hover className="my-4">
          <thead>
            <tr>
              <th>Agentes regulados</th>
              <th>Quantidade de tarifas</th>
              {/* Adicione mais cabeçalhos de coluna conforme necessário */}
            </tr>
          </thead>
          <tbody>
            {agentes?.map((row: any) => (
              <tr key={row.id}>
                <td>{row.sigagente}</td>
                <td>{row.quantidadetarifas}</td>
                {/* Adicione mais células de dados conforme necessário */}
              </tr>
            ))}
          </tbody>
        </CustomTable></>)}
    </>
  )
}