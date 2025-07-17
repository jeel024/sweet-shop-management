import { useEffect, useState } from 'react';
import { getAllSweets, addSweet } from './api/sweetService';
import SweetList from './components/sweetList';
import AddSweetModal from './components/AddSweetModal';

function App() {
  const [sweets, setSweets] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = () => {
    getAllSweets().then(setSweets).catch(console.error);
  };

  const handleAddSweet = (newSweet) => {
    addSweet(newSweet)
      .then(fetchSweets)
      .catch(console.error);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-orange-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sweet Shop Management</h1>
        <button
          className="bg-white text-orange-500 font-semibold py-2 px-4 rounded-md hover:bg-gray-100"
          onClick={() => setShowModal(true)}
        >
          Add Sweet
        </button>
      </header>

      <main className="p-4">
        <SweetList sweets={sweets} />
      </main>

      {showModal && (
        <AddSweetModal onClose={() => setShowModal(false)} onAdd={handleAddSweet} />
      )}
    </div>
  );
}

export default App;
