import React, { useState, useEffect } from 'react';

import { Link, withRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import HashLoader from "react-spinners/HashLoader";

import Loading from '../loading/Loading';
import { getAllCart, update, remove } from '../../services/CartServices';
import { alertYesNo } from '../../untils/alert';
const Cart = (props) => {
    //loading
    const [loading, setLoading] = useState(true);
    // kiểm tra số lượng của sản phẩm mua
    const [inventory, setInventory] = useState(1000);
    // kiểm tra là có phải vừa thực hiện action update hay ko?
    const [isUpdated, setIsUpdated] = useState(true);
    // data
    const [order, setOrder] = useState({
      id: '',
      billDate: '',
      totalMoney: 0,
      listOrderDetail: [],
      customer: null
    });
    // set số lượng hàng trong giỏ hàng
    const dispatch = useDispatch();
    // xử lý tăng giảm và nhập dữ liêu trong input
    let handleUpdateCart = async (action, id, quantity, price) => {
        setIsUpdated(true);
        // mở này coi để hiểu tại s code như v
        // console.log(order.listOrderDetail.map(item => item.product.id === id ? {...item, quantity: 10} : item))
        // xử lý tổng tiền của toàn bộ
        let total = 0;
        order.listOrderDetail.map(item => item.product.id === id ? total+= (price*quantity) : total += item.unitPrice)
        // đẩy dữ liệu data lên server để cập nhật khi chỉnh sửa số lượng
        if(action === "tang") { /// dấu +
          if(quantity < inventory) {
            update({...order,
              totalMoney: total + price,
              listOrderDetail: order.listOrderDetail.map(item => item.product.id === id ? {...item,
                unitPrice: price * (item.quantity + 1),
                quantity: item.quantity + 1
              } : item)
            });
            order.listOrderDetail.map(item => item.product.id === id ? item.unitPrice = price * (item.quantity + 1) : "")
            order.listOrderDetail.map(item => item.product.id === id ? item.quantity += 1 : "")
            order.listOrderDetail.map(item => item.product.id === id ? order.totalMoney = total + price : "")
          }
        } else if(action === "giam") { /// dấu -
          if(quantity > 1) {
            update({...order,
              totalMoney: total - price,
              listOrderDetail: order.listOrderDetail.map(item => item.product.id === id ? {...item,
                unitPrice: price * (item.quantity - 1),
                quantity: item.quantity - 1
              } : item)
            });
            order.listOrderDetail.map(item => item.product.id === id ? item.unitPrice = price * (item.quantity - 1) : "")
            order.listOrderDetail.map(item => item.product.id === id ? item.quantity -= 1 : "")
            order.listOrderDetail.map(item => item.product.id === id ? order.totalMoney = total - price : "")
          } else {
            removeProductFromCart(id);
          }
        } else if(action === ""){ /// nhập vào input
            if(quantity >= 1 && quantity <= inventory) { //trong khoản từ 1 - tồn kho
              update({...order,
                tongTien: total,
                listOrderDetail: order.listOrderDetail.map(item => item.product.id === id ? {...item,
                unitPrice: price * Number(quantity),
                quantity: quantity} : item)
              });
              order.listOrderDetail.map(item => item.product.id === id ? item.quantity = quantity : "")
              order.listOrderDetail.map(item => item.product.id === id ? item.unitPrice = price * quantity : "")
            } else { // nhập ít hơn 1 hoặc nhiêu hơn số lượng có sẵn
              update({...order,
                tongTien: total,
                listOrderDetail: order.listOrderDetail.map(item => item.product.id === id ? {...item,
                unitPrice: price * inventory,
                quantity: inventory} : item)
              });
              order.listOrderDetail.map(item => item.product.id === id ? item.quantity = inventory : "")
              order.listOrderDetail.map(item => item.product.id === id ? item.unitPrice = price * inventory : "")
            }
            order.listOrderDetail.map(item => item.product.id === id ? order.totalMoney = total : "")
        }
    };
    // xoá sản phẩm
    let removeProductFromCart = (id) => {
      remove(id)
      .then(async (res) => {
        if(res.error !== true && res.data.code === 0) {
          const resutl = await res.data.result;
          setOrder({...order,
            totalMoney: resutl.totalMoney,
            listOrderDetail: resutl.listOrderDetail
          })
          changeInventoryOnHeader(resutl); // thay đổi số lượng trên header ở icon giỏ hàng
        }
      })
      .catch(err => {
        console.log(err);
      })
    };
    // lấy user để kiểm tra đã đăng nhập hay chưa
    const state = useSelector(state => state.auth);
    // thanh toán
    let onPay = () => {
      if(order.totalMoney === 0) {
        alertYesNo("Thông báo", "Không có sản phẩm để thanh toán", "warning", "Mua sắm")
          .then((result) => {
            if (result.value) {
              props.history.push("/sanpham?type=&keyword=&currentPage=0");
            }
          });
          return;
      }
      if(state.user) {
        props.history.push("/thanhtoan");
      } else {
        alertYesNo("Thông báo", "Vui lòng đăng nhập để thanh toán", "warning", "Đăng nhập")
          .then((result) => {
            if (result.value) {
              props.history.push("/dangnhap");
            }
          });
      }
    };
    // thay đổi số lượng trên header ở icon giỏ hàng
    let changeInventoryOnHeader = (order) => {
      let total = 0;
      order.listOrderDetail.map(item => total += item.quantity);
      dispatch({type: "CHANGE_INVENTORY", inventory: total});
    };
    //đây là khỏi chạy lần đầu khi load vô compoent Cart
    useEffect(() => {
      setLoading(false);
      if(isUpdated === true) {
        getAllCart().then((res) => {
          if(res.error !== true && res.data.code === 0) {
            changeInventoryOnHeader(res.data.result)
            setOrder({...order,
              id: res.data.result.id,
              billDate: res.data.result.billDate,
              totalMoney: res.data.result.totalMoney,
              listOrderDetail: res.data.result.listOrderDetail,
              customer: res.data.result.customer
            });
          }
        });
        setIsUpdated(false);
      }
    }, []);
    // [] chạy khi isUpdated thay đổi

    useEffect(() => {
      setLoading(false);
      if(isUpdated === true) {
        getAllCart().then((res) => {
          if(res.error !== true && res.data.code === 0) {
            changeInventoryOnHeader(res.data.result)
          }
        });
        setIsUpdated(false);
      }
    }, [isUpdated]);

    return loading ? <Loading loading={loading}/>  : (
        <div className="container">
          <table className="table shadow">
            <thead>
              <tr className="text-black">
                <th scope="col">#</th>
                <th scope="col">Hình ảnh</th>
                <th scope="col">Sản phẩm</th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col">Xoá sản phẩm</th>
              </tr>
            </thead>
            <tbody>
              {
                order.listOrderDetail.map((item, i) => (
                  <tr key={i}>
                  <th scope="row">{i}</th>
                  <td>
                    <img style={{height: "8rem", width: "8rem"}} src={item.product.urlImage} alt="Image" className="img-fluid"/>
                  </td>
                  <td>
                    <h2 className="h5 text-black font-weight-normal">{item.product.name}</h2>
                  </td>
                  <td>{item.product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                  <td>
                    <div className="input-group mb-3" style={{maxWidth: '120px'}}>
                      <div className="input-group-prepend">
                        <button onClick={() => {handleUpdateCart("giam", item.product.id, item.quantity, item.product.price); setInventory(item.product.inventory);}} className="btn-outline-primary btn" type="button">−</button>
                      </div>
                      <input type="text" className="form-control text-center" onChange={(e) => {handleUpdateCart("", item.product.id, Number(e.target.value), item.product.price);setInventory(item.product.inventory);}} value={item.quantity} aria-label="Example text with button addon" aria-describedby="button-addon1" />
                      <div className="input-group-append">
                        <button type="button" className="btn-outline-primary btn" onClick={() => {handleUpdateCart("tang", item.product.id, item.quantity, item.product.price);setInventory(item.product.inventory);}}>+</button>
                      </div>
                    </div>
                  </td>
                  <td><p className="text-warning">{item.unitPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p></td>
                  <td><span onClick={() => {removeProductFromCart(item.product.id);}} className="btn btn-primary btn-sm">X</span></td>
                </tr>
              ))
            }
            </tbody>
          </table>
          <div className="row">
            <div className="col-md-6">
              <div className="row mb-5">
                <div className="col-md-6">
                  <Link to="/sanpham?type=&keyword=&currentPage=0" className="btn btn-outline-primary btn-sm btn-block shadow">Tiếp tục mua sắm</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 pl-5">
              <div className="row justify-content-end">
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-12 text-right border-bottom mb-5">
                      <h3 className="text-black h4 text-uppercase">Tổng Giỏ Hàng</h3>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <span className="text-black">Tổng Tiền</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-warning">{order.totalMoney.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} vnd</strong>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-md-6">
                      <span className="text-black">Tiền phải trả</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-warning">{order.totalMoney.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} vnd</strong>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                   <button onClick={onPay} className="btn btn-primary btn-lg py-3 btn-block shadow">Tiến hành kiểm tra</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default withRouter(Cart);