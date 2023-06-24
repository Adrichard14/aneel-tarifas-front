
import { Table as CustomTable } from 'react-bootstrap';

export default function Table({ data }: any) {
  return (
    <>
      <CustomTable striped bordered hover className="my-4">
        <thead>
          <tr>
            <th>CNPJ distribuidora</th>
            <th>Valor tarifa de uso</th>
            {/* Adicione mais cabeçalhos de coluna conforme necessário */}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any) => (
            <tr key={row.id}>
              <td>{row.fk_numcnpjdistribuidora}</td>
              <td>{row.valor_tusd}</td>
              {/* Adicione mais células de dados conforme necessário */}
            </tr>
          ))}
        </tbody>
      </CustomTable>
    </>
  )
}