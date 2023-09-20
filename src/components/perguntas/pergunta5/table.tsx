import { Table as CustomTable } from 'react-bootstrap';
import { Row, Col } from "react-bootstrap";

export default function Table({ data, isLoading }: any) {
  const { valores } = data;
  console.log(valores?.length);
  return (
    <>
      {valores?.length && (<>
        <CustomTable striped bordered hover className="my-4">
          <thead>
            <tr>
              <th>CNPJ distribuidora</th>
              <th>Valor tarifa de uso</th>
              {/* Adicione mais cabeçalhos de coluna conforme necessário */}
            </tr>
          </thead>
          <tbody>
            {valores?.map((row: any) => (
              <tr key={row.id}>
                <td>{row.numcnpjdistribuidora}</td>
                <td>{row.vlrtusd}</td>
                {/* Adicione mais células de dados conforme necessário */}
              </tr>
            ))}
          </tbody>
        </CustomTable></>)}
    </>
  )
}
