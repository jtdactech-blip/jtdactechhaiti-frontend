import React, { useState } from 'react';

const EmployeeForm = ({ onSubmit, initial, onCancel }) => {
  const [form, setForm] = useState(initial || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'staff',
    baseSalary: 0,
    photo: '' // 🔥 AJOUTE SA
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="employee-form"
    >
      <h2>{initial ? 'Modifye' : 'Ajoute'} Anplwaye</h2>

      <input
        placeholder="Non"
        value={form.firstName}
        onChange={e => setForm({ ...form, firstName: e.target.value })}
        required
      />

      <input
        placeholder="Siyati"
        value={form.lastName}
        onChange={e => setForm({ ...form, lastName: e.target.value })}
        required
      />

      <input
        placeholder="Imèl"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Telefòn"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />

      <select
        value={form.role}
        onChange={e => setForm({ ...form, role: e.target.value })}
      >
        <option value="admin">Admin</option>
        <option value="manager">Manadjè</option>
        <option value="staff">Staff</option>
      </select>

      <input
        type="number"
        placeholder="Salè Debaz"
        value={form.baseSalary}
        onChange={e =>
          setForm({ ...form, baseSalary: Number(e.target.value) })
        }
        required
      />

      {/* 🔥 UPLOAD FOTO (PLAS PI BON) */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          const reader = new FileReader();

          reader.onloadend = () => {
            setForm(prev => ({ ...prev, photo: reader.result }));
          };

          if (file) reader.readAsDataURL(file);
        }}
      />

      <div className="actions">
        <button type="submit">Sove</button>
        <button type="button" onClick={onCancel}>
          Anile
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;