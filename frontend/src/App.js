import { useEffect, useState } from 'react';
import { getAllSweets } from './api/sweetService';
import SweetList from './components/sweetList.js';
function App() {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    getAllSweets().then(setSweets).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
  <header className="bg-orange-500 text-white p-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold">Sweet Shop Management</h1>
    <button className="bg-white text-orange-500 font-semibold py-2 px-4 rounded-md hover:bg-gray-100">
      Add Sweet
    </button>
  </header>

  <main className="p-4">
    <SweetList sweets={sweets} />
  </main>
</div>


  );
}

export default App;