import { useRef, useState } from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { Api } from "../../Api/UserApi";
import type { User } from "../../Interfase/User";
import axios from "axios";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    let imageUrl = "";
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "user_management");

        const cloudinaryRes = await axios.post(
          "https://api.cloudinary.com/v1_1/ddzjyv5ug/image/upload",
          formData
        );
        imageUrl = cloudinaryRes.data.secure_url;
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Image upload failed");
        return;
      }
    }

    try {
      const response = await Api.post<User>("/admin/addUser", {
        name,
        email,
        password,
        imageUrl,
      });
      console.log(response.data);
      toast.success("User added successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setImageFile(null);
      setImagePreview(null);
    } catch (error: any) {
      console.error(error);
      if(error.response?.data?.message){
          toast.error(error.response.data.message);
      }else{
           toast.error("Failed to add user");
      }
     
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <NavBar />
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg mt-10 p-8">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-bold text-green-800">Add User</h1>
            <div className="relative">
              <div
                onClick={handleImageClick}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden cursor-pointer"
              >
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={handleRemovePhoto}
                      className="absolute top-1 right-1 bg-green-900 hover:bg-green-700 text-white w-7 h-7 flex items-center justify-center rounded-full shadow-md transition"
                      title="Remove Photo"
                    >
                      <FaTrashAlt className="w-3 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600">
                     add image
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="flex flex-col w-full max-w-md space-y-4 mt-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
              />
              <button
                onClick={handleSubmit}
                className="bg-green-900 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
