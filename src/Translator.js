import React, { useEffect, useState } from 'react';
import { Typography, Select, Button, Card, Row, Col, Space, Input, Form } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

function Translator() {

  // initialization
  const [joke, setJoke] = useState('');
  const [solution, setSolution] = useState('');
  const [selectedLang, setSelectedLang] = useState('es');
  const [userJoke, setUserJoke] = useState('');

  // get jokes from third party APIs
  const getJoke = async () => {
    try {
      const jokeDataResponse = await axios.get('https://v2.jokeapi.dev/joke/Any?format=json');
      setJoke(jokeDataResponse.data.setup ? jokeDataResponse.data.setup + " - " + jokeDataResponse.data.delivery : jokeDataResponse.data.joke);
    } catch (error) {
      console.error("Cannot get jokes: ", error);
    }
  };

  // get translator from third party APIs
  const getSolution = async () => {
    try {
        const transDataResponse = await axios.post('https://libretranslate.de/translate', {
        q: joke,
        source: 'en',
        target: selectedLang,
      });
      setSolution(transDataResponse.data.translatedText);
    } catch (error) {
      console.error("Translation error: ", error);
    }
  };

  // customize a joke
  const jokeSubmittion = () => {
    setJoke(userJoke);
    setUserJoke('');
  };

  useEffect(() => { getJoke(); }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '40px' }}>
      {/* Title */}
      <Title level={1} style={{ textAlign: 'center', marginBottom: 30 }}>Super-Translator</Title>

      {/* Translation Part */}
      <Row gutter={[16, 16]} style={{ flex: '1', overflow: 'auto' }}>
        {/* Original Language Version */}
        <Col span={12}>
          <Card title={<Title level={2}>Joke</Title>} bordered>
            <div style={{ height: 'calc(80vh - 400px)', overflow: 'auto', whiteSpace: 'pre-line' }}>{joke}</div>
          </Card>
        </Col>
        {/* Target Language Version */}
        <Col span={12}>
          <Card title={<Title level={2}>Translated Joke</Title>} bordered>
            <div style={{ height: 'calc(80vh - 400px)', overflow: 'auto', whiteSpace: 'pre-line' }}>{solution}</div>
          </Card>
        </Col>
      </Row>

      {/* Button Part */}
      <footer style={{ textAlign: 'center', padding: '90px 0' }}>
        {/* Submitting Part */}
        <Form onFinish={jokeSubmittion}>
          <Space style={{ marginBottom: '20px' }}>
            <TextArea placeholder="Write your joke here" value={userJoke} onChange={e => setUserJoke(e.target.value)} />
            <Button type="primary" htmlType="submit">Submit Your Joke</Button>
          </Space>
        </Form>
        {/* Selecting Part */}
        <Space size="large">
          <p>Translate To:</p>
          <Select defaultValue={selectedLang} style={{ width: 120 }} onChange={(value) => setSelectedLang(value)}>
            <Option value="cs">Czech</Option>
            <Option value="de">German</Option>
            <Option value="es">Spanish</Option>
            <Option value="fr">French</Option>
            <Option value="pt">Portuguese</Option>
          </Select>

          {/* Fetching & Translating */}
          <Button type="primary" onClick={getJoke}>More Jokes</Button>
          <Button type="primary" onClick={getSolution}>Translate Joke</Button>
        </Space>
      </footer>
    </div>
  );
}

export default Translator;
