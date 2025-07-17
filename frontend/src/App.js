import { useEffect, useState } from 'react';
import { getAllSweets, addSweet ,updateSweet } from './api/sweetService';
import SweetList from './components/sweetList';
import AddSweetModal from './components/AddSweetModal';
import PurchaseModal from './components/PurchaseModal';
import { purchaseSweet } from './api/sweetService';
import RestockModal from './components/RestockModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import { restockSweet } from './api/sweetService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteSweet } from './api/sweetService';


function App() {
  const [sweets, setSweets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null); 
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedRestockSweet, setSelectedRestockSweet] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteSweet, setSelectedDeleteSweet] = useState(null);
  const [editSweet, setEditSweet] = useState(null);


  useEffect(() => { 
    fetchSweets();
  }, []);

  const fetchSweets = () => {
    getAllSweets().then(setSweets).catch(console.error);
  };

  const handleAddOrEditSweet = (id, sweetData) => {
  if (id) {
    updateSweet(id, sweetData)
      .then(() => {
        fetchSweets();
        toast.success('Sweet updated successfully!');
      })
      .catch((err) => {
        const msg = err.response?.data?.message || 'Failed to update sweet';
        toast.error(msg);
      });
  } else {
    addSweet(sweetData)
      .then(() => {
        fetchSweets();
        toast.success('Sweet added successfully!');
      })
      .catch((err) => {
        const msg = err.response?.data?.message || 'Failed to add sweet';
        toast.error(msg);
      });
  }
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

    const handlePurchase = (id, quantity) => {
  purchaseSweet(id, quantity)
    .then(() => {
      fetchSweets();
      toast.success('Purchase successful!');
    })
    .catch((err) => {
      const msg = err.response?.data?.message || 'Purchase failed';
      toast.error(msg);
    });
};


const openPurchaseModal = (sweet) => {
  setSelectedSweet(sweet);
  setShowPurchaseModal(true);
};

const handleRestock = (id, quantity) => {
  restockSweet(id, quantity)
    .then(fetchSweets)
    .catch(console.error);
};

const openRestockModal = (sweet) => {
  setSelectedRestockSweet(sweet);
  setShowRestockModal(true);
};

const handleDeleteSweet = (id) => {
  deleteSweet(id)
    .then(() => {
      fetchSweets();
      toast.success('Sweet deleted successfully!');
    })
    .catch((err) => {
      const msg = err.response?.data?.message || 'Failed to delete sweet';
      toast.error(msg);
    });
};

const openDeleteModal = (sweet) => {
  setSelectedDeleteSweet(sweet);
  setShowDeleteModal(true);
};

const openEditModal = (sweet) => {
  setEditSweet(sweet);
  setShowModal(true);
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
<ToastContainer position="top-center" autoClose={3000} />
        <SweetList
  sweets={filteredSweets}
  onAction={fetchSweets}
  onPurchaseClick={openPurchaseModal}
  onRestockClick={openRestockModal}
 onEditClick={openEditModal}
  onDeleteClick={openDeleteModal} 
/>

{showRestockModal && selectedRestockSweet && (
  <RestockModal
    sweet={selectedRestockSweet}
    onClose={() => setShowRestockModal(false)}
    onRestock={handleRestock}
/>
)}

{showPurchaseModal && selectedSweet && (
  <PurchaseModal
    sweet={selectedSweet}
    onClose={() => setShowPurchaseModal(false)}
    onPurchase={handlePurchase}
/>
)}

{showDeleteModal && selectedDeleteSweet && (
  <ConfirmDeleteModal
    sweet={selectedDeleteSweet}
    onClose={() => setShowDeleteModal(false)}
    onDelete={handleDeleteSweet}
/>
)}

 
      </main>

      {showModal && (
  <AddSweetModal
    onClose={() => {
      setShowModal(false);
      setEditSweet(null);
    }}
    onSubmit={(data) => {
      if (editSweet) {
        handleAddOrEditSweet(editSweet._id, data);
      } else {
        handleAddOrEditSweet(null, data);
      }
    }}
    sweetToEdit={editSweet}
  />
)}


    </div>
  );
}

export default App;
