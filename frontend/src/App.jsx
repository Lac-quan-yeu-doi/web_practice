import { Box, Button, useColorModeValue } from '@chakra-ui/react';
import {Route, Routes} from 'react-router-dom';
import NavBar from 'components/Navbar.jsx';
import HomePage from 'pages/HomePage.jsx';
import CreatePage from 'pages/CreatePage.jsx';

function App() {

  return (
    <Box minH={"100vh"} bg={useColorModeValue('gray.100', 'gray.900')}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  )
}

export default App
