import {useEffect, useState} from "react"
import { Trash2 } from "react-feather"
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store/store.tsx";
import {CustomerModel} from "../model/CustomerModel.ts";
import {deleteCustomer, getAllCustomers, saveCustomer, updateCustomer} from "../slice/CustomerSlice.ts";

function Customer() {

  const dispatch = useDispatch<AppDispatch>();
  const customers: CustomerModel[] = useSelector((state: { customer: CustomerModel[] }) => state.customer);
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [nic, setNic] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (customers.length === 0) {
      dispatch(getAllCustomers());
    }
    setId(customers.length > 0 ? (customers[customers.length - 1].id + 1).toString() : "1")
  }, [dispatch, customers.length]);

  const handleAdd = () => {
    if ( !name || !nic || !email || !phone) {
      alert("All fields are required!")
      return
    }
    const newCustomer =  new CustomerModel(
        id,
        name,
        nic,
        email,
        phone
    );
    dispatch(saveCustomer(newCustomer));
    resetForm()
  }

  const handleEdit = (customer: CustomerModel) => {
    setId(customer.id.toString())
    setName(customer.name)
    setNic(customer.nic)
    setEmail(customer.email)
    setPhone(customer.phone)
    setIsEditing(true)
  }

  const handleUpdate = () => {
    if (!name || !nic || !email || !phone) {
      alert("All fields are required!")
      return
    }
    const updatedCustomer = new CustomerModel(
        id,
        name,
        nic,
        email,
        phone
    );
    dispatch(updateCustomer(updatedCustomer));
    resetForm()
  }

    const handleDelete = (customerId: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      dispatch(deleteCustomer(customerId));
    }

  }

  const resetForm = () => {
    setName("")
    setNic("")
    setEmail("")
    setPhone("")
    setIsEditing(false)
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="id"
          placeholder="ID"
          readOnly
          value={id}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="nic"
          placeholder="NIC"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex justify-end">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white p-2 rounded mr-2"
          >
            Add
          </button>
        )}
        {isEditing && (
          <button
            onClick={resetForm}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
      <table className="min-w-full table-auto border-collapse mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">NIC</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              onClick={() => handleEdit(customer)}
              className="hover:cursor-pointer hover:bg-slate-600 hover:text-white"
            >
              <td className="border px-4 py-2">{customer.id}</td>
              <td className="border px-4 py-2">{customer.name}</td>
              <td className="border px-4 py-2">{customer.nic}</td>
              <td className="border px-4 py-2">{customer.email}</td>
              <td className="border px-4 py-2">{customer.phone}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(customer.id.toString())}
                  className="bg-red-500 text-white p-2 rounded-lg"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Customer
