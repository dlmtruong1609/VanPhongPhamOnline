import React from 'react';
import { getListProduct, removeProduct } from "../../../services/AdminService";
import { useState } from 'react';
const ProductItem = (props) => {
    const {maSanPham, tenSanPham, moTa, giaSanPham, soLuongTon} = props.product
   return (
        <tbody>
            <tr>
                <th scope="row">{maSanPham}</th>
                <td>{tenSanPham}</td>
                <td>{moTa}</td>
                <td>{giaSanPham}</td>
                <td>{soLuongTon}</td>
                <td></td>
                <td>
                    <button onClick={()=>{props.removePd(maSanPham)}} 
                        className=" btn-danger">
                        Xoá
                    </button>
                </td>
                <td>
                    <button className="btn-primary" data-toggle="modal" data-target="#themsanpham"
                    >Sửa</button>
                </td>
            </tr>
        </tbody>
    );
};

export default ProductItem;