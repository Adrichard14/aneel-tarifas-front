
import { Table as CustomTable } from 'react-bootstrap';
import { Row, Col } from "react-bootstrap";

export default function Table({ data, isLoading }: any) {
  const { resolucoes } = data;
  return (
    <>
      {resolucoes?.length && (<>
        <CustomTable striped bordered hover className="my-4">
          <thead>
            <tr>
              <th>Resolução homologatória</th>
              {/* Adicione mais cabeçalhos de coluna conforme necessário */}
            </tr>
          </thead>
          <tbody>
            {resolucoes?.map((row: any) => (
              <tr key={row.id}>
                <td>{row.dscresolucaohomologatoria}</td>
                {/* Adicione mais células de dados conforme necessário */}
              </tr>
            ))}
          </tbody>
        </CustomTable></>)}
    </>
  )
}
