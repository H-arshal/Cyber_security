import CaesarCipher from "./components/CaesarCipher";
import VigenereCipher from "./components/VigenereCipher";
import FrequencyAnalysis from "./components/FrequencyAnalysis";
import Header from "./components/Header";
import MonoalphabeticCipherTool from "./components/MonoalphabeticCipherTool";
import HomophonicSubstitutionCipherTool from "./components/HomophonicSubstitutionCipherTool";
import PlayfairCipherTool from "./components/PlayfairCipherTool.jsx";
import HillCipherTool from "./components/HillCipherTool.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <h1>Classical Cipher Tool</h1>

      <div id="caesar">
        <CaesarCipher />
      </div>

      <hr />

      <div id="vigenere">
        <VigenereCipher />
      </div>

      <hr />

      <div id="frequency">
        <FrequencyAnalysis />
      </div>

      <hr />

      <div id="mono">
        <MonoalphabeticCipherTool />
      </div>

      <hr />

      <div id="homo">
        <HomophonicSubstitutionCipherTool />
      </div>

      <hr />

      <div id="playfair">
        <PlayfairCipherTool />
      </div>

      <hr />

      <div id="hill">
        <HillCipherTool />
      </div>
      <Footer/>
    </div>
  );
}

export default App;
