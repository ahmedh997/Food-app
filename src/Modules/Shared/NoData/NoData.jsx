import React from 'react'
import notFoundImg from '../../../assets/images/Not-found-delete.png'

export default function NoData() {
  return <>
  
    <div className="container rounded-4 p-4 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <div className="img-notfound my-3">
                <img width={300} src={notFoundImg} alt="No Data" />
            </div>
            <div>
                <h4>No data to show!</h4>
            </div>
        </div>
    </div>
  
  </>
}
