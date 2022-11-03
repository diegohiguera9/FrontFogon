import "../styles/components/UserCreate.scss";
import { Input, Select, NumberInput } from "@mantine/core";
import { IconForms, IconClipboard } from "@tabler/icons";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductCreate = () => {
  const [allCategory, setAllCategory] = useState([]);
  const params = useParams();
  const productId = params.id;
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [name, setName] = useState(user ? user.name : "");
  const [role, setRole] = useState(user ? user.role : null);
  const [price, setPrice] = useState(user ? user.price:50000)

  const [file, setFile] = useState(new DataTransfer());
  const [fileDataURL, setFileDataURL] = useState([]);

  const token = localStorage.getItem("token");

  const handleChange = (event) => {
    const imageArray = Array.from(event.target.files).map((fil) => {
      file.items.add(fil);
      return URL.createObjectURL(fil);
    });

    setFileDataURL((prevImage) => prevImage.concat(imageArray));
    event.target.value = "";
  };

  const handleClcik = (image) => {
    setFileDataURL(
      fileDataURL.filter((item, index) => {
        if (item === image) {
          file.items.remove(index);
        }
        return item !== image;
      })
    );
  };

  const sendUser = async (url, data) => {
    try {
      await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setFile(new DataTransfer());
      navigate("/admin/product");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const searchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://diegohtop24.herokuapp.com/product/show/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setUser(res.data.data);
    } catch (err) {
      alert(err);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading2(true);
      const data = await axios.get(
        "https://diegohtop24.herokuapp.com/category/showAll",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let select = []
      data.data.data.forEach(item=>select.push({value:item.name, label:item.name}))
      setAllCategory(select);
      setLoading2(false);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (productId) {
      searchProduct();
    }    
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setRole(user.categoryId.name);
      setPrice(user.price)
    }
  }, [user]);

  if (loading || loading2) {
    return <div>loading...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const sendData = new FormData();

    sendData.append("name", name);
    sendData.append("category", role);
    sendData.append('price',price)

    const fileSend = file.files;

    for (let i = 0; i < fileSend.length; i++) {
      sendData.append(`file_${i}`, fileSend[i], fileSend[i].name);
    }

    if (user) {
      sendUser(`https://diegohtop24.herokuapp.com/product/update/${productId}`, sendData);
    } else {
      sendUser("https://diegohtop24.herokuapp.com/product/create", sendData);
    }
  };

  return (
    <div className="usercreate">
      <h2>{user ? `Editing ${user.name}` : "Nuevo Producto"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="usercreate__input">
          <Input.Wrapper label="Nombre" required>
            <Input
              placeholder="Nombre"
              icon={<IconForms />}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Input.Wrapper>
        </div>
        <div className="usercreate__input">
        <Input.Wrapper label="Precio" required>
        <NumberInput
          defaultValue={50000}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : "$ "
          }
          className="hostform__setmargin"
          step={5000}
          value={price}
          onChange={setPrice}
        />
                  </Input.Wrapper>
        </div>
        <div className="usercreate__input">
          <Input.Wrapper label="Categoria" required>
            <Select
              placeholder="Categoria"
              icon={<IconClipboard />}
              data={allCategory.length === 0?[]:allCategory}
              onChange={setRole}
              value={role}
              searchable
              nothingFound="No options"
            />
          </Input.Wrapper>
        </div>
        <div className="usercreate__input" style={{display:user?'flex':'none', flexFlow:'column'}}>
          <span>Imagen existente:</span>
          <img src={user?user.image:''} style={{width:200, height:200, borderRadius:10}} alt='product'></img>
        </div>
        <div className="usercreate__input">
          <div className="hostform__setmargin">{user? 'cambiar imagen':'agregar imagen'}</div>
          <label htmlFor="file" className="hostform__label">
            + Agregar imagenes
            <input
              type="file"
              name="file"
              id="file"
              accept="image/*"
              onChange={handleChange}
              className="hostform__inputtext"
            />
          </label>
        </div>
        <div className="hostform__imgprev">
          {fileDataURL &&
            fileDataURL.map((image, index) => {
              return (
                <div key={image} className="hostform__imgprev__card">
                  <img src={image} alt="previe" height="200"></img>
                  <button onClick={() => handleClcik(image)}>
                    Delete image
                  </button>
                </div>
              );
            })}
        </div>
        <button className="usercreate__submit">
          {user ? "Actualizar producto" : "Crear Producto"}
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
