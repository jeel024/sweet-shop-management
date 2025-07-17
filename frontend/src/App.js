import { useEffect, useState } from 'react';
import { getAllSweets, addSweet } from './api/sweetService';
import SweetList from './components/sweetList';
import AddSweetModal from './components/AddSweetModal';

function App() {
  const [sweets, setSweets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('');

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

  const filteredSweets = sweets
    .filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      if (sortKey === 'price' || sortKey === 'quantity')
        return a[sortKey] - b[sortKey];
      return a[sortKey].localeCompare(b[sortKey]);
    });

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
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-2 md:space-y-0">
          <input
            type="text"
            placeholder="Search by name or category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-md px-3 py-2 w-full md:w-1/3"
          />

          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="border rounded-md px-3 py-2 w-full md:w-1/5"
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="price">Price</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>

        <SweetList sweets={filteredSweets} />
      </main>

      {showModal && (
        <AddSweetModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddSweet}
        />
      )}
    </div>
  );
}

export default App;
