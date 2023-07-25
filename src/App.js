import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Select, Button } from 'antd';

const { Title } = Typography;
const { Option } = Select;

function App() {
  const [joke, setJoke] = useState('');
  const [translatedJoke, setTranslatedJoke] = useState('');
  const [selectedLang, setSelectedLang] = useState('es');

  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://v2.jokeapi.dev/joke/Any?format=json');
      setJoke(response.data.setup ? response.data.setup + " - " + response.data.delivery : response.data.joke);
    } catch (error) {
      console.error("Error fetching joke: ", error);
    }
  };

  const translateJoke = async () => {
    try {
      const response = await axios.post('https://libretranslate.de/translate', {
        q: joke,
        source: 'en',
        target: selectedLang,
      });
      setTranslatedJoke(response.data.translatedText);
    } catch (error) {
      console.error("Error translating joke: ", error);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="App">
      <Title>Joke</Title>
      <p>{joke}</p>
      <Button onClick={fetchJoke}>Fetch another joke</Button>
      <Select defaultValue={selectedLang} style={{ width: 120 }} onChange={(value) => setSelectedLang(value)}>
        <Option value="es">Spanish</Option>
        <Option value="fr">French</Option>
        <Option value="de">German</Option>
        {/* Add more languages as needed */}
      </Select>
      <Button onClick={translateJoke}>Translate joke</Button>
      <Title>Translated Joke</Title>
      <p>{translatedJoke}</p>
    </div>
  );
}

export default App;
