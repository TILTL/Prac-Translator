import React, { useEffect, useState } from 'react';
import { Typography, Select, Button, Card, Row, Col, Space, Input, Form } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

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

  // submit a joke
  const handleUserJokeSubmit = () => {
    setJoke(userJoke);
    setUserJoke('');
  };

  useEffect(() => { getJoke(); }, []);

  return (
    <Row gutter={[16, 16]} style={{ padding: '40px' }}>
      <Col span={12}>
        <Card title={<Title level={2}>Joke</Title>} bordered>
          <p>{joke}</p>
          <Form onFinish={handleUserJokeSubmit}>
            <Space>
              <Input placeholder="Write your joke here" value={userJoke} onChange={e => setUserJoke(e.target.value)} />
              <Button type="primary" htmlType="submit">Submit Your Joke</Button>
            </Space>
          </Form>
        </Card>
      </Col>
      <Col span={12}>
        {solution && (
          <Card title={<Title level={2}>Translated Joke</Title>} bordered>
            <p>{solution}</p>
          </Card>
        )}
      </Col>

      <Col span={24}>
        <Space style={{ display: 'flex', justifyContent: 'center' }} size="large">
          <p>Translate To:</p>
          <Select defaultValue={selectedLang} style={{ width: 120 }} onChange={(value) => setSelectedLang(value)}>
            <Option value="es">Spanish</Option>
            <Option value="fr">French</Option>
            <Option value="de">German</Option>
          </Select>

          <Button type="primary" onClick={getJoke}>More Jokes</Button>
          <Button type="primary" onClick={getSolution}>Translate Joke</Button>
        </Space>
      </Col>
    </Row>
  );
}


export default Translator;
