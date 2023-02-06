import React from "react";
import './LoginScreen.css';

export const IbexProfileDetails = ( {data}) => {
    return (
        <div className="col-md-8">
            <div className="tab-content profile-tab" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="row">
                        <div className="col-md-6">
                            <label>Employee ID</label>
                            <p>{data.employee_id}</p>
                        </div>
                        <div className="col-md-6">
                            <label>NtLogin</label>
                            <p>{data.ntlogin}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Name</label>
                            <p>{data.name}</p>
                        </div>
                        <div className="col-md-6">
                            <label>Phone No</label>
                            <p>{data.cellphone}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Designation</label>
                            <p>{data.bpo_employee_title}</p>
                        </div>
                        <div className="col-md-6">
                            <label>Location</label>
                            <p>{data.location_name}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Email</label>
                            <p>{data.email}</p>
                        </div>
                        <div className="col-md-6">
                            <label>Campaign</label>
                            <p>{data.campaign_name}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Client</label>
                            <p>{data.client_name}</p>
                        </div>
                        <div className="col-md-6">
                            <label>Supervisor</label>
                            <p>{data.supervisor_name}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Supervisor Email</label>
                            <p>{data.supervisor_email}</p>
                        </div>
                        <div className="col-md-6">
                            <label>Nt Account Status</label>
                            <p>{data.active}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}