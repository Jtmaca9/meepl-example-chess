import React, { useState } from "react";
import { GameWrapper } from "meepl";
import { SocketIO } from "boardgame.io/multiplayer";
import styled from "styled-components/native";
import { TouchableOpacity, Text } from "react-native";

import Game from "./src/Game";
import ChessGame from "./src/gameConfig/gameConfig";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default function App() {
  const [player, setPlayer] = useState(null);
  return player ? (
    <GameWrapper
      gameConfig={ChessGame}
      gameView={Game}
      player={player}
      multiplayer={SocketIO({ server: "192.168.1.4:8000" })}
    />
  ) : (
    <Container>
      <TouchableOpacity onPress={() => setPlayer("0")}>
        <Text>Player 0</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setPlayer("1")}>
        <Text>Player 1</Text>
      </TouchableOpacity>
    </Container>
  );
}
