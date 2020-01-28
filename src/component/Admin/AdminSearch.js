import React from 'react';

const AdminSearch = () => {
    return (
        <div>
  <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
  <div className="input-group">
    <input type="text" className="form-control bg-light border-0 small" placeholder="Tìm Kiếm..." aria-label="Search" aria-describedby="basic-addon2" />
    <div className="input-group-append">
      <button className="btn btn-primary" type="button">
        <i className="fas fa-search fa-sm" />
      </button>
    </div>
  </div>
</form>

        </div>
    );
};

export default AdminSearch;