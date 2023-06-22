
import { useState } from "react";

export default function formEscolha() {
    const [escolha, setEscolha] = useState('a');
      return (
        <div>
          <select 
            value={escolha}
            onChange={(e) =>{
              setEscolha(e.target.value);
            }}
          >
            <option value="a">pergunta 1</option>
            <option value="b">pergunta 2</option>
            <option value="c">pergunta 3</option>
            <option value="d">pergunta 4</option>
          </select>
        </div>
      );
}