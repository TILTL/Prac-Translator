import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Select, Button, Card } from 'antd';

const { Title } = Typography;
const { Option } = Select;

function App() {
  // initialization
  const [joke, setJoke] = useState('');
  const [translatedJoke, setTranslatedJoke] = useState('');
  const [selectedLang, setSelectedLang] = useState('es');

  // get jokes from third party APIs
  const fetchJoke = async () => {
    try {
      const jokeDataResponse = await axios.get('https://v2.jokeapi.dev/joke/Any?format=json');
      setJoke(jokeDataResponse.data.setup ? jokeDataResponse.data.setup + " - " + jokeDataResponse.data.delivery : jokeDataResponse.data.joke);
    } catch (error) {
      console.error("Error fetching joke: ", error);
    }
  };

  // get translator from third party APIs
  const translateJoke = async () => {
    try {
      const transDataResponse = await axios.post('https://libretranslate.de/translate', {
        q: joke,
        source: 'en',
        target: selectedLang,
      });
      setTranslatedJoke(transDataResponse.data.translatedText);
    } catch (error) {
      console.error("Error translating joke: ", error);
    }
  };

  useEffect(() => { fetchJoke(); }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'space-between', padding: '40px', boxSizing: 'border-box' }}>
      <Card style={{ flex: 1, marginBottom: 40 }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2} style={{ marginBottom: 30 }}>Joke</Title>
          <p>{joke}</p>
        </div>
      </Card>

      {translatedJoke && (
        <Card>
          <div style={{ textAlign: 'center' }}>
            <Title level={2} style={{ marginBottom: 20 }}>Translated Solution</Title>
            <p>{translatedJoke}</p>
          </div>
        </Card>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ marginRight: '10px' }}>Translate To:</p>
          <Select defaultValue={selectedLang} style={{ width: 120, margin: '5px' }} onChange={(value) => setSelectedLang(value)}>
            <Option value="es">Spanish</Option>
            <Option value="fr">French</Option>
            <Option value="de">German</Option>
          </Select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <Button style={{ margin: '5px' }} onClick={fetchJoke}>More Jokes</Button>
        <Button style={{ margin: '5px' }} onClick={translateJoke}>Translate Joke</Button>
      </div>
    </div>
  );
}


export default App;