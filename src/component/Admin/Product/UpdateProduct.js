import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { ListCategory, detailCategory } from "../../../services/CategoryServices";
import { ListSupplier, detailSupplier } from "../../../services/SupplierService";

const Update = props => {
  const { register, handleSubmit } = useForm();
  const [categoryRender, setCategory] = useState([{}]);
  const [supplierRender, setSupplier] = useState([{}]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    inventory: "",
    supplier:{},
    category:{}
  });
  const [valueSupplier,setSupplierValue] = useState(null);
  function handleChangeSupplier(e){
     setSupplierValue(e.target.value);
     console.log(valueSupplier);
     if(valueSupplier !==null){
      detailSupplier(valueSupplier)
      .then((res)=>{
        setProduct({...product,
          supplier:res.data.result
          })
      })
    }    
  };
  const [valueCategory,setCategoryValue] = useState(null);
  function handleChangeCategory(e){
     setCategoryValue(e.target.value);
     console.log(valueCategory);
     if(valueCategory !==null){
      detailCategory(valueCategory)
      .then((res)=>{
        setProduct({...product,
          category:res.data.result
          })
      })
    }    
    console.log(props.product);
    
  };

  const handleInput = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    console.log(product);
  };
  const cancelButton = () => {
    setProduct({
      ...product,
      id: null,
      name: "",
      description: "",
      price: "",
      inventory: ""
    });
  };
  useEffect(() => {
    if (props.updateProduct) {
      setProduct(props.updateProduct);
      console.log(product);
    }
  }, [props.updateProduct]);
  useEffect(() => {
    ListCategory().then(res => {
      setCategory(res.data.result);
    });
  }, []);
  useEffect(() => {
    ListSupplier().then(res => {
      setSupplier(res.data.result);
    });
  }, []);
  const onSubmit = data => {
    console.log(product);
    setProduct({
      ...product,
      name: data.name,
      description: data.description,
      price: data.price,
      inventory: data.inventory
    });
    if (props.updateProduct) {
      console.log("Bạn chọn sửa ");
      props.handleUpdateProduct(props.updateProduct.id, product);
    } else {
      console.log(product);
      props.handleAddSubmit(product);
    }
  };

  return (
    <div
      className="modal hide right"
      id="capnhat"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
      data-backdrop="false"
    >
      <div
        className="modal-dialog modal-full-height modal-right modal-notify modal-info modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header"></div>
          {/*Body*/}
          <div className="modal-body">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span
                aria-hidden="true"
                className="white-text"
                onClick={cancelButton}
              >
                ×
              </span>
            </button>
            <h1 className="heading lead text-center">
              {props.updateProduct ? " Sửa sản phẩm" : "Thêm sản phẩm mới"}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Radio */}
              <p>
                <strong>Tên sản phẩm</strong>
              </p>
              <input
                type="text"
                className="md-text form-control"
                name="name"
                ref={register}
                onChange={handleInput}
                placeholder="Nhập tên sản phẩm"
                value={product.name}
              />
              <p>
                <strong>Mô tả sản phẩm</strong>
              </p>
              <div className="md-form form">
                <input
                  type="text"
                  name="description"
                  ref={register}
                  className="md-text form-control"
                  onChange={handleInput}
                  placeholder="Nhập mô tả sản phẩm"
                  value={product.description}
                />
              </div>
              <p>
                <strong>Số Lượng</strong>
              </p>
              <div className="md-form form">
                <input
                  type="text"
                  name="inventory"
                  required
                  ref={register}
                  className="md-text form-control"
                  onChange={handleInput}
                  placeholder="Nhập số lượng sản phẩm"
                  value={product.inventory}
                />
              </div>
              <p>
                <strong>Giá</strong>
              </p>
              <div className="md-form form">
                <input
                  type="text"
                  name="price"
                  required
                  ref={register}
                  className="md-text form-control"
                  onChange={handleInput}
                  placeholder="Nhập giá sản phẩm"
                  value={product.price}
                />
              </div>
              <p>
                <strong>Nhà cung cấp</strong>
              </p>
              <div className="md-form form">
                <select
                  className="md-text form-control"
                  onChange={handleChangeSupplier}
                  value={valueSupplier}
                  >
                  {supplierRender.map((item, i ) => {
                    return <option key={i} value={item.id}>{item.name}</option>;
                  })}
                </select>
              </div>
              <p>
                <strong>Loại sản phẩm</strong>
              </p>
              <div className="md-form form">
                <select className="md-text form-control"
                 onChange={handleChangeCategory}
                 value={valueCategory}>
                  {categoryRender.map(item => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
              </div>
              {props.hideButton === true ? (
                <button
                  type="button"
                  className="btn btn-outline-primary waves-effect"
                  data-dismiss="modal"
                  onClick={cancelButton}
                >
                  Đóng
                </button>
              ) : (
              <div className="justify-content-center">
                <hr />
                <button
                  type="submit"
                  className="btn btn-primary waves-effect waves-light"
                >
                  {props.updateProduct ? "Sửa" : "Thêm"}
                  <i className="fa fa-plus"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary waves-effect"
                  data-dismiss="modal"
                  onClick={cancelButton}
                >
                  Cancel
                </button>
              </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Update);