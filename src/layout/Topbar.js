import React from 'react'

const Topbar = () => {
    return (
        <div className="top-bar">
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6">
                    <i className="fa fa-envelope"></i>
                    support@email.com
                </div>
                <div className="col-sm-6">
                    <i className="fa fa-phone-alt"></i>
                    +012-345-6789
                </div>
            </div>
        </div>
    </div>
    )
}
export default Topbar