import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Items from "../components/Items";
import SelectedList from "../components/SelectedList";
import ScenarioCheckbox from "../components/ScenarioCheckBox";
import BagSelector from "../components/BagSelector";
import CustomizedButton from "../components/Button";
import ResultDialog from "../components/resultDialog";
import background from "../assets/imagens/bg.png";
import { knapSack } from "../utils/knapsack";
import "./App.css";

function App() {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [bagCapacity, setBagCapacity] = React.useState(6);
  const [actualWeight, setActualWeight] = React.useState(0)
  const [choosedScenarios, setChoosedScenarios] = React.useState([])
  const [isFull, setIsFull] = React.useState(false)
  const [isOpenDialog, setIsOpenDialog] = React.useState(false)
  const [resultContent, setResultContent] = React.useState("")
  const [resultHeaderContent, setResultHeaderContent] = React.useState("")
  const [resultBottomContent, setResultBottomContent] = React.useState("Naisssss")

  const equals = (a, b) =>
    a.length === b.length &&
    a.every((v) => b.includes(v));

  const answerFormat = (items) => {
    console.log(items[0]);
    let answer = ""
    answer += items[0]
    for (let i = 1; i < items.length; i++)
      answer += ` ► ${items[i]}`
    return answer
  }

  const handleSubmitClick = () => {
    const result = knapSack(choosedScenarios, bagCapacity)
    setResultHeaderContent("")
    setResultBottomContent("")
    if (selectedItems.length === 0)
      setResultContent("Você ainda não preencheu a mochila da Hermione com nenhum item")
    else if (equals(result, selectedItems.map(el => el.name)))
      setResultContent("Parabéns, você preencheu a mochila da Hermione com os melhores itens possíveis!!")
    else {
      setResultContent("Infelizmente, você poderia ter preenchido a mochila da Hermione de uma maneira melhor")
      setResultHeaderContent(`Você preencheu com: ${answerFormat(selectedItems.map(el => el.name))}`)
      setResultBottomContent(`O melhor preenchimento possível seria: ${answerFormat(result)}`)
    }
    setIsOpenDialog(true)
  }

  return (
    <Box sx={{ flexGrow: 1, height: "auto", backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        alignItems="center"
        justify="center"
      >
        <Grid item xs sm md>
          <Box sx={{ height: "60vh" }}>
            <BagSelector capacity={bagCapacity} callback={(capacity) => setBagCapacity(capacity)} callbackWeight={(isFull) => { setIsFull(isFull) }} callbackItems={(selectedItems) => { setSelectedItems(selectedItems) }} />
          </Box>
          <Box sx={{ height: "30vh" }}>
            <ScenarioCheckbox callback={(scenariosArray) => { setChoosedScenarios(scenariosArray) }} />
          </Box>
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Box sx={{ height: "100vh" }}>
            <Items selectedItems={selectedItems} bagCapacity={bagCapacity} isFull={isFull} callbackWeight={(isFull) => { setIsFull(isFull) }} callbackActualWeight={(actualWeight) => {setActualWeight(actualWeight)}} callback={(selectedItems) => { setSelectedItems(selectedItems) }} />
            <ResultDialog result={resultContent} diffHeader={resultHeaderContent} diffBottom={resultBottomContent} openDialog={isOpenDialog} callbackOpenDialog={(value) => setIsOpenDialog(value)} />
          </Box>
        </Grid>
        <Grid item xs sm md>
          <Box m={5} sx={{ height: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
            <SelectedList selectedItems={selectedItems} actualWeight={actualWeight} />
            <CustomizedButton onClick={handleSubmitClick}>Resultado da melhor escolha</CustomizedButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;