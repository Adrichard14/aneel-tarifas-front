import { useState } from "react";
import axios from 'axios';
import moment from 'moment';
import URLS from "@/utils/URLS";

const apiURL = process.env.NEXT_PUBLIC_API_URL;
// adicionar as URL's para as respectivas perguntas


const useTableData = () => {
  const [showDateFilter, setShowDateFilter] = useState<boolean>(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tableData, setTableData] = useState<any | null>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<any | string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const questionsWithDateFilter = ['2'];

  const loadData = async (): Promise<void> => {
    if (!selectedQuestion)
      return;
    setIsLoading(true);
    setTableData([]);
    const extraParams = showDateFilter ? `/${moment(startDate).format('YYYY-MM-DD')}/${moment(endDate).format('YYYY-MM-DD')}` : '';
    let questionURL = `${apiURL}${URLS[selectedQuestion]}${extraParams}`;
    try {
      const { data } = await axios.get(questionURL, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: false,
      });
      setTableData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  const handleQuestionChange = async (event: any): Promise<void> => {
    setSelectedQuestion(event.target.value);
    questionsWithDateFilter.indexOf(event.target.value) === -1 ? setShowDateFilter(false) : setShowDateFilter(true);
  };
  return { tableData, isLoading, handleQuestionChange, showDateFilter, loadData, selectedQuestion, setSelectedQuestion, startDate, setStartDate, setEndDate, endDate };
}

export default useTableData;