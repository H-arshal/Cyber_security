import CaesarCipher from "./components/CaesarCipher";
import VigenereCipher from "./components/VigenereCipher";
import FrequencyAnalysis from "./components/FrequencyAnalysis";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header/>
      <h1>Classical Cipher Tool</h1>
      <CaesarCipher />
      <hr />
      <VigenereCipher />
      <hr />
      <FrequencyAnalysis />
    </div>
  );
}

export default App;
