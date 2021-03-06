import * as React from "react";
import Box from "@mui/material/Box";
import { COLORS } from "../assets/consts/colors";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import CustomizedButton from "./Button";
import backpack from "../assets/imagens/mochila.png";

export default function BagSelector(props) {

  const handleCapacityClick = (newCapacity) => {
    props.callback(newCapacity);
    props.callbackWeight(false)
    props.callbackItems([])
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "space-between",
        marginLeft: "10%"
      }}
    >
      <Typography
        sx={{ fontSize: 18 }}
        color={COLORS.defaultColor}
        variant="h4"
        textAlign={"center"}
        margin={"5%"}
      >
        Selecione o peso suportado pela bolsa da Hermione Granger
      </Typography>
      <img src={backpack} alt="backpack" width={"50%"} height={"50%"} max-width={"260px"} />
      <Stack spacing={5} direction="row" sx={{ margin: "5%" }}>
        <CustomizedButton
          onClick={() => handleCapacityClick(6)}
          selected={props.capacity === 6}
        >
          6kg
        </CustomizedButton>
        <CustomizedButton
          onClick={() => handleCapacityClick(8)}
          selected={props.capacity === 8}
        >
          8kg
        </CustomizedButton>
        <CustomizedButton
          onClick={() => handleCapacityClick(10)}
          selected={props.capacity === 10}
        >
          10kg
        </CustomizedButton>
      </Stack>
    </Box>
  );
}
