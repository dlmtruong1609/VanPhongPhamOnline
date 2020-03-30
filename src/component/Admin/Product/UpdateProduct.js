import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Update = (props) => {
  const { register, handleSubmit } = useForm();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    inventory: "",
    supplier: {
      name:"",
      description:""
    },
    category: {
      name:""
    }
  });
  const handleInput=(e)=>{
    setProduct({...product,
      [e.target.name]:e.target.value
    })
    console.log(product); // qua kia
  }
  const cancelButton = () =>{
    setProduct({
      ...product,
      id:null,
      name:"",
      description:"",
      price:"",
      inventory:""
    });
    console.log(props.updateProduct);
  }
  useEffect(() => {
    if(props.updateProduct){
      setProduct(props.updateProduct)
      console.log(product);
    }
  },[props.updateProduct]);

  const onSubmit = (data) =>{
    setProduct(
      {
        ...product,
        name: data.name,
        description:data.description,
        price:data.price,
        inventory:data.inventory,
      }
    )
    if(props.updateProduct ){
      console.log("Bạn chọn sửa ");
      props.handleUpdateProduct(props.updateProduct.id, product)
    }
    else
    {
      console.log(product);
      props.handleAddSubmit(product)
      }
  }

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
                <div className="modal-header">
                  
                </div>
                {/*Body*/}
                <div className="modal-body">
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true" className="white-text" onClick={cancelButton}>
                      ×
                    </span>
                  </button>
                <h1 className="heading lead text-center">{props.updateProduct? " Sửa sản phẩm" :"Thêm sản phẩm mới"}</h1>
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
                  </div>
                  <div className="md-form ">
                  </div>
                  <p>
                    <strong>Loại sản phẩm</strong>
                  </p>
                  <div className="justify-content-center">
                    <hr/>
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
                  </form>
                </div>
              </div>
            </div>
          </div>

    );
};

export default withRouter(Update);