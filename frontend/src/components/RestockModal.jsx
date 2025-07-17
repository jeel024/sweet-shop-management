import { useState } from 'react';

const RestockModal = ({ sweet, onClose, onRestock }) => {
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity <= 0) return;
    onRestock(sweet._id, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-bold mb-4">Restock {sweet.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            placeholder="Quantity"
            className="border p-2 w-full rounded"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Restock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestockModal;
