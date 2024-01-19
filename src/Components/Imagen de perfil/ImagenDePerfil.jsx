const ImagenDePerfil = ({ onClose, onSave }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const imageUrl = URL.createObjectURL(file);
    reader.onloadend = () => {
      console.log(reader.result);
      onSave(reader.result);
     
    };
    console.log("imagen url", reader);
    onClose();
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default ImagenDePerfil;