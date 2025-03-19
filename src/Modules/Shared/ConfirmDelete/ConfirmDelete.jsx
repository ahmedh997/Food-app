import React from 'react';
import notFoundImg from '../../../assets/images/Not-found-delete.png';


export default function ConfirmDelete({ deleteAction, item }) {


    return <>

        <div className="modal fade px-5 py-3" tabIndex={-1} id="confirmDeleteModal" aria-hidden="true" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button id="closeConfirmDelete" type="button" style={{ width: "40px", height: "40px" }} className="fas fa-close ms-auto text-danger bg-transparent border-danger rounded-circle m-2 p-2" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="container d-flex justify-content-center align-items-center">
                            <div className="text-center">
                                <div className="img-notfound my-3">
                                    <img width={300} src={notFoundImg} alt="Confirm Delete" />
                                </div>
                                <div>
                                    <h4>Delete This {item}?</h4>
                                    <p className='text-muted'>are you sure you want to delete this {item} ? if you are sure just click on delete it</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-danger" onClick={deleteAction}>Delete This {item}</button>
                    </div>
                </div>
            </div>
        </div>


    </>;
}
