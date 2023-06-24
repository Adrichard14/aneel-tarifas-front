
import { Table as CustomTable } from 'react-bootstrap';

export default function Table({ data }: any) {
  return (
    <>
      <CustomTable striped bordered hover className="my-4">
        <thead>
          <tr>
            <th>Classe</th>
            <th>Subclasse</th>
            <th>Consumo total</th>
            {/* Adicione mais cabeçalhos de coluna conforme necessário */}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any) => (
            <tr key={row.id}>
              <td>{row.fk_DscClasse}</td>
              <td>{row.fk_DDescSubClasse}</td>
              <td>{row.TotalConsumo}</td>
              {/* Adicione mais células de dados conforme necessário */}
            </tr>
          ))}
        </tbody>
      </CustomTable>
    </>
  )
}