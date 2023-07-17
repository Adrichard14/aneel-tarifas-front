import TabelaPergunta1 from '../components/perguntas/pergunta1/table'
import TabelaPergunta2 from '../components/perguntas/pergunta2/table'
import TabelaPergunta3 from '../components/perguntas/pergunta3/table'
import TabelaPergunta4 from '../components/perguntas/pergunta4/table'
import TabelaPergunta5 from '../components/perguntas/pergunta5/table'
import TabelaPergunta6 from '../components/perguntas/pergunta6/table'
import TabelaPergunta7 from '../components/perguntas/pergunta7/table'
import TabelaPergunta8 from '../components/perguntas/pergunta8/table'
import TabelaPergunta9 from '../components/perguntas/pergunta9/table'
import TabelaPergunta10 from '../components/perguntas/pergunta10/table'

const useRenderTable = (question: string, tableData: Array<JSX.Element>): any => {
  if (tableData.length > 0) {
    switch (parseInt(question)) {
      case 1:
        return <TabelaPergunta1 data={tableData} />
      case 2:
        return <TabelaPergunta2 data={tableData} />
      case 3:
        return <TabelaPergunta3 data={tableData} />
      case 4:
        return <TabelaPergunta4 data={tableData} />
      case 5:
        return <TabelaPergunta5 data={tableData} />
      case 6:
        return <TabelaPergunta6 data={tableData} />
      case 7:
        return <TabelaPergunta7 data={tableData} />
      case 8:
        return <TabelaPergunta8 data={tableData} />
      case 9:
        return <TabelaPergunta9 data={tableData} />
      case 10:
        return <TabelaPergunta10 data={tableData} />
      default:
        return <div>Selecione uma pergunta para exibir os dados</div>
    }
  }
  return <div>Selecione uma pergunta para exibir os dados</div>
}
export default useRenderTable;