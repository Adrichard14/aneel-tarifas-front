
import { Table as CustomTable } from 'react-bootstrap';

export default function Table({ data }: any) {
  return (
    <>
      <CustomTable striped bordered hover className="my-4">
        <thead>
          <tr>
            <th>Data</th>
            <th>Modalidade tarifaria</th>
            <th>Quantidade de registros</th>
            {/* Adicione mais cabeçalhos de coluna conforme necessário */}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any) => (
            <tr key={row.id}>
              <td>{row.datgeracaoconjuntodados}</td>
              <td>{row.dscmodalidadetarifaria}</td>
              <td>{row.quantidade_registros}</td>
              {/* Adicione mais células de dados conforme necessário */}
            </tr>
          ))}
        </tbody>
      </CustomTable>
    </>
  )
}