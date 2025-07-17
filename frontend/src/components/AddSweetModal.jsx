import { useState } from 'react';

const AddSweetModal = ({ onClose, onAdd }) => {
  const [sweet, setSweet] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
  });

  const handleChange = (e) => {
    setSweet({ ...sweet, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(sweet);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-bold mb-4">Add New Sweet</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={sweet.name}
            onChange={handleChange}
            placeholder="Sweet Name"
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="text"
            name="category"
            value={sweet.category}
            onChange={handleChange}
            placeholder="Category"
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={sweet.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="number"
            name="quantity"
            value={sweet.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="border p-2 w-full rounded"
            required
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSweetModal;
