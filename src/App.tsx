import { Layout } from 'antd';
import React from 'react';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Layout>
      <Layout.Header style={{ color: 'white' }}>
        <h1>Calendar APP</h1>
      </Layout.Header>
      <Layout.Content className='main-layout'>
        <HomePage />
      </Layout.Content>
    </Layout>
  );
}

export default App;
