import Home from './pages/Home';

import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import ShowGallery from './pages/ShowGallery';
import CreateGallery from './components/CreateGallery';
import Register from './pages/Register';
import Nav from './pages/Nav';
import LogIn from './pages/LogIn';
import ShowDetail from './components/ShowDetail';
import EditGallery from './components/EditGallery';
import AddPhoto from './components/AddPhoto';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show-galleries" element={<ShowGallery />} />
        <Route path="/create-gallery" element={<CreateGallery />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/gallery/:id" element={<ShowDetail />} />;
        <Route path="/gallery/edit/:id" element={<EditGallery />} />;
        <Route path="/gallery/addPhoto/:id" element={<AddPhoto />} />;
      </Routes>
    </BrowserRouter>
  );
}

export default App;
